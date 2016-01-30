<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{

	protected $table = "appointments";
	   
    public function host(){
    	return $this->hasOne('Cv\Model\User','host_user_id');
    }

    public function appointmentUsers() {
        return $this->hasMany("Cv\Model\AppointmentUser");
    }
}