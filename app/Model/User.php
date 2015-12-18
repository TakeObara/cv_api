<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    public function profile(){
       return $this->hasOne('Cv\Model\Profile');
    }

    public function favorite(){
       return $this->hasMany('Cv\Model\Favorite');
    }

    public function message(){
       return $this->hasMany('Cv\Model\Message');
    }

    public function chatroom(){
       return $this->belongsToMany('Cv\Model\Chatroom');
    }

    public function appointment(){
       return $this->belongsToMany('Cv\Model\Appointment');
    }
    
}