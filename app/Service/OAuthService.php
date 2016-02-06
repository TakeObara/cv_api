<?php

namespace Cv\Service;


class OAuthService {

    use OAuthTwitterService;
    use OAuthFacebookService;

    public function __construct() 
    {
        $this->initialFbService();
        $this->initialTwService();
    }

}