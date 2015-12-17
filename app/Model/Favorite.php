<?php

namespace Cv;

use Illuminate\Database\Eloquent\Model;

class Favorite extends Model
{
    
    public function user(){
    	return $this->belongsTo('Cv\User');
    }
    
}