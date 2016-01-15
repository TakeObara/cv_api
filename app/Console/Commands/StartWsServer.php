<?php

namespace Cv\Console\Commands;

use Crypt;
use App;
use Config;
use Illuminate\Session\SessionManager;

use Exception;
use SplObjectStorage;
use Ratchet;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\ConnectionInterface;

use Illuminate\Console\Command;

class StartWsServer extends Command implements Ratchet\MessageComponentInterface
{
    const PORT = 13000;

    protected $clients;
    protected $chatroom;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'server:ws';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start Real time websocket server.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(\Cv\Service\ChatroomService $chatroom, \Cv\Service\MessageService $message)
    {
        parent::__construct();
        $this->clients = [];
        $this->chatroom = $chatroom;
        $this->message = $message;
    }


    public function onOpen(ConnectionInterface $conn) {

        $cookies = $conn->WebSocket->request->getCookies();
        $session = $this->getSessionFromLaravelCookie($cookies[Config::get('session.cookie')]);

        $chatroomId = str_replace("/", "", $conn->WebSocket->request->getPath());
        $userId = $session->get("userId");

        if(is_null($userId)) {
            $conn->close();
            return;
        }

        if(!$this->chatroom->inRoom($userId, $chatroomId)) {
            $conn->close();
            return;   
        }

        if(!array_key_exists($chatroomId, $this->clients)) {
            $this->clients[$chatroomId] = new SplObjectStorage;
        }

        $this->clients[$chatroomId]->attach($conn);

        $conn->chatroomId = $chatroomId;
    }

    public function onMessage(ConnectionInterface $from, $msg) {

        $msgItem = json_decode($msg);
        $this->message->chat($msgItem->userId, $from->chatroomId, $msgItem->message);

        foreach ($this->clients[$from->chatroomId] as $client) {
            $client->send($msg);
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->info("close");
        $this->clients[$from->chatroomId]->detach($conn);
    }

    public function onError(ConnectionInterface $conn, Exception $e) {
        $this->error($e);
        $conn->close();
    }

    public function getSessionFromLaravelCookie($laravelCookie) {
        $session = (new SessionManager(App::getInstance()))->driver();

        // Get the laravel's one
        $laravelCookie = urldecode($laravelCookie);
        // get the user session id from it
        $idSession = Crypt::decrypt($laravelCookie);
        $session->setId($idSession);
        $session->start();
        return $session;
    }


    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("start at PORT: ".self::PORT);

        //
        $server = IoServer::factory( new HttpServer(new WsServer($this)), self::PORT );
        $server->run();
    }
}
