<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Profile;

class AuthService {

    public function registerUser($name, $email, $password, $gender, $facebookId = null, $twitterId = null, $profileImage = "", $is_public = false) {

        $user = new User;
        $user->name = $name;
        $user->password = is_null($password) ? null : bcrypt($password);
        $user->email    = $email;
        $user->twitter_id = $twitterId;
        $user->facebook_id = $facebookId;
        $user->save();

        $profile = new Profile;
        $profile->name = $name;
        $profile->user_id = $user->id;
        $profile->gender = $gender;
        $profile->profile_image_url = $profileImage;
        $profile->description = "";
        $profile->is_public = $is_public;
        $profile->save();

        return $user;
    }

    public function getLoginedUser() {
        return Auth::user();
    }

    public function getUserByFacebookId($facebookId) {
        return User::where("facebook_id","=",$facebookId)->first();
    }

    public function getUserByEmail($email) {
        return User::where("email","=",$email)->first();
    }

    public function login($email, $password){

        $setRememberMeToken = true;

        if(Auth::attempt(['email' => $email, 'password' => $password], $setRememberMeToken)) {
            return Auth::user();
        }

        return null;
    }

    public function getUserById($id)
    {
        return User::find($id);
    }

    public function ifUserExists($userId)
    {
        return User::where("id","=",$userId)->count() > 0;
    }

    public function loginWithUser(User $user, $rememberMe = false) {
        Auth::login($user, $rememberMe);
    }

    public function logout() {

        Auth::logout();

    }

}