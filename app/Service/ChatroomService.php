<?php

namespace Cv\Service;

use Cv\Model\Chatroom;

class ChatroomService {


    public function register($title){

        $chatroom = new Chatroom;
        $chatroom->title = $title;
        $chatroom->save();

    }
    
}