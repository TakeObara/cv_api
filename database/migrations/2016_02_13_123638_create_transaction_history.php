<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTransactionHistory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('transaction_history', function(Blueprint $table) {
            $table->increments('id');   
            $table->integer('user_id');
            $table->integer('appointment_id');   
            $table->string('invoice_number');
            $table->integer('amount');
            $table->integer('status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        Schema::drop('transaction_history');
    }
}
