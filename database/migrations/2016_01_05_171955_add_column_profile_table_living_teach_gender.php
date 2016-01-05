<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddColumnProfileTableLivingTeachGender extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('profiles', function($table) {
            $table->string('place')->nullable();
            $table->string('resource_introduce')->default('');
            $table->string('resource_needed')->default('');
            $table->tinyInteger('gender')->default(0);
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
        Schema::table('profiles', function($table) {
            $table->dropColumn('place');
            $table->dropColumn('resource_introduce');
            $table->dropColumn('resource_needed');
            $table->dropColumn('gender');
        });
    }
}
