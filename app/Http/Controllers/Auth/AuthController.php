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
    public function __construct(\Cv\Service\AuthService $auth)
    {
        $this->auth = $auth;
        // $this->middleware('guest', ['except' => 'getLogout']);
    }

    // for developing purpose
    public function fakeLogin(Request $request) {
        if(!\Config::get('app.debug')) {
            return response(400);
        }

        $data = $request->all();

        $user = $this->auth->login($data['email'], $data['pwd']);

        if(is_null($user)) {
            return response()->json("failed to login", 401);
        }

        // load profile data
        $user->load('profile');

        return response()->json($user, 200);
    }

    public function login(Request $request) {
        $data = $request->all();

        $user = $this->auth->login($data['email'], $data['password']);

        if(is_null($user)) {
            return response()->json("failed to login", 401);
        }

        // load profile data
        $user->load('profile');

        return response()->json($user,200);
    }

    public function register(Request $request) {

        $data = $request->all();

        $user = $this->auth->registerUser($data["name"], $data["email"], $data["password"]);

        // After account is registered, login with the registered user
        $this->auth->loginWithUser($user);

        // load profile data
        $user->load('profile');

        return response()->json($user);
    }

    public function logout() {

        $this->auth->logout();

        return response()->json("logout", 200);
    }

    public function login_form(){
        return view('auths.login');
    }

    public function register_form(){
        return view('auths.register');
    }
    
}
