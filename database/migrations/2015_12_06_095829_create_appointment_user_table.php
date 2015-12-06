<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppointmentUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointment_user', function (Blueprint $table) {
            $table->integer('appointment_id');
            $table->integer('user_id');
            $table->timestamp('reply_time')->nullable();
            $table->enum('answer', array('approved', 'denied'));   
            $table->timestamp('');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('appointment_user');
    }
}
