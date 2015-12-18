<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{
    
    public function message(){
    	return $this->hasMany('Cv\Model\Message');
    }

    public function user(){
    	return $this->belongsToMany('Cv\Model\User');
    }
    
}