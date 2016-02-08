<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{

	protected $table = "chatrooms";

    public function chatroomUser() {
        return $this->hasOne('Cv\Model\ChatroomUser');
    }
    
    public function message(){
    	return $this->hasMany('Cv\Model\Message');
    }

    public function users(){
    	return $this->belongsToMany('Cv\Model\User', 'chatroom_user', 'chatroom_id' , 'user_id');
    }
    
}