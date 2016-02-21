<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Controllers\Controller;

class TransactionController extends Controller
{

    public function __construct(
        \Cv\Service\TransactionService $transaction,
        \Cv\Service\AuthService $auth
    ) 
    {
        $this->transaction = $transaction;
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
        $user = $this->auth->getLoginedUser();

        $bankInfo = $this->transaction->decryptBankInfo($user);

        return view("app.transaction", [
                "user" => $user,
                "bankInfo" => $bankInfo,
            ]);
    }

    public function update(Request $request)
    {
        $me = $this->auth->getLoginedUser();

        $validator = $this->transaction->validateBankInfo($request->all());
        if($validator->fails()) {
            return redirect()
                ->back()
                ->withErrors($validator)
                ->withInput();
        }

        $this->transaction->encryptBankInfo($me ,$request->all());

        return redirect()->back()->with("success",true);
    }

}
