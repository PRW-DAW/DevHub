<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ProjectController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/posts',   [PostController::class, 'index']);
    Route::post('/posts',  [PostController::class, 'store']);
    Route::apiResource('/projects', ProjectController::class);
    Route::get('/me/projects', [ProjectController::class, 'myProjects']);
});
