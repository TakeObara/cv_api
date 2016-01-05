<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Favourite;

use Illuminate\Support\Collection;

use Illuminate\Database\Eloquent\ModelNotFoundException;

class FavouriteService {

    private $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    public function getAllByUser(User $user) {
        return $user->favourites()->getResults()->load("profile");
    }

    public function addFavourite(User $user, $favourUserId) {
        if(!$this->auth->ifUserExists($favourUserId)) {
            throw new ModelNotFoundException;
        }

        if(Favourite::where("user_id","=",$user->id)->where("favourite_user_id","=",$favourUserId)->count() > 0) {
            return;
        }

        $f = new Favourite;
        $f->user_id = $user->id;
        $f->favourite_user_id = $favourUserId;
        $f->save();
    }

    public function removeFavourite(User $user, $favourUserId) {
        Favourite::where("user_id","=",$user->id)->where("favourite_user_id", "=", $favourUserId)->delete();
    }
}