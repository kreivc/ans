<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function show($id)
    {
        $answer = Answer::with(['user'])->where('question_id', $id)->get();
        return response()->json([
            'answer' => $answer
        ]);
    }

    public function create(Request $request)
    {
        $request->validate([
            'question_id' => 'required',
            'body' => 'required'
        ]);

        $answer = Answer::create([
            'question_id' => $request->question_id,
            'user_id' => auth()->user()->id,
            'body' => $request->body,
        ]);

        return response()->json([
            'answer' => $answer,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'body' => 'required'
        ]);

        $answer = Answer::find($id);
        $answer->body = $request->body;
        $answer->save();

        return response()->json([
            'answer' => $answer,
        ]);
    }

    public function delete($id)
    {
        $answer = Answer::find($id);
        $answer->delete();

        return response()->json([
            'answer' => $answer,
        ]);
    }
}
