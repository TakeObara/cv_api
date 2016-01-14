<?php

namespace Cv\Service;

use Cv\Model\Message;

class MessageService {

    
    public function __construct() 
    {
    }

    public function chat($userId, $chatroomId, $message)
    {
        $msg = new Message;
        $msg->user_id     = $userId;
        $msg->chatroom_id = $chatroomId;
        $msg->message     = $message;
        $msg->save();
        
    }

}