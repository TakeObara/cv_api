<?php

return [

	/*
	|--------------------------------------------------------------------------
	| oAuth Config
	|--------------------------------------------------------------------------
	*/

	/**
	 * Storage
	 */
	'storage' => 'Session',

	/**
	 * Consumers
	 */
	'consumers' => [

		'Facebook' => [
			'client_id'     => env('FACEBOOK_CLIENT_ID'),
			'client_secret' => env('FACEBOOK_CLIENT_SECRET'),
			'scope'         => ['email','public_profile'],
		],

        'Twitter' => [
            'client_id'     => env('TWITTER_CLIENT_ID'),
            'client_secret' => env('TWITTER_CLIENT_SECRET'),
        ],

	]

];