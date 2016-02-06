<?php

namespace Cv\Service;

use Auth;

use Cv\Model\User;
use Cv\Model\Profile;

use OAuth;

trait OAuthTwitterService {

    private $twitter;

    public function initialTwService() {
        $this->twitter = OAuth::consumer('Twitter', env('TWITTER_REDIRECT_URI'));

    }

    public function getTwitterAuthorizationUrl() {

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



}