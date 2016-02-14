<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterAppoinmentsAddColumnDeletedAndMet extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('appointments', function($table) {
            $table->boolean("paid")->default(false);
            $table->tinyInteger("met")->default(0);
            $table->timestamp("deleted_at")->nullable();
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
        Schema::table('appointments', function($table) {
            $table->dropColumn("paid");
            $table->dropColumn("met");
            $table->dropColumn("deleted_at");
        });
    }
}
