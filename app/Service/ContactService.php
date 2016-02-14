<?php

namespace Cv\Service;

use Auth;
use Cv\Model\Contact;

class ContactService {

    public function save($userId, $message){
        $contact = new Contact;
        $contact->user_id = $userId;
        $contact->message = $message;
        $contact->save();
    }
    
    public function getContactsByUserId($userId){
        return Contact::where('user_id', '=', $userId)->get();
    }
}