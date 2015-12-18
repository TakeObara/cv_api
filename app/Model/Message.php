<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

	protected $table = "messages";
    
    public function user(){
    	return $this->belongsTo('Cv\Model\User');
    }

	public function chatroom(){
    	return $this->belongsTo('Cv\Model\Chatroom');
    }

}