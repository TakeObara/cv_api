<?php

namespace Cv\Service;

use Auth;

use DB;
use Cv;
use Cv\Model\User;
use Cv\Model\Chatroom;

use Illuminate\Support\Collection;

class ChatroomService {

    // private $auth;

    // public function __construct(AuthService $auth)
    // {
    //     $this->auth = $auth;
    // }

    public function getByUser(User $user) 
    {
        $chatrooms = $user->chatroom()->getResults();
        $chatrooms->load("message","users","users.profile");

        return $chatrooms;
    }

    public function inRoom($userId, $chatroomId)
    {
        $pv = "chatroom_user";

        return DB::table($pv)
            ->where("user_id","=",$userId)
            ->where("chatroom_id","=",$chatroomId)
            ->count() > 0;
    }

    public function get($id, User $user)
    {
        $chatroom = Chatroom::with("users","users.profile")->with(["message" => function($query) {
            $query->orderBy("created_at","asc")->take(20);
        }])->where("id","=",$id)->first();
        if(is_null($chatroom)) {
            throw new Cv\Exceptions\NoPermissionModel;
        }

        $havePermitToJoin = false;
        foreach ($chatroom->users as $userInChatroom) {
            if($userInChatroom->id === $user->id) {
                $havePermitToJoin = true;
            }
        }

        if(!$havePermitToJoin) {
            throw new Cv\Exceptions\NoPermissionModel;
        }
        
        return $chatroom;
    }    

    public function create($title, $userIds)
    {   
        if($this->haveMissingUser($userIds)) {
            throw new Cv\Exceptions\MissingModelException;
        }

        $chatroom = $this->getByUserIds($userIds);
        if(!is_null($chatroom)) {

            $chatroom->load("users","users.profile");
            return $chatroom;
        }

        $chatroom = new Chatroom;
        $chatroom->title = $title;
        $chatroom->save();

        $chatroom->users()->sync($userIds);

        $chatroom->load("users","users.profile");

        return $chatroom;
    }

    public function update($chatroomId, $title, $userIds)
    {
        if($this->haveMissingUser($userIds)) {
            throw new Cv\Exceptions\MissingModelException;
        }

        $chatroom = Chatroom::findOrDie($chatroomId);
        if(is_null($chatroom)) {
            throw new Cv\Exceptions\MissingModelException;
        }

        $chatroom->title = $title;
        $chatroom->users()->sync($userIds);

        $chatroom->load("users");

        return $chatroom;
    }

    public function remove($chatroomId)
    {
        // Chatroom::findOrFail($chatroomId)->delete();
    }

    public function haveMissingUser($userIds) 
    {
        $userInModel = User::select("id")->whereIn("id",$userIds)->lists("id")->all();
        foreach ($userIds as $userId) {
            if(!in_array($userId, $userInModel)) {
                return true;
            }
        }
        return false;
    }

    // exactly match with userIds
    public function getByUserIds($userIds) {

        $pv = "chatroom_user";

        $users = collect($userIds)->sort();
        $chatroomIds = DB::table($pv)
            ->select("chatroom_id")
            ->where("user_id","=",$users[0])
            ->lists("chatroom_id")
        ;


        $userChatrooms = DB::table($pv)
            ->select("user_id","chatroom_id")
            ->whereIn("chatroom_id",$chatroomIds)
            ->orderBy("user_id","asc")
            ->get();
        ;

        $userChatroomMap = [];
        foreach ($userChatrooms as $item) {
            if(array_key_exists($item->chatroom_id, $userChatroomMap)) {
                $userChatroomMap[$item->chatroom_id][] = $item->user_id;
            }else {
                $userChatroomMap[$item->chatroom_id] = [$item->user_id];
            }
        }

        // matching
        $usersCount = $users->count();
        foreach ($userChatroomMap as $chatroom_id => $usersInMap) {
            if(count($usersInMap) === $usersCount) {
                $exactlySame = true;
                $i = 0;
                foreach($users as $user) {
                    if(intval($user) !== $usersInMap[$i]) {
                        $exactlySame = false;
                        break;
                    }
                    $i += 1;
                }

                if($exactlySame) {
                    return Chatroom::find($chatroom_id);
                }
            }
        }

        return null;
    }

}