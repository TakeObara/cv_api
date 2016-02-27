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
    Route::get('auth/login', 'Auth\AuthController@login');
    Route::post('auth/register', 'Auth\AuthController@register');

    // for developing purpose
    Route::post('auth/fakelogin', 'Auth\AuthController@fakeLogin');

    Route::get('auth/fb/oauth2callback', 'Auth\AuthController@facebookOauth2Callback');
    Route::get('auth/tw/oauth2callback', 'Auth\AuthController@twitterOauthCallback');

    Route::group(['middleware' => 'auth'], function() {

        Route::get('profile/me', 'ProfileController@loginedInfo');
        Route::post('profile/me/upload', 'ProfileController@upload');

        Route::resource('profile', 'ProfileController', ['only' => ['index','show','update']]);    

        Route::resource('favourite', 'FavouriteController', ['only' => ['index', 'update','destroy']]);

        // appointment
        Route::put('appointment/markAsRead', 'AppointmentController@markAsRead');
        Route::put('appointment/{id}/answer', 'AppointmentController@answer');
        Route::put('appointment/{id}/met', 'AppointmentController@met');
        Route::resource('appointment', 'AppointmentController');

        // ペイメント機能が審査中だから、ペイメントなしの認証（暫定）
        Route::put('appointment/{id}/answer-fake', 'AppointmentController@answerFake');
        

        Route::resource('chatroom', 'ChatroomController', ['except' => 'create']);
        Route::post('chatroom/{id}/upload', 'ChatroomController@upload');
        Route::put('chatroom/{id}/markAsRead', 'ChatroomController@markAsRead');

        Route::post('contact', 'ContactController@send');

        Route::get('test123', 'PaymentController@yahooFastpayCallback');
    });
    
});

Route::get('/privacy', function() {
    return view("app.privacy");
});
Route::get('/terms-iframe', function() {
    return view("app.terms-iframe");
});

Route::group(['middleware' => 'auth'], function() {

    Route::get('transaction', 'TransactionController@index');
    Route::post('transaction', 'TransactionController@update');
});

// Frontend Application 
Route::controller('/', 'AppController');

