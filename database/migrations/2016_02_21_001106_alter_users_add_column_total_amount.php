<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterUsersAddColumnTotalAmount extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('users', function(Blueprint $table) {
            $table->integer('amount')->default(0)->after('password');
            $table->string('bank_name')->nullable();
            $table->string('bank_account_no')->nullable();
            $table->string('bank_account_type')->nullable();
            $table->string('bank_branch_code')->nullable();
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
        Schema::table('users', function(Blueprint $table) {
            $table->dropColumn('amount');
            $table->dropColumn('bank_name');
            $table->dropColumn('bank_account_no');
            $table->dropColumn('bank_account_type');
            $table->dropColumn('bank_branch_code');
        });
    }
}
