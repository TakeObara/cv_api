<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Requests;
use Cv\Http\Controllers\Controller;

use Cv\Model;

class AppointmentController extends Controller
{

    public $auth;
    public $appointment;

    public function __construct(
            \Cv\Service\AuthService $auth,
            \Cv\Service\AppointmentService $appointment
        )
    {
        $this->auth = $auth;
        $this->appointment = $appointment;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $me = $this->auth->getLoginedUser();

        return $this->appointment->getByUser($me);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $me          = $this->auth->getLoginedUser();
        $userIds     = $request->get("users");
        $meetingTime = $request->get("meetingTime");
        $place       = $request->get("place");
        $answer      = $request->get("answer");

        $appointment = $this->appointment->create($userIds, $me, $place, $place, $meetingTime, $answer);

        return $response()->json($appointment, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $me = $this->auth->getLoginedUser();
        $appointment = $this->appointment->get($me);

        return response()->json($appointment, 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
