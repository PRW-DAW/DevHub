<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::with('user')->latest()->paginate(10);
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'content'   => 'required|string',
            'media_url' => 'nullable|url',
        ]);

        $post = $request->user()->posts()->create($data);
        return response()->json($post->load('user'), 201);
    }
}
