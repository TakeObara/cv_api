<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Profile;

class ProfileService {

    private $auth;

    public function __construct(AuthService $auth)
    {
        $this->auth = $auth;
    }

    public function all($limit, $offset = 0) 
    {
        return Profile::orderBy("updated_at","desc")->take($limit)->skip($offset)->get();
    }

    
    public function getProfileByUserId($userId)
    {
        return Profile::where("user_id","=",$userId)->first();
    }

    public function haveModifyPermission($userId)
    {
        $loginedUser = $this->auth->getLoginedUser();

        // only current user are allow to modify profile
        return $loginedUser->id === $userId;
    }

    public function save($userId, $data)
    {
        $profile = Profile::where("user_id","=",$userId)->first();
        $profile->name              = $data['name'];
        $profile->description       = $request['description'];
        $profile->save();

        return $profile;
    }

}