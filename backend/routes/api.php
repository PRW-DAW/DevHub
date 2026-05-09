<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\RatingController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/posts',   [PostController::class, 'index']);
    Route::post('/posts',  [PostController::class, 'store']);
    Route::get('/projects/top-technologies', [ProjectController::class, 'topTechnologies']);
    Route::apiResource('/projects', ProjectController::class);
    Route::get('/me/projects', [ProjectController::class, 'myProjects']);
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/follow/{user}', [UserController::class, 'follow']);
    Route::get('/me', [UserController::class, 'me']);
    Route::get('/users/top', [UserController::class, 'topByFollowers']);
    Route::get('/users/{user}', [UserController::class, 'show']);
    Route::get('/users/{user}/projects', [UserController::class, 'showProjects']);
    Route::get('/projects/{project}/comments', [CommentController::class, 'index']);
    Route::post('/projects/{project}/comments', [CommentController::class, 'store']);
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy']);
    Route::put('/me', [UserController::class, 'update']);
    Route::post('/projects/{project}/rate', [RatingController::class, 'rate']);
});
