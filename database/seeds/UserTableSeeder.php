<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    public function __construct(
        \Cv\Service\AuthService $auth
    )
    {
        $this->auth = $auth;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $users = [
            ['name' => 'test1', 'email' => 'test1@gmail.com', 'password' => '1234', 'gender' => '1', 'is_public' => true],
            ['name' => 'test2', 'email' => 'test2@gmail.com', 'password' => '1234', 'gender' => '1', 'is_public' => true],
            ['name' => 'test3', 'email' => 'test3@gmail.com', 'password' => '1234', 'gender' => '1', 'is_public' => true],
            ['name' => 'test4', 'email' => 'test4@gmail.com', 'password' => '1234', 'gender' => '1', 'is_public' => true],
            ['name' => 'test5', 'email' => 'test5@gmail.com', 'password' => '1234', 'gender' => '1', 'is_public' => true],
        ];

        foreach ($users as $user){
            $this->auth->registerUser($user['name'], $user['email'], $user['password'], $user['gender'], null, null, '', $user['is_public']);
        }
    }
}
