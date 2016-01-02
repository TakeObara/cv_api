<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameFavoriteTableName extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('ALTER TABLE favorites CHANGE favorite_user_id favourite_user_id INT(11) NOT NULL');
        
        Schema::rename("favorites", "favourites");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
        DB::statement('ALTER TABLE favourites CHANGE favourite_user_id favorite_user_id INT(11) NOT NULL');

        Schema::rename("favourites", "favorites");
    }
}
