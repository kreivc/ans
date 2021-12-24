<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Tag;

class TagController extends Controller
{
    function findByTag($id){
        $questions = Tag::with(['question_tag'=>function($query){
            return $query->with('question');
        }])->where('id','=', $id)->get();
        return response()->json($questions);
    }
}
