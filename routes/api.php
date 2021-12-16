<?php

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//public
Route::post('/register', [UserController::class, 'register']);
Route::post('/login', [UserController::class, 'login']);

Route::get('/questions', [QuestionController::class, 'index']);
Route::get('/question/{id}', [QuestionController::class, 'show']);

//Authenticated
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::post('/question/create', [QuestionController::class, 'store']);
    Route::put('/question/update/{id}', [QuestionController::class, 'update']);
    Route::delete('/question/delete/{id}', [QuestionController::class, 'destroy']);
});
