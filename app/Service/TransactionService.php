<?php

namespace Cv\Service;

use FastPay\FastPay;

use Cv\Model\AppointmentUser;
use Cv\Model\Appointment;
use Cv\Model\Transaction;

class TransactionService {

    public function __construct(\Cv\Service\AuthService $auth, \Cv\Service\AppointmentService $appointment)
    {
        $this->auth = $auth;
        $this->appointment = $appointment;
    }

    public function makeAppointmentPaymentTransaction( $amount , $token, $appointment)
    {
        $user = $this->auth->getLoginedUser();

        $invoiceNumber = $this->generateUniqueInvoiceNumber();

        $fastpay = new FastPay(env("YAHOO_FASTPAY_SECRET_TOKEN"));

        // 課金を作成
        $charge = $fastpay->charge->create([
            "amount" => $amount,
            "card" => $token,
            "description" => "No: ".$invoiceNumber,
            "capture" => "false",
        ]);

        $ts = new Transaction;
        $ts->user_id = $user->id;
        $ts->appointment_id = $appointment->id;
        $ts->invoice_number = $invoiceNumber;
        $ts->amount = $amount;
        $ts->status = Transaction::PAYMENT_SUCCESS;
        $ts->save();


        $this->appointment->answer($appointment->id, $user->id, AppointmentUser::ANSWER_YES_GOING);
        $appointment->paid = true;
        $appointment->save();
    }

    public function generateUniqueInvoiceNumber() 
    {
        return substr(md5(time()), 0, 6);
    }

}