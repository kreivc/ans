<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuestionImage;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Question::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|min:5',
            'body' => 'required'
        ]);

        $newQuestion = Question::create([
            'user_id' => auth()->user()->id,
            'title' => $request->title,
            'body' => $request->body
        ]);

        if($request->question_images != null)
            foreach ($request->question_images as $image) {
                QuestionImage::create([
                    'question_id' => $newQuestion->id,
                    'image_url' => $image
                ]);
            }

        return response()->json([
            'question' => $newQuestion,
            'images' => $request->question_images
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $question = Question::findOrFail($id);

        $images = QuestionImage::where('question_id',$id)->get();

        return response()->json([
            'question' => $question,
            'images' => $images
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // return $request;
        $request->validate([
            'title' => 'required|string|min:5',
            'body' => 'required'
        ]);

        $question = Question::findOrFail($id);
        $question->update([
            'title' => $request->title,
            'body' => $request->body
        ]);

        if ($request->question_images != null)
            foreach ($request->question_images as $image) {
                $image_obj = ((object)$image);
                // return $image_id;
                $oldImage = QuestionImage::find($image_obj->id);
                $oldImage->image_url = $image_obj->image_url;
                $oldImage->save();
            }


        return response()->json([
            'question' => $question,
            'images' => QuestionImage::where('question_id',$id)->get()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Question::destroy($id);
        return response([
            'message' => 'delete question succesfully'
        ]);
    }
}
