<?php

namespace Cv\Service;

use Auth;
use Validator;

use Cv\Model\User;
use Cv\Model\AppointmentUser;
use Cv\Model\Appointment;

class AppointmentService {

    private $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    public function getByUser(User $user) {

        $appointmentIds = AppointmentUser::where("user_id","=",$user->id)->lists("appointment_id");

        return Appointment::with("appointmentUsers.user.profile")->whereIn("id",$appointmentIds)->get();
    }

    public function validate($inputs) {
         $validationRules = [
            'meetingTime'   => ['required', 'regex:/^\d\d\d\d-\d\d-\d\d \d\d:\d\d$/'],
            'userId'  => ['required'],
            'place'  => ['required'],
        ];

        return Validator::make($inputs, $validationRules);
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


    public function create($userId, $hostId, $guest,$place, $meetingTime){

        if($this->haveMissingUser([$userId])){
            throw new Cv\Exceptions\MissingModelException;
        }

    	$appointment = new Appointment;
        $appointment->host_user_id = $hostId;
        $appointment->guest        = $guest;
        $appointment->place        = $place;
        $appointment->meeting_time = $meetingTime;
    	$appointment->save();

        // create appointmetUser
        foreach ([$userId, $hostId] as $singleUserId) {
            $appoinmentUser = new AppointmentUser;
            $appoinmentUser->appointment_id = $appointment->id;
            $appoinmentUser->user_id = $singleUserId;
            if($singleUserId === $hostId) {
                $appoinmentUser->answer  = true;
            }else {
                $appoinmentUser->answer  = false;    
            }
            
            $appoinmentUser->save();
        }

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
        return User::whereIn("id",$userIds)->count() <= 0; 
    }
}