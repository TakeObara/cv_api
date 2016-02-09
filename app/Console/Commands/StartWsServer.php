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

use Cv\Model\Notification;

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
    public function __construct(
        \Cv\Service\ChatroomService $chatroom, 
        \Cv\Service\MessageService $message,
        \Cv\Service\AppointmentService $appointment,
        \Cv\Service\AuthService $auth
    )
    {
        parent::__construct();
        $this->clients = [];
        $this->chatroom = $chatroom;
        $this->message = $message;
        $this->appointment = $appointment;
        $this->auth = $auth;
    }


    public function onOpen(ConnectionInterface $conn) {

        $cookies = $conn->WebSocket->request->getCookies();
        $session = $this->getSessionFromLaravelCookie($cookies[Config::get('session.cookie')]);

        $userId = $session->get("userId");

        if(is_null($userId)) {
            $conn->close();
            return;
        }

        $this->clients[$userId] = $conn;
        $this->clients[$userId]->user = $this->auth->getUserById($userId);
        $this->clients[$userId]->currentPath = "";
    }

    public function onMessage(ConnectionInterface $from, $notify) {

        $notify = json_decode($notify);

        switch ($notify->type) {
            case 'chat':
                
                $userId = $from->user->id;
                $chatroomId = $notify->chatroomId;
                $message = $notify->message;

                $notify->userId = $userId;
                $notify->currentPath = '/chatroom/'.$chatroomId;


                if(!$this->chatroom->inRoom($userId, $chatroomId)) {
                    break;
                }

                $this->message->chat($userId, $chatroomId, $message);

                $userIdsInRoom = $this->chatroom->getUserIdInRoom($chatroomId);

                // send to user
                foreach ($userIdsInRoom as $user) {
                    $unreadFlag = false;
                    if($this->isOnline($user)) {
                        $this->clients[$user]->send(json_encode($notify));

                        if($this->clients[$user]->currentPath != $notify->currentPath) {
                            $unreadFlag = true;
                        }
                    }else {
                        $unreadFlag = true;
                    }

                    if($unreadFlag) {
                        $this->chatroom->addUnreadCount($user, $chatroomId);
                    }
                }
                break;
            case 'appointment':

                $hostId = $from->user->id;
                $userId = $notify->userId;
                $guest  = $notify->guest;
                $place  = $notify->place;
                $meetingTime = $notify->meetingTime;

                $this->appointment->create($userId, $hostId, $guest,$place, $meetingTime);

                $msg = $from->user->name . "さんからアポイントが届きました！";
                
                if($this->isOnline($userId)) {
                    $notify->currentPath = '/chatroom/'.$chatroomId;
                    $this->clients[$userId]->send($msg);
                }

                break;
            case 'update_path':
                $this->updateMyCurrentPath($notify->currentPath , $from->user);
                var_dump($notify->currentPath);
                break;
            default:
                break;
        }
    }

    public function updateMyCurrentPath($currentPath ,$user) {
        $this->clients[$user->id]->currentPath = $currentPath;
    }

    public function isOnline($userId) {
        return array_key_exists($userId, $this->clients);
    }

    public function onClose(ConnectionInterface $conn) {
        $this->info("close ".$conn->userId);

        unset($this->clients[$conn->userId]);
    }

    public function onError(ConnectionInterface $conn, Exception $e) {
        $this->error($e);
        $conn->close();

        unset($this->clients[$conn->userId]);
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
