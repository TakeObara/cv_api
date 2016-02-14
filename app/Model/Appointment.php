<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use SoftDeletes;

    const MET_UNKNOWN = 0;
    const MET_NO = 1;
    const MET_YES = 2;

	protected $table = "appointments";

    protected $casts = [
        'paid' => 'boolean',
    ];

    protected $dates = ['deleted_at', 'meeting_time'];
	   
    public function host(){
    	return $this->hasOne('Cv\Model\User','host_user_id');
    }

    public function appointmentUsers() {
        return $this->hasMany("Cv\Model\AppointmentUser");
    }
}