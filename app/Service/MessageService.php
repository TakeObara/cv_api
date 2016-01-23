<?php

namespace Cv\Service;

use Cv\Model\Message;

class MessageService {

    
    public function __construct() 
    {
    }

    public function chat($userId, $chatroomId, $message)
    {
        $message = str_replace("<", "&lt;", $message);
        $message = str_replace(">", "&gt;", $message);
        
        $this->chatInHtml($userId, $chatroomId, $message);

    }

    public function chatInHtml($userId, $chatroomId, $message)
    {
        $msg = new Message;
        $msg->user_id     = $userId;
        $msg->chatroom_id = $chatroomId;
        $msg->message     = $message;
        $msg->save();
        
    }

}