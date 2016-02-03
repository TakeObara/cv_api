<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Controllers\Controller;



class NotificationController extends Controller
{

    private $auth;
    private $notification;

    public function __construct(
        \Cv\Service\AuthService $auth,
        \Cv\Service\NotificationService $notification
    ) 
    {
        $this->auth = $auth;
        $this->notification = $notification;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $me = $this->auth->getLoginedUser();

        $notices = $this->notification->getByUserId($me->id);

        return response()->json($notices);
    }

}
