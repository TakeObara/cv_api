<?php

namespace Cv;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    
    public function user(){
    	return $this->belongsTo('Cv\User');
    }

	public function chatroom(){
    	return $this->belongsTo('Cv\Chatroom');
    }

}