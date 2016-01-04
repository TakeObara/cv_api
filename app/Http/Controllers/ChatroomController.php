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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $chatroom = new Chatroom;
        $chatroom->title = $title;
        $chatroom->save();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $chatroom = Chatroom::find($id);
        // 処理
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
        $validator = \Validator::make($request->all(), []);
        $chatroom = Chatroom::find($id);
        // 処理
        $chatroom->save();

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Chatroom::findOrFail($id)->delete();
    }
}
