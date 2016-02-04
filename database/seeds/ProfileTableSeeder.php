<?php

use Illuminate\Database\Seeder;

use Cv\Model\Profile;

class ProfileTableSeeder extends Seeder
{
    public function __construct(
        \Cv\Service\ProfileService $profile
    )
    {
        $this->profile = $profile;
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $profileDatas = [
            ['userId' => 1, 'description' => 'fdsafafasfasfdfasdfasfa', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア'],
            ['userId' => 2, 'description' => 'fdsafafasfasfdfdasfdasa', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア'],
            ['userId' => 3, 'description' => 'fdsafafasfasffdsafdsada', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア'],
            ['userId' => 4, 'description' => 'fdsafsdafasfasdfasdffaa', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア'],
            ['userId' => 5, 'description' => 'fdasfasdfasdfasfdafasdf', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア'],
        ];

        foreach ($profileDatas as $data){
            $this->updateProfile($data['userId'], $data);
        }
    }

    private function updateProfile($userId, $data){
        $profile = Profile::where('user_id', "=", $userId)->first();
        $profile->description        = $data['description'];
        $profile->resource_introduce = $data['resource_introduce'];
        $profile->resource_needed    = $data['resource_needed'];
        $profile->save();
    }
}
