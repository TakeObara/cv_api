<?php

namespace Cv\Http\Controllers;

use Illuminate\Http\Request;

use Cv\Http\Controllers\Controller;
use FastPay\FastPay;

class PaymentController extends Controller
{

    private $auth;

    public function __construct(
        \Cv\Service\AuthService $auth
    ) 
    {
        $this->auth = $auth;
    }

    public function yahooFastpayCallback(Request $request)
    {
        if(!$request->has('fastpayToken')) {
            return "error";
        }

        $fastpay = new FastPay(env("YAHOO_FASTPAY_SECRET_TOKEN"));
        $token = $request->get("fastpayToken");

        // 課金を作成
        $charge = $fastpay->charge->create(array(
            "amount" => 3000,
            "card" => $token,
            "description" => "fastpay@example.com",
            "capture" => "false",
        ));
        print_r($charge->getArray());
    }
}
