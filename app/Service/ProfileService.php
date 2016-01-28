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
        return Profile::orderBy("updated_at", "desc")->take($limit)->skip($offset)->get();
    }

    
    public function getProfileByUserId($userId)
    {
        return Profile::where("user_id","=",$userId)->first();
    }

    public function haveModifyPermission($userId)
    {
        $loginedUser = $this->auth->getLoginedUser();

        // only current user are allow to modify profile
        return $loginedUser->id == $userId;
    }

    public function updateProfileImage($userId, $url) 
    {
        $profile = Profile::where("user_id","=",$userId)->first();
        $profile->profile_image_url = $url;
        $profile->save();
    }

    public function save($userId, $data)
    {
        $profile = Profile::where("user_id","=",$userId)->first();
        $profile->name               = $data['name'];
        $profile->description        = $data['description'];
        $profile->place              = $data['place'];
        $profile->resource_introduce = $data['resource_introduce'];
        $profile->resource_needed    = $data['resource_needed'];
        $profile->gender             = $data['gender'];
        $profile->is_public          = $data['is_public'] === 'true' || $data['is_public'] === true;
        $profile->save();

        return $profile;
    }

}