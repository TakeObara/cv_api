<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class ChatroomUser extends Model
{
 
 	protected $table = "chatroom_user";
    
    public function chatroom(){
    	return $this->hasOne('Cv\Model\Chatroom');
    }

}