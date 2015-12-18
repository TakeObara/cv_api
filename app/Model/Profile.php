<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    
    public function user(){
    	return $this->hasOne('Cv\Model\User');
    }

}