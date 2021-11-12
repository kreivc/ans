<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'body',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function question_image()
    {
        return $this->hasMany(QuestionImage::class);
    }

    public function answer()
    {
        return $this->hasMany(Answer::class);
    }

    public function question_tag()
    {
        return $this->hasMany(QuestionTag::class);
    }
}
