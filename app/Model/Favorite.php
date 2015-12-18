<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{

	protected $table = "favorites";
    
    public function user(){
    	return $this->belongsTo('Cv\Model\User');
    }
    
}