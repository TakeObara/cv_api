<?php

namespace Cv;

use Illuminate\Database\Eloquent\Model;

class Chatroom extends Model
{
    
    public function message(){
    	return $this->hasMany('Cv\Message');
    }

    public function user(){
    	return $this->belongsToMany('Cv\User');
    }
    
}