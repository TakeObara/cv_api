<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    
    const PAYMENT_UNKNOWN = 0;
    const PAYMENT_SUCCESS = 1;
    const PAYMENT_RETURN = 2;

    protected $table = "transaction_history";

    public $timestamps = true;

    public function appointment(){
       return $this->belongsToMany('Cv\Model\Appointment');
    }
    
}