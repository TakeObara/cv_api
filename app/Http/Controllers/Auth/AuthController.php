<?php

namespace Cv\Http\Controllers\Auth;

use Illuminate\Http\Request;

use Auth;
use Validator;
use Cv\Http\Controllers\Controller;

use Cv\Service\AuthService;


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
    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
        // $this->middleware('guest', ['except' => 'getLogout']);
    }

    public function login(Request $request) {
        Auth::loginUsingId(1);

        return response()->json('success');
    }

    public function register(Request $request) {

        $data = $request->all();

        $user = $this->auth->registerUser($data["name"], $data["email"],$data["password"]);

        return response()->json($user);
    }

    
}
