<?php

namespace App\Http\Controllers;

use App\Models\Question;

class TagController extends Controller
{
    function findByTag($id){
        $questions = Question::with('question_tags')->where('tag_id', $id)->get();
        return response()->json($questions);
    }
}
