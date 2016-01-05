<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

    const GENDER_UNISEX = 0;
    const GENDER_MALE   = 1;
    const GENDER_FEMALE = 2;

	protected $table = "profiles";
    
    public function user(){
    	return $this->belongsTo('Cv\Model\User');
    }

}