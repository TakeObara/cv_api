<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Requests;
use Cv\Http\Controllers\Controller;

class AppController extends Controller
{

    private $react;

    public function __construct(\Cv\Service\ReactService $react) 
    {
        $this->react = $react;
    }

    public function getIndex() 
    {
        return view('app.index', [
                'react' => $this->react
            ]);
    }

    public function getProfile()
    {
        return view('app.index', [
                'react' => $this->react
            ]);   
    } 

    public function getFavourite() 
    {
        return view('app.index', [
                'react' => $this->react
            ]);
    }

    public function getMessages() 
    {
        return view('app.index', [
                'react' => $this->react
            ]);
    }

    public function getAppointment() 
    {
        return view('app.index', [
                'react' => $this->react
            ]);
    }

    public function getInfo() 
    {
        return view('app.index', [
                'react' => $this->react
            ]);
    }
}
