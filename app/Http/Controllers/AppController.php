<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Session;

use Cv\Http\Requests;
use Cv\Http\Controllers\Controller;

class AppController extends Controller
{

    private $react;
    private $auth;
    private $oauth;
    private $profile;

    public function __construct(
        \Cv\Service\AuthService $auth,
        \Cv\Service\ProfileService $profile,
        \Cv\Service\ChatroomService $chatroom,
        \Cv\Service\AppointmentService $appointment,
        \Cv\Service\OAuthService $oauth
    ) 
    {
        $this->react = null;
        $this->auth  = $auth;
        $this->profile = $profile;
        $this->oauth   = $oauth;
        $this->chatroom = $chatroom;
        $this->appointment = $appointment;

        $me = $this->auth->getLoginedUser();

        $loginedUserProfile = null;    
        $facebookLoginUrl = null;
        $twitterLoginUrl = null;
        $myNotification = null;


        if(is_null($me)) {
            $facebookLoginUrl = $this->oauth->getFacebookAuthorizationUrl();
            $twitterLoginUrl  = $this->oauth->getTwitterAuthorizationUrl();
            Session::put("userId",null);
        } else {
            $loginedUserProfile = $this->profile->getProfileByUserId($me->id)->toArray();    
            $myNotification = [
                "chatroom_unread_count" => $this->chatroom->unreadCount($me->id),
                "appointment_unread_count" => $this->appointment->unreadCount($me->id),

            ];
            Session::put("userId",$me->id);
        }

        $this->viewParams = [
            'react' => $this->react,
            'loginedUserProfile' => $loginedUserProfile,
            'facebookLoginUrl'   => $facebookLoginUrl,
            'twitterLoginUrl'    => $twitterLoginUrl,
            'myNotification'     => $myNotification,
        ];  
    }

    public function getIndex() 
    {
        return view('app.index', $this->viewParams);
    }

    public function getTutorial() 
    {
        return view('app.index', $this->viewParams);
    }        

    public function getProfile()
    {
        return view('app.index', $this->viewParams);
    } 

    public function getFavourite() 
    {
        return view('app.index', $this->viewParams);
    }

    public function getChatroom() 
    {
        return view('app.index', $this->viewParams);
    }

    public function getAppointment() 
    {
        return view('app.index', $this->viewParams);
    }

    public function getInfo() 
    {
        return view('app.index', $this->viewParams);
    }

    public function getLogin() 
    {
        return view('app.index', $this->viewParams);
    }

    public function getConfiguration() 
    {
        return view('app.index', $this->viewParams);
    }
}
