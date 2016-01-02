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

    public function getLoginedUser() {
        return Auth::user();
    }

    public function login($email, $password){

        // 
        $setRememberMeToken = true;

        if(Auth::attempt(['email' => $email, 'password' => $password], $setRememberMeToken)) {
            return Auth::user();
        }

        return null;
    }

    public function ifUserExists($userId) 
    {
        return User::where("id","=",$userId)->count() > 0;
    }

    public function loginWithUser(User $user) {
        Auth::login($user);
    }

    public function logout() {
        
        Auth::logout();
        
    }

}