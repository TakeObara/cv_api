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

    public function unreadCount($userId) 
    {
        return AppointmentUser::select("user_id")
            ->where("user_id","=",$userId)
            ->where("read","=",false)
            ->count()
        ;
    }

    public function markAsRead($userId) 
    {
        foreach (AppointmentUser::where("user_id","=",$userId)->get() as $a) {
            $a->read = true;
            $a->save();
        }
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
            $appointmentUser = new AppointmentUser;
            $appointmentUser->appointment_id = $appointment->id;
            $appointmentUser->user_id = $singleUserId;
            if($singleUserId === $hostId) {
                $appointmentUser->answer  = true;
                $appointmentUser->read    = true;
            }else {
                $appointmentUser->answer  = false;    
                $appointmentUser->read    = false;
            }
            
            $appointmentUser->save();
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