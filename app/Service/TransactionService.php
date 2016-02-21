<?php

namespace Cv\Service;

use FastPay\FastPay;

use Cv\Model\AppointmentUser;
use Cv\Model\Appointment;
use Cv\Model\Transaction;
use Cv\Model\User;

use Crypt;

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

    public function makeAppointmentReceiveTransaction($amount, $appointment)
    {

        $appointment->load('appointmentUsers');
        $appointmentUsers = $appointment->appointmentUsers;
        
        $opponenet = null;
        $host = null;
        foreach ($appointmentUsers as $user) {
            if($user->user_id === $appointment->host_user_id) {
                $host = $user;
            }else {
                $opponenet = $user;
            }
        }

        if(is_null($opponenet) || is_null($host)) {
            throw new Cv\Exceptions\MistakeBusinessLogicException;
        }

        $this->addUserMoney($opponenet->user_id, $amount);

        $invoiceNumber = $this->generateUniqueInvoiceNumber();

        $ts = new Transaction;
        $ts->user_id = $opponenet->user_id;
        $ts->appointment_id = $appointment->id;
        $ts->invoice_number = $invoiceNumber;
        $ts->amount = $amount;
        $ts->status = Transaction::PAYMENT_TRANSFER;
        $ts->save();
        
    }

    public function addUserMoney($userId, $amount)
    {
        $user = User::find($userId);
        $user->amount += $amount;
        $user->save();
    }

    public function generateUniqueInvoiceNumber() 
    {
        return substr(md5(time()), 0, 6);
    }

    public function decryptBankInfo(User $user) 
    {
        return [
            "bank_name" => is_null($user->bank_name)  ?  '' : Crypt::decrypt($user->bank_name),
            "bank_account_no" => is_null($user->bank_account_no)  ?  '' : Crypt::decrypt($user->bank_account_no),
            "bank_account_type" => is_null($user->bank_account_type)  ?  '普通' : $user->bank_account_type,
            "bank_branch_code" => is_null($user->bank_branch_code)  ?  '' : Crypt::decrypt($user->bank_branch_code),
        ];        
    }

    public function encryptBankInfo(User $user, $input) 
    {
        $user->bank_name = Crypt::encrypt($input["bank_name"]);
        $user->bank_account_no = Crypt::encrypt($input["bank_account_no"]);
        $user->bank_account_type = $input["bank_account_type"];
        $user->bank_branch_code = Crypt::encrypt($input["bank_branch_code"]);
        $user->save();
    }

    public function validateBankInfo($input)
    {
        return \Validator::make($input, [
            'bank_name'         => 'required',
            'bank_account_no'   => 'required',
            'bank_account_type' => 'required',
            'bank_branch_code'  => 'required',
        ]);

    }

}