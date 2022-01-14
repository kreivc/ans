<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            ['name' => 'Ricky', 'email' => 'ricky@gmail.com', 'password' => bcrypt('pass123'), 'email_verified_at' => null, 'photo_profile' => 'https://avatars.dicebear.com/api/initials/:R.svg', 'remember_token' => null],
            ['name' => 'Michael', 'email' => 'michael@gmail.com', 'password' => bcrypt('pass123'), 'email_verified_at' => null, 'photo_profile' => 'https://avatars.dicebear.com/api/initials/:M.svg', 'remember_token' => null],
            ['name' => 'Brian', 'email' => 'brian@gmail.com', 'password' => bcrypt('pass123'), 'email_verified_at' => null, 'photo_profile' => 'https://avatars.dicebear.com/api/initials/:B.svg', 'remember_token' => null],
            ['name' => 'Kevin', 'email' => 'kevin@gmail.com', 'password' => bcrypt('pass123'), 'email_verified_at' => null, 'photo_profile' => 'https://avatars.dicebear.com/api/initials/:K.svg', 'remember_token' => null],
            ['name' => 'Andreas', 'email' => 'andreas@gmail.com', 'password' => bcrypt('pass123'), 'email_verified_at' => null, 'photo_profile' => 'https://avatars.dicebear.com/api/initials/:A.svg', 'remember_token' => null]
        ]);
    }
}
