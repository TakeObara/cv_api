<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Chatroom;

class ChatroomService {

    // private $auth;

    // public function __construct(AuthService $auth)
    // {
    //     $this->auth = $auth;
    // }

    public function getByUser(User $user) 
    {
        $chatrooms = $user->chatroom()->getResults();
        $chatrooms->load("messages");

        return $chatrooms;
    }

    public function create(User $user, $title)
    {
           
    }

}