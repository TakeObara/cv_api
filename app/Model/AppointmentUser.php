<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class AppointmentUser extends Model
{

	protected $table = "appointment_user";
	   
    public function user(){
    	return $this->belongsTo('Cv\Model\User', 'user_id');
    }
}