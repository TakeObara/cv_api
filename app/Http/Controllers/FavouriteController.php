<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Controllers\Controller;


class FavouriteController extends Controller
{

    private $favourite;
    private $auth;

    public function __construct(
        \Cv\Service\FavouriteService $favourite,
        \Cv\Service\AuthService $auth
    ) 
    {
        $this->favourite = $favourite;
        $this->auth = $auth;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $me = $this->auth->getLoginedUser();

        $profiles = $this->favourite->getAllByUser($me);

        return response()->json($profiles);
    }

    public function update($favouriteUserId)
    {
        $me = $this->auth->getLoginedUser();

        if(!$this->auth->ifUserExists($favouriteUserId)) {
            return response()->json("user not found",404);
        }

        $this->favourite->addFavourite($me, $favouriteUserId);

        return response()->json("updated");
    }
}
