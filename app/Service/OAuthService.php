<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Profile;

use OAuth;

class OAuthService {

    private $fb;

    public function __construct() {
        $this->fb = OAuth::consumer('Facebook', env('FACEBOOK_REDIRECT_URI'));

    }

    public function getAuthorizationUrl() {
        return (string)$this->fb->getAuthorizationUri();
    }

    public function handleFacebookRedirectAndGetProfile($code) {
        // This was a callback request from facebook, get the token
        $token = $this->fb->requestAccessToken($code);

        // Send a request with it
        $profile = json_decode($this->fb->request('/me'), true);

        
        $this->transformFacebookResponse($profile);

        return  $profile;
    }

    public function downloadFacebookProfileImage($facebookId) {
        $img = file_get_contents('https://graph.facebook.com/v2.5/'.$facebookId.'/picture?type=large');
        $file = "/shared/".$key = md5(microtime().rand()).".jpg";
        file_put_contents(public_path().$file, $img);

        return $file;
    }

    public function transformFacebookResponse(&$res) {
        $gender = Profile::GENDER_UNISEX;
        if(array_key_exists("gender", $res)) {
            if($res["gender"] === 'male') {
                $gender = Profile::GENDER_MALE;
            }else if($res["gender"] === 'female') {
                $gender = Profile::GENDER_FEMALE;
            }
        }
        $res["gender"] = $gender;
    }
}