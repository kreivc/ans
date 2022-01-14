<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionTagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        DB::table('question_tags')->insert([
            ['question_id' => 1, 'tag_id' => 1,],
            ['question_id' => 2, 'tag_id' => 2,],
            ['question_id' => 3, 'tag_id' => 3,],
            ['question_id' => 4, 'tag_id' => 4,],
            ['question_id' => 5, 'tag_id' => 1,],
            ['question_id' => 1, 'tag_id' => 8,],
            ['question_id' => 5, 'tag_id' => 8,],
        ]);

    }
}
