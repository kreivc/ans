<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $questions = [
            [
                'user_id' => 1, 
                'title' => 'Mencari Luas Segitiga', 
                'image_url' => 'https://nilaimutlak.id/wp-content/uploads/2019/07/contoh-soal-segitiga-sama-siku-siku.jpg', 
                'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'
            ],
            [
                'user_id' => 2, 
                'title' => 'Menyelesaikan Redoks', 
                'image_url' => 'https://materikimia.com/wp-content/uploads/2021/01/Reaksi-Redoks-CuO-H2.jpg', 
                'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'
            ],
            [
                'user_id' => 3, 
                'title' => 'Apa Fungsi Mitokondria', 
                'image_url' => 'http://1.bp.blogspot.com/-vy4BBdve8L0/VAAitTmNwhI/AAAAAAAAF00/ct75aIaKIeU/s1600/mitokhondria%2B1a.png', 
                'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'
            ],
            [
                'user_id' => 4, 
                'title' => 'Mencari Tekanan Hidrostatis', 
                'image_url' => 'https://rumusrumus.com/wp-content/uploads/2018/12/contoh-soal-tekanan-hidrostatis.jpg.webp', 
                'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'
            ],
            [
                'user_id' => 5, 
                'title' => 'Mencari Nilai Limit', 
                'image_url' => 'https://asset.kompas.com/crops/wQQLCSfrdQPAJZ4QdBuHPDg6pDo=/431x237:905x553/750x500/data/photo/2020/12/22/5fe0e29d6d98b.png', 
                'body' => 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto magnam consequatur suscipit nisi eum. Rem deserunt aut et? Eaque, minima aliquam eius deserunt officia amet consequuntur commodi id soluta cupiditate.'
            ],
        ];

        DB::table('questions')->insert($questions);
    }
}
