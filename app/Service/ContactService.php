<?php

namespace Cv\Service;

use Auth;

use DB;
use Cv;
use Cv\Model\Contact;

use Illuminate\Support\Collection;

class ContactService {
    public function __construct(){}

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