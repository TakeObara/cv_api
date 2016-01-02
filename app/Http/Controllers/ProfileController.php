<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Controllers\Controller;



class ProfileController extends Controller
{

    private $profile;
    private $auth;

    public function __construct(
        \Cv\Service\ProfileService $profile,
        \Cv\Service\AuthService $auth
    ) 
    {
        $this->profile = $profile;
        $this->auth = $auth;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $limit = 10;

        $profiles = $this->profile->all($limit);

        return response()->json($profiles);
    }

    public function loginedInfo()
    {
        $me = $this->auth->getLoginedUser();

        $loginedUserProfile = $this->profile->getProfileByUserId($me->id);

        return response()->json($loginedUserProfile);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        $profile = $this->profile->getProfileByUserId($userId);

        if(is_null($profile)) {
            return response()->json("not found",404);
        }
        return response()->json($profile, 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $userId)
    {
        if(!$this->profile->haveModifyPermission($userId)) {
            return response()->json("no permission", 403);
        }

        $updatedProfile = $this->profile->update($userId, $request);
        
        return response()->json($updatedProfile, 200);
    }

}
