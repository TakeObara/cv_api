<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Requests;
use Cv\Http\Controllers\Controller;

use Cv\Model;

class ChatroomController extends Controller
{

    public $auth;
    public $chatroom;

    public function __construct(
            \Cv\Service\ChatroomService $chatroom,
            \Cv\Service\AuthService $auth
        ) {

        $this->chatroom = $chatroom;
        $this->auth = $auth;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $me = $this->auth->getLoginedUser();

        return $this->chatroom->getByUser($me);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $userIds = $request->get("users");
        $title   = $request->get("title");

        $chatroom = $this->chatroom->create($title, $userIds);

        return response()->json($chatroom, 200);
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
        //
        $chatroom = $this->chatroom->get($id, $me);

        return response()->json($chatroom, 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $chatroom = $this->chatroom->update($id,$request->get("title"), $request->get("users"));

            return response()->json($chatroom, 200);

        } catch (\Cv\Exceptions\MissingModelException $e) {

            return response()->json("model missing", 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->chatroom->remove($id);

        return response()->json($chatroom, 200);
    }
}
