<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{

	protected $table = "appointments";
	   
    public function user(){
    	return $this->belongsToMany('Cv\Model\User');
    }
}