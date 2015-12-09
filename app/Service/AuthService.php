<?php

namespace Cv\Service;

use Cv\Model\User;
use Cv\Model\Profile;

class AuthService {

    public function registerUser($name, $email,$password) {

        $user = new User;
        $user->name = $name;
        $user->password = bcrypt($password);
        $user->email    = $email;
        $user->save();

        $profile = new Profile;
        $profile->name = $name;
        $profile->user_id = $user->id;
        $profile->description = "";
        $profile->save();

        return $user;
    }

}