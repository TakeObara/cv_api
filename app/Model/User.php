<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Auth\Authenticatable;
use Illuminate\Auth\Passwords\CanResetPassword;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;


class User extends Model implements AuthenticatableContract
{
    use Authenticatable;

    protected $table = "users";

    protected $hidden = array('google_id','password', 'remember_token');
    public $timestamps = true;

    public function profile(){
       return $this->hasOne('Cv\Model\Profile');
    }

    public function favourites(){
       return $this->belongsToMany('Cv\Model\User','favourites' ,'user_id', 'favourite_user_id');
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