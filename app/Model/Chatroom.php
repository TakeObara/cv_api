<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{

	protected $table = "chatrooms";
    
    public function message(){
    	return $this->hasMany('Cv\Model\Message');
    }

    public function user(){
    	return $this->belongsToMany('Cv\Model\User');
    }
    
}