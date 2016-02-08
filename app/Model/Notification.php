<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{

    const TYPE_MESSAGE       = 1;
    const TYPE_APPOINTMENT   = 2;
    const TYPE_SYSTEM        = 3;

	protected $table = "notification";

    protected $casts = [
        'read' => 'boolean',
    ];
    
    public function user(){
    	return $this->belongsTo('Cv\Model\User');
    }

    public function targets() {
        return $this->belongsTo('Cv\Model\Profile','target_user_id','user_id');
    }

}