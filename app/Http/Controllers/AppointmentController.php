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

        $appointments = $this->appointment->getByUser($me);

        return response()->json($appointments);
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
        $guest       = $request->get("guest");
        $userId      = $request->get("userId");
        $meetingTime = $request->get("meetingTime");
        $place       = $request->get("place");

        $validator = $this->appointment->validate($request->all());
        if($validator->fails()) {
            return response()->json($validator->messages(), 401);
        }

        $appointment = $this->appointment->create($userId, $me->id, $guest, $place, $meetingTime);

        return response()->json($appointment, 200);
    }

    public function destroy($id)
    {
        
        try {
            $this->appointment->delete($id);

            return response()->json("",200);

        } catch (\Cv\Exceptions\MissingModelException $e) {
            return response()->json("model missing", 404);
        } catch (\Cv\Exceptions\NoPermissionModel $e) {
            return response()->json("", 403);
        }
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
        // $appointment = $this->appointment->get($me);

        // return response()->json($appointment, 200);
    }

    public function markAsRead()
    {
        $me = $this->auth->getLoginedUser();
        
        $this->appointment->markAsRead($me->id);

        return response()->json("", 200);
    }

    public function answer($id, Request $request)
    {
        $me = $this->auth->getLoginedUser();

        $this->appointment->reject($id, $me->id);

        return response()->json("", 200);
    }

    public function met($id, Request $request)
    {
        try {
            $this->appointment->met($id, $request->get("met"));

            return response()->json("",200);

        } catch (\Cv\Exceptions\MissingModelException $e) {
            return response()->json("model missing", 404);
        } catch (\Cv\Exceptions\NoPermissionModel $e) {
            return response()->json("", 403);
        }
    }
}
