<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{

	protected $table = "favourites";
    
    public function user() {
    	return $this->hasOne('Cv\Model\User', 'user_id');
    }

    public function favouriteUser() {
        return $this->hasOne('Cv\Model\User', 'favorite_user_id');
    }
    
}