<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableChatroomAddUnreadCountColumn extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        //
        Schema::table('chatroom_user', function($table) {
            $table->increments("id")->first();
            $table->integer("unread_count")->default(0)->after('chatroom_id');
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
        Schema::table('chatroom_user', function($table) {
            $table->dropColumn("unread_count");
        });
    }
}
