<?php

namespace Cv;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    
    public function user(){
    	return $this->hasOne('Cv\User');
    }

}