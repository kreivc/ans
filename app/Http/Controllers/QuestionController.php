<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\QuestionImage;
use App\Models\QuestionTag;
use App\Models\Tag;
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

        if($request->question_images != null){
            foreach ($request->question_images as $image) {
                QuestionImage::create([
                    'question_id' => $newQuestion->id,
                    'image_url' => $image
                ]);
            }
        }

        if($request->question_tags != null){
            foreach ($request->question_tags as $question_tag) {
                // cari apakah si tag udah pernah ada
                $tag = Tag::where('tag_name','LIKE', $question_tag)->first();
                if($tag == null){
                    $tag = Tag::create([
                        'tag_name' => $question_tag
                    ]);
                }
                QuestionTag::create([
                    'question_id' => $newQuestion->id,
                    'tag_id' => $tag->id
                ]);
            }
        }

        return response()->json([
            'question' => $newQuestion,
            'images' => $request->question_images,
            'tags' => $request->question_tags
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
        $question = Question::find($id);
        $question->question_image;
        $qts = $question->question_tag;
        foreach ($qts as $qt) {
            $qt->tag;
        }
        return response()->json([
            'question' => $question
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
        $request->validate([
            'title' => 'required|string|min:5',
            'body' => 'required'
        ]);

        $question = Question::findOrFail($id);
        $question->update([
            'title' => $request->title,
            'body' => $request->body
        ]);

        //update images
        if ($request->question_images != null){
            foreach ($request->question_images as $image) {
                $image_obj = ((object)$image);
                $oldImage = QuestionImage::find($image_obj->id);
                $oldImage->image_url = $image_obj->image_url;
                $oldImage->save();
            }
        }

        //update tags
        if ($request->question_tags != null) {
            QuestionTag::where('question_id',$id)->delete();
            foreach ($request->question_tags as $question_tag) {
                // cari apakah si tag udah pernah ada
                $tag = Tag::where('tag_name', 'LIKE', $question_tag)->first();
                if ($tag == null) {
                    $tag = Tag::create([
                        'tag_name' => $question_tag
                    ]);
                }
                QuestionTag::create([
                    'question_id' => $id,
                    'tag_id' => $tag->id
                ]);
            }
        }

        $question->question_image;
        $qts = $question->question_tag;
        foreach ($qts as $qt) {
            $qt->tag;
        }

        return response()->json([
            'question' => $question,
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
