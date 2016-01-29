<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Profile;

class AppointmentService {

    private $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    public function get($id, User $user){
    	$appointment = Appointment::whereIn("id", "=", $id);
        if(is_null($appointment)){
            throw new Cv\Exceptions\NoPermissionModel;
        }

        $havePermitToJoin = false;
        foreach ($appointment->user as $userInAppointment){
            if($userInAppointment->id === $user->id){
                $havePermitToJoin = true;
            }
        }

        if(!$havePermitToJoin){
            throw new Cv\Exceptions\NoPermissionModel;
        }
        return $appointment;
    }

    public function create($userIds, $hostUserId, $place, $meetingTime, $answer){

        if($this->haveMissingUser($userIds)){
            throw new Cv\Exceptions\MissingModelException;
        }

    	$appointment = new Appointment;
        $appointment->host_user_id = $hostUserId;
        $appointment->place        = $place;
        $appointment->meeting_time = $meetingTime;
    	$appointment->save();

        $appointment->user()->sync($userIds);
        $appointment->user()->answer = $answer;

        $appointment->load("user");

        return $appointment;

    }

    public function cancel($hostUserId, $appointmentId){
        if($this->haveMissingUser($hostUserId)){
            throw new Cv\Exceptions\MissingModelException;
        }

        $appointment = Chatroom::findOrDie($appointmentId);
        if(is_null($appointment)){
            throw new Cv\Exceptions\MissingModelException;
        }
        // I don't know cancel processes
    }

    public function haveMissingUser($userIds) {
        $userInModel = User::select("id")->whereIn("id",$userIds)->lists("id")->all();
        foreach ($userIds as $userId) {
            if(!in_array($userId, $userInModel)) {
                return true;
            }
        }
        return false;
    }
}