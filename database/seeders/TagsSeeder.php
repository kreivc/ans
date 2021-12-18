<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TagsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            ['tag_name' => 'Matematika'],
            ['tag_name' => 'Kimia',],
            ['tag_name' => 'Biologi',],
            ['tag_name' => 'Fisika',],
        ];

        DB::table('tags')->insert($tags);
    }
}
