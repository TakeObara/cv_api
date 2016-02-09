<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Controllers\Controller;

use Config;
use Mail;

class ContactController extends Controller
{

    private $auth;

    public function __construct(
        \Cv\Service\AuthService $auth
    ) 
    {
        $this->auth = $auth;
    }

    public function send(Request $request) {

        $text = $request->get("text");
        if(empty($text)) {
            return response()->json("",401);
        }

        $user = $this->auth->getLoginedUser();
        $myProfile = $user->profile()->getResults();

        Mail::send('emails.admin-inquiry' , ["text" => $text, "me" => $myProfile] , function ($message) {
            $sender = Config::get('admin.mail');
            $message->to($sender)
                ->subject('【CV】問い合わせ');
        });

        return response()->json("",200);
    }
}
