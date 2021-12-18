<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
// use App\Models\User;
// use App\Models\Answer;
// use App\Models\Question;
// use App\Models\QuestionTag;
// use App\Models\Tag;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $this->call(UsersSeeder::class);
        $this->call(QuestionsSeeder::class);
        $this->call(AnswersSeeder::class);
        $this->call(TagsSeeder::class);
        $this->call(QuestionTagsSeeder::class);
    }
}
