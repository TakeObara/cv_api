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


// Route::get('/', function () {
//     return response()->json("try /api/v1/profile");
// });

// Authentication Routes
Route::get('auth/login', 'Auth\AuthController@login_form');
Route::post('auth/login', 'Auth\AuthController@login');
Route::get('auth/logout', 'Auth\AuthController@getLogout');

// Registration Routes
Route::get('auth/register', 'Auth\AuthController@register_form');
Route::post('auth/register', 'Auth\AuthController@register');


Route::group(['prefix' => '/api/v1'], function () {

    Route::get('auth/logout', 'Auth\AuthController@logout');
    Route::post('auth/login', 'Auth\AuthController@login');
    Route::post('auth/register', 'Auth\AuthController@register');

    Route::get('auth/fakelogin', 'Auth\AuthController@fakeLogin');

    Route::group(['middleware' => 'auth'], function() {

        Route::get('profile/me', 'ProfileController@loginedInfo');
        Route::resource('profile', 'ProfileController', ['only' => ['index','show','update']]);    

        Route::resource('favourite', 'FavouriteController', ['only' => ['index', 'update','destroy']]);

    });
    
});

// Frontend Application 
Route::controller('/', 'AppController');

