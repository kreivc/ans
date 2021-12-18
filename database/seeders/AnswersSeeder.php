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
        $answers = [
            ['question_id' => 1, 'user_id' => 2, 'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'],
            ['question_id' => 2, 'user_id' => 3, 'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'],
            ['question_id' => 3, 'user_id' => 4, 'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'],
            ['question_id' => 4, 'user_id' => 5, 'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'],
            ['question_id' => 5, 'user_id' => 1, 'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'],
        ];

        DB::table('answers')->insert($answers);
    }
}
