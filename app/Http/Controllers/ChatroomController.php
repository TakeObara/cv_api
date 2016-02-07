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
    public $uploadService;
    public $message;

    public function __construct(
            \Cv\Service\ChatroomService $chatroom,
            \Cv\Service\AuthService $auth,
            \Cv\Service\UploadService $upload,
            \Cv\Service\MessageService $message
        ) {

        $this->uploadService = $upload;
        $this->chatroom = $chatroom;
        $this->auth = $auth;
        $this->message = $message;
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

    public function upload($chatroomId, Request $request) 
    {
        $file = $request->file("file");

        $validator = $this->uploadService->validate($file);
        if(!$validator["success"]){
            return response()->json([ "success" => false, "errors" => $validator["messages"] ] ,400);
        }

        $uploadedFile = $this->uploadService->saveImage($file);
        $userId = $this->auth->getLoginedUser()->id;
        $message = "<img src=\"".$uploadedFile["destination_path"] . $uploadedFile["filename"]."\" >";

        $this->message->chatInHtml($userId, $chatroomId, $message);
        return response()->json([ "success" => true , "message" => $uploadedFile ]);
    
    }

    public function markAsRead($chatroomId)
    {
        $me = $this->auth->getLoginedUser();
        
        $this->chatroom->markAsRead($me->id, $chatroomId);

        return response()->json("",200);
    }
}
