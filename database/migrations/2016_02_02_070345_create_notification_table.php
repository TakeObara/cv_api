<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::create('notification', function($table) {
            $table->increments('id');
            $table->integer('type');
            $table->integer('user_id');
            $table->integer('target_user_id');
            $table->string('message');
            $table->tinyInteger('read')->default(0);
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
        Schema::drop('notification');
    }
}
