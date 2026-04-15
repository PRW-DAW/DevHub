<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\UserController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/posts',   [PostController::class, 'index']);
    Route::post('/posts',  [PostController::class, 'store']);
    Route::apiResource('/projects', ProjectController::class);
    Route::get('/me/projects', [ProjectController::class, 'myProjects']);
    Route::get('/users', [UserController::class, 'index']);
    Route::post('/follow/{user}', [UserController::class, 'follow']);
    Route::get('/me', [UserController::class, 'me']);
});
