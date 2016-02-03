<?php

namespace Cv\Service;

use Cv\Model\Notification;

class NotificationService {

    public function __construct() 
    {

    }

    public function getByUserId($userId)
    {
        return Notification::with('targets')->where("user_id","=",$userId)->get();
    }

    public function markAsRead($id)
    {
        $n = Notification::find($id);
        $n->read = true;
        $n->save();
    }

    public function notify($userId, $targetUserId, $type, $message, $markAsRead = false) 
    {
        $n = new Notification;
        $n->user_id = $userId;
        $n->target_user_id = $targetUserId;
        $n->message = $message;
        $n->read = $markAsRead;
        $n->save();

        return $n;
    }

    
    public function handleException(V8JsException $e) 
    {
        abort(500, $e);
    }

}