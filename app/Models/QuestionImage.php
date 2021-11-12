<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_id',
        'image_url',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
