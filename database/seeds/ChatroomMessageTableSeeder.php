<?php

use Illuminate\Database\Seeder;

use Cv\Model\Chatroom;

class ChatroomMessageTableSeeder extends Seeder
{
    public function __construct(
        \Cv\Service\ChatroomService $chatroom,
        \Cv\Service\MessageService $message
    )
    {
        $this->chatroom = $chatroom;
        $this->message = $message;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('messages')->delete();
        DB::table('chatrooms')->delete();
        DB::table('chatroom_user')->delete();

        $chatroomDatas = [
            ['title' => 'title1', 'userIds' => [1, 2]],
            ['title' => 'title2', 'userIds' => [1, 3]],
            ['title' => 'title3', 'userIds' => [1, 4]],
            ['title' => 'title4', 'userIds' => [1, 5]],
            ['title' => 'title5', 'userIds' => [2, 3]],
            ['title' => 'title6', 'userIds' => [2, 4]],
            ['title' => 'title7', 'userIds' => [2, 5]],
            ['title' => 'title8', 'userIds' => [3, 4]],
            ['title' => 'title9', 'userIds' => [3, 5]],
            ['title' => 'title10','userIds' => [4, 5]],
        ];

        $messageDatas = [
            ['userId' => 1, 'chatroomId' => 1, 'message' => 'fafdadfafafdasa'],
            ['userId' => 2, 'chatroomId' => 1, 'message' => 'fafdadfafafdasa'],
            ['userId' => 1, 'chatroomId' => 2, 'message' => 'fafdadfafafdasa'],
            ['userId' => 3, 'chatroomId' => 2, 'message' => 'fafdadfafafdasa'],
            ['userId' => 1, 'chatroomId' => 3, 'message' => 'fafdadfafafdasa'],
            ['userId' => 4, 'chatroomId' => 3, 'message' => 'fafdadfafafdasa'],
            ['userId' => 1, 'chatroomId' => 4, 'message' => 'fafdadfafafdasa'],
            ['userId' => 5, 'chatroomId' => 4, 'message' => 'fafdadfafafdasa'],
            ['userId' => 2, 'chatroomId' => 5, 'message' => 'fafdadfafafdasa'],
            ['userId' => 3, 'chatroomId' => 5, 'message' => 'fafdadfafafdasa'],
            ['userId' => 2, 'chatroomId' => 6, 'message' => 'fafdadfafafdasa'],
            ['userId' => 4, 'chatroomId' => 6, 'message' => 'fafdadfafafdasa'],
            ['userId' => 2, 'chatroomId' => 7, 'message' => 'fafdadfafafdasa'],
            ['userId' => 5, 'chatroomId' => 7, 'message' => 'fafdadfafafdasa'],
            ['userId' => 3, 'chatroomId' => 8, 'message' => 'fafdadfafafdasa'],
            ['userId' => 4, 'chatroomId' => 8, 'message' => 'fafdadfafafdasa'],
            ['userId' => 3, 'chatroomId' => 9, 'message' => 'fafdadfafafdasa'],
            ['userId' => 5, 'chatroomId' => 9, 'message' => 'fafdadfafafdasa'],
            ['userId' => 4, 'chatroomId' => 10,'message' => 'fafdadfafafdasa'],
            ['userId' => 5, 'chatroomId' => 10,'message' => 'fafdadfafafdasa'],
        ];

        
        foreach ($chatroomDatas as $index => $data){
            $chatroom = $this->chatroom->create($data['title'], $data['userIds']);
            $this->changeId($chatroom , $index + 1);
        }
        foreach ($messageDatas as $data){
            $this->message->chat($data['userId'], $data['chatroomId'], $data['message']);
        }
    }

    private function changeId(&$chatroom, $newId){
        $chatroom->id = $newId;
        $chatroom->save();
    }
}
