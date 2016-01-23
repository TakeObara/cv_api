<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => '/api/v1'], function () {

    Route::get('auth/logout', 'Auth\AuthController@logout');
    Route::post('auth/login', 'Auth\AuthController@login');
    Route::post('auth/register', 'Auth\AuthController@register');

    // for developing purpose
    Route::get('auth/fakelogin', 'Auth\AuthController@fakeLogin');

    Route::get('auth/fb/oauth2callback', 'Auth\AuthController@facebookOauth2Callback');
    Route::get('auth/tw/oauth2callback', 'Auth\AuthController@twitterOauth2Callback');

    Route::group(['middleware' => 'auth'], function() {

        Route::get('profile/me', 'ProfileController@loginedInfo');
        Route::post('profile/me/upload', 'ProfileController@upload');
        Route::resource('profile', 'ProfileController', ['only' => ['index','show','update']]);    

        Route::resource('favourite', 'FavouriteController', ['only' => ['index', 'update','destroy']]);

        Route::resource('chatroom', 'ChatroomController', ['except' => 'create']);

        Route::post('chatroom/{id}/upload', 'ChatroomController@upload');

    });
    
});

Route::get('/privacy', function() {
    return view("app.privacy");
});

// Frontend Application 
Route::controller('/', 'AppController');

