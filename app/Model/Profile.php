<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

	protected $table = "profiles";
    
    public function user(){
    	return $this->hasOne('Cv\Model\User');
    }

}