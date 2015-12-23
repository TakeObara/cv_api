<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Profile;

class AuthService {

    public function registerUser($name, $email, $password) {

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

    public function login($email, $password){

        $hashed_password = bcrypt($password);
        $user = User::where('email', $email)
            ->where('password', $hashed_password)
            ->first();
        
        if(null !== $user && Auth::login($user)){
            return response()->json('success');
        }
        else{
            return response()->json('failed');
        }

    }

    public function logout() {
        if (Auth::check()){
            Auth::logout();
        }
    }

}