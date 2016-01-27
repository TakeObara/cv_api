<?php

namespace Cv\Http\Controllers\Auth;

use Illuminate\Http\Request;

use Auth;
use Validator;
use Cv\Http\Controllers\Controller;


class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct(
        \Cv\Service\AuthService $auth,
        \Cv\Service\OAuthService $oauth
    )
    {
        $this->auth = $auth;
        $this->oauth = $oauth;
        // $this->middleware('guest', ['except' => 'getLogout']);
    }

    public function register(Request $request){

        $data = $request->all();
        $this->auth->registerUser($data['name'], $data['email'], $data['password'], $data['gender']);
    }

    public function fakeLogin(Request $request){

        $data = $request->all();
        $this->auth->login($data['email'], $data['password']);

    }

    public function logout() {

        $this->auth->logout();

        return redirect("/login");
    }
    
    public function facebookOauth2Callback(Request $request) {
        if(!$request->has('code')) {
            return redirect("/login");
        }

        $code = $request->get('code');

        $profile = $this->oauth->handleFacebookRedirectAndGetProfile($code);

        $user = null;
        if(is_null($profile["email"])) {
            $user = $this->auth->getUserByFacebookId($profile["id"]);
        }else {
            $user = $this->auth->getUserByEmail($profile["email"]);
        }
        
        if(is_null($user)) {
            // Register account if there is not exists
            $profileImage = $this->oauth->downloadFacebookProfileImage($profile["id"]);
            $user = $this->auth->registerUser($profile["name"], $profile["email"], null, $profile["gender"] , $profile["id"], null,$profileImage);
        }

        $this->auth->loginWithUser($user, true);

        // redirect to application
        return redirect("/");
    }

    public function twitterOauth2Callback(Request $request) {
        if(!$request->has('code')) {
            return redirect("/login");
        }   
    }
}
