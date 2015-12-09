<?php

use Illuminate\Database\Seeder;
use Cv\Model\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $users = [
            ['id'=>1,'name' => 'hoge', 'email' => 'ee@ee.cc', 'password' => bcrypt('1234')],
        ];

        DB::table('users')->delete();
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
