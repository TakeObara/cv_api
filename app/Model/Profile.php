<?php

namespace Cv\Model;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'profiles';

    public function user() {
        return $this->hasOne('User', 'user_id');
    }
}
