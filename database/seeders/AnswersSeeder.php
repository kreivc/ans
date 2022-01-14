<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnswersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('answers')->insert([
            ['question_id' => 1, 'user_id' => 2, 'body' => 'Luas Segitiga Siku - Siku = 1/2 * Alas *  Tinggi = 1/2 * 12 * 5 = 30 cm','created_at' => '2021-12-22 00:00:00',],
            ['question_id' => 2, 'user_id' => 3, 'body' => '1. C, 2. B, 3. E','created_at' => '2021-12-22 00:00:00',],
            ['question_id' => 3, 'user_id' => 4, 'body' => 'Saya menemunkan contoh soal yang serupa mungkin blog ini dapat membantu https://blog.artikelkeren.com/biologi/soal-dan-pembahasan-mitokondria.html','created_at' => '2021-12-22 00:00:00',],
            ['question_id' => 4, 'user_id' => 5, 'body' => '1. P = ρ x g x h = 1025 x 10 x 100 = 1.025.000 Pa = 1,025 x 10^6 Pa , 2. P = ρ x g x h = 1.000 x 9,8 x 3 = 29.000 Pa  ','created_at' => '2021-12-22 00:00:00',],
            ['question_id' => 5, 'user_id' => 1, 'body' => '(D) 1','created_at' => '2021-12-22 00:00:00',],
        ]);

    }
}
