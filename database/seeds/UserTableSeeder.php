<?php

use Illuminate\Database\Seeder;

use Cv\Model\User;
use Cv\Model\Profile;

class UserTableSeeder extends Seeder
{
    public function __construct(
        \Cv\Service\AuthService $auth,
        \Cv\Service\ProfileService $profile
    )
    {
        $this->auth = $auth;
        $this->profile = $profile;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            ['name' => 'test1', 'email' => 'test1@gmail.com', 'password' => '1234', 'gender' => '1'],
            ['name' => 'test2', 'email' => 'test2@gmail.com', 'password' => '1234', 'gender' => '1'],
            ['name' => 'test3', 'email' => 'test3@gmail.com', 'password' => '1234', 'gender' => '1'],
            ['name' => 'test4', 'email' => 'test4@gmail.com', 'password' => '1234', 'gender' => '1'],
            ['name' => 'test5', 'email' => 'test5@gmail.com', 'password' => '1234', 'gender' => '1'],
        ];

        DB::table('users')->delete();
        DB::table('profiles')->delete();
           
        foreach ($users as $index => $user){
            $user = $this->auth->registerUser($user['name'], $user['email'], $user['password'], $user['gender'], null, null, '');

            $profile = $this->profile->getProfileByUserId($user->id);
            $this->changeId($user, $profile,$index + 1);
        }
    }

    private function changeId(&$user, &$profile, $newId){
        $profile->user_id = $newId;
        $profile->save();

        $user->id = $newId;
        $user->save();
    }
}
