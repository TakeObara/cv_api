<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Profile;

use OAuth;
use Config;

trait OAuthTwitterService {

    private $twitter;

    public function initialTwService() {
        $this->twitter = OAuth::consumer('Twitter', env('TWITTER_REDIRECT_URI'));

    }

    public function getTwitterAuthorizationUrl() {

        if(Config::get("app.debug")) {
            return "javascript: alert(\"Twitter OAuth are not support in local environment\");";
        }
        $reqToken = $this->twitter->requestRequestToken();

        // get Authorization Uri sending the request token
        $url = $this->twitter->getAuthorizationUri(['oauth_token' => $reqToken->getRequestToken()]);

        return (string)$url;
    }

    public function handleTwitterRedirectAndGetProfile($token, $verify) {
        // This was a callback request from facebook, get the token
        $token = $this->twitter->requestAccessToken($token, $verify);

        // Send a request with it
        $profile = json_decode($this->twitter->request('/account/verify_credentials.json'), true);

        return  $profile;
    }

    public function downloadTwitterProfileImage($imageUrl) {
        $img = file_get_contents($imageUrl);
        $file = "/shared/".$key = md5(microtime().rand()).".jpg";
        file_put_contents(public_path().$file, $img);

        return $file;
    }

}