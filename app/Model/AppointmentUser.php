<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class AppointmentUser extends Model
{

    const ANSWER_NOT_YET = 0;
    const ANSWER_NO_GOING = 1;
    const ANSWER_YES_GOING = 2;

	protected $table = "appointment_user";

    protected $casts = [
        'appointment_id' => 'integer',
        'user_id' => 'integer',
        'answer' => 'integer',
        'read' => 'integer',
    ];
	
    public function user(){
    	return $this->belongsTo('Cv\Model\User', 'user_id');
    }
}