<?php

namespace Cv\Service;

use Auth;
use Validator;

use Cv;
use Cv\Model\User;
use Cv\Model\AppointmentUser;
use Cv\Model\Appointment;

use Carbon\Carbon;

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

    public function get($id){
    	$appointment = Appointment::find($id);
        if(is_null($appointment)){
            throw new Cv\Exceptions\NoPermissionModel;
        }

        return $appointment;
    }

    public function getUsersIdInAppointment($id) 
    {
        return AppointmentUser::where("appointment_id","=",$id)->lists("user_id");
    }

    public function met($id, $met)
    {
        $appointment = Appointment::find($id);
        if(is_null($appointment)) {
            throw new Cv\Exceptions\MissingModelException;
        }

        // if(!$this->haveModifyPermission($appointment)) {
        //     throw new Cv\Exceptions\NoPermissionModel;
        // }

        $meetingTime = (int)$appointment->meeting_time->format('YmdHi');
        $now = (int)date('YmdHi');
        
        if(!$appointment->paid) {
            throw new Cv\Exceptions\MistakeBusinessLogicException;
        }

        if($appointment->met) {
            throw new Cv\Exceptions\MistakeBusinessLogicException;   
        }

        $appointment->met = $met;
        $appointment->save();

        return $appointment;
    }

    public function delete($id) 
    {
        $appointment = Appointment::find($id);
        if(is_null($appointment)) {
            throw new Cv\Exceptions\MissingModelException;
        }

        if(!$this->haveModifyPermission($appointment)) {
            throw new Cv\Exceptions\NoPermissionModel;
        }

        $meetingTime = (int)$appointment->meeting_time->format('YmdHi');
        $now = (int)date('YmdHi');

        if($now < $meetingTime) {
            // delete are not allow to be occured once user have answer and before 30 minutes of meetingTime
            throw new Cv\Exceptions\MistakeBusinessLogicException;
        }

        $appointment->delete();
    }

    public function haveModifyPermission(Appointment $appointment)
    {

        $me = $this->auth->getLoginedUser();

        return $appointment->host_user_id === $me->id;
    }

    // 被紹介者がアポイントに参加しないと答えました
    public function reject($appointmentId, $userId)
    {
        $this->answer($appointmentId, $userId, AppointmentUser::ANSWER_NO_GOING);
    }

    public function answer($appointmentId, $userId, $answer)
    {
        $appointment = AppointmentUser::with("appointment")->where("user_id","=",$userId)
            ->where("appointment_id","=",$appointmentId)
            ->first()
        ;

        if(is_null($appointment)) {
            throw new Cv\Exceptions\MissingModelException;
        }

        $meetingTime = (int)$appointment->appointment->meeting_time->format('YmdHi');
        $now = (int)date('YmdHi');

        if($now > $meetingTime) {
            throw new Cv\Exceptions\MistakeBusinessLogicException;
        }


        $appointment->answer = $answer;
        $appointment->reply_time = date('Y-m-d H:i:s');
        $appointment->save();
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

    public function isMeetingTimeCorrect($meetingTimeInStr) 
    {
        $meetingTime =  preg_replace("/[\?\-\s:]/", "", $meetingTimeInStr);
        $now = Carbon::now()->format("YmdHi");
        
        // DEVELOPMENT PURPOSE: 
        // 本番では、100 （１時間前）=> 10000（１日前） 
        return $meetingTime > $now + 100;
    }

    public function create($userId, $hostId, $guest,$place, $meetingTime){

        if($this->haveMissingUser([$userId])){
            throw new Cv\Exceptions\MissingModelException;
        }

    	$appointment = new Appointment;
        $appointment->host_user_id = $hostId;
        $appointment->guest        = $guest;
        $appointment->place        = $place;
        $appointment->meeting_time = $meetingTime .":00";
    	$appointment->save();

        // create appointmetUser
        foreach ([$userId, $hostId] as $singleUserId) {
            $appointmentUser = new AppointmentUser;
            $appointmentUser->appointment_id = $appointment->id;
            $appointmentUser->user_id = $singleUserId;
            if($singleUserId === $hostId) {
                $appointmentUser->answer  = AppointmentUser::ANSWER_YES_GOING;
                $appointmentUser->read    = true;
            }else {
                $appointmentUser->answer  = AppointmentUser::ANSWER_NOT_YET;    
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