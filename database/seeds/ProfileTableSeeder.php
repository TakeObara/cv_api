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
            ['userId' => 1, 'name' => 'Tanaka', 'place' => '', 'description' => 'fdsafafasfasfdfasdfasfa', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア', 'gender' => Profile::GENDER_MALE , 'is_public' => true],
            ['userId' => 2, 'name' => 'Obara', 'place' => '', 'description' => 'fdsafafasfasfdfdasfdasa', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア', 'gender' => Profile::GENDER_MALE , 'is_public' => true],
            ['userId' => 3, 'name' => 'Funakoshi', 'place' => '', 'description' => 'fdsafafasfasffdsafdsada', 'resource_introduce' => 'デザイナー', 'resource_needed' => 'webエンジニア', 'gender' => Profile::GENDER_MALE , 'is_public' => true],
            ['userId' => 4, 'name' => 'Likwee', 'place' => '', 'description' => 'fdsafsdafasfasdfasdffaa', 'resource_introduce' => 'デザイナー', 'resource_needed' => '', 'gender' => Profile::GENDER_MALE , 'is_public' => true],
            ['userId' => 5, 'name' => 'Go Sho', 'place' => '', 'description' => 'fdasfasdfasdfasfdafasdf', 'resource_introduce' => '', 'resource_needed' => 'webエンジニア', 'gender' => Profile::GENDER_MALE , 'is_public' => true],
        ];

        foreach ($profileDatas as $data){
            $this->profile->save($data['userId'], $data);
        }
    }
}
