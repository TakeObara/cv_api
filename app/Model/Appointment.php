<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    
    public function user(){
    	return $this->belongsToMany('Cv\Model\User');
    }
}