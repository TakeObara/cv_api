<?php

namespace Cv\Service;

use Auth;

use DB;
use Cv;
use Cv\Model\User;
use Cv\Model\Chatroom;
use Cv\Model\ChatroomUser;

use Illuminate\Support\Collection;

class ChatroomService {

    // private $auth;

    // public function __construct(AuthService $auth)
    // {
    //     $this->auth = $auth;
    // }

    public function find($id)
    {
        return Chatroom::find($id);
    }

    public function getByUser(User $user) 
    {
        $chatrooms = $user->chatroom()->getResults();
        $chatrooms->load("message","users","users.profile","chatroomUser");

        foreach ($chatrooms as $chatroom) {
            $this->transformData($chatroom);
        }

        return $chatrooms;
    }

    public function transformData(&$chatroom) {    
        $chatroom->unread_count = $chatroom->chatroomUser->unread_count;
        unset($chatroom->chatroomUser);
    }

    public function inRoom($userId, $chatroomId)
    {
        return ChatroomUser::select("user_id","chatroom_id")
            ->where("user_id","=",$userId)
            ->where("chatroom_id","=",$chatroomId)
            ->count() > 0
        ;
    }

    public function getUserIdInRoom($chatroomId) 
    {
        return ChatroomUser::select("user_id")
            ->where("chatroom_id","=",$chatroomId)
            ->lists("user_id")
        ;
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

        $this->transformData($chatroom);
        
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

    public function markAsRead($user_id, $chatroom_id)
    {
        $item = ChatroomUser::where("user_id","=",$user_id)
            ->where("chatroom_id","=",$chatroom_id)
            ->first();

        $item->unread_count = 0;
        $item->save();
    }

    public function unreadCount($user_id)
    {
        $count = 0;
        $cs = ChatroomUser::where("user_id",$user_id)->get();
        foreach ($cs as $c) {
            $count += $c->unread_count;
        }

        return $count;
    }

    public function addUnreadCount($user_id, $chatroom_id) 
    {
        $item = ChatroomUser::where("user_id","=",$user_id)
            ->where("chatroom_id","=",$chatroom_id)
            ->first();

        $item->unread_count += 1;
        $item->save();
    }

    // exactly match with userIds
    public function getByUserIds($userIds) 
    {

        $users = collect($userIds)->sort();
        $chatroomIds = ChatroomUser::select("chatroom_id")
            ->where("user_id","=",$users[0])
            ->lists("chatroom_id")
        ;


        $userChatrooms = ChatroomUser::select("user_id","chatroom_id")
            ->whereIn("chatroom_id",$chatroomIds)
            ->orderBy("user_id","asc")
            ->get();
        ;

        $userChatroomMap = [];
        foreach ($userChatrooms as $item) {
            $chatroomId = intval($item->chatroom_id);
            $userId     = intval($item->user_id);

            if(array_key_exists($chatroomId, $userChatroomMap)) {
                $userChatroomMap[$chatroomId][] = $userId;
            }else {
                $userChatroomMap[$chatroomId] = [$userId];
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