<?php

use Illuminate\Database\Seeder;

use Cv\Model\Profile;

class ProfileTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $profiles = [
            ['id'=>1,'user_id' => '1', 'name' => 'hoge', 'description' => ''],
        ];

        DB::table('profiles')->delete();
        foreach ($profiles as $profile) {
            Profile::create($profile);
        }
    }
}
