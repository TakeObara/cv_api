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

Route::get('/', function () {
    return response()->json("try /api/v1/profile");
});

Route::group(['prefix' => '/api/v1'], function () {

    Route::post('auth/login', 'Auth\AuthController@login');
    Route::post('auth/register', 'Auth\AuthController@register');

    Route::resource('profile', 'ProfileController');
});
