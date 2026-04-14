<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $users = User::where('id', '!=', $request->user()->id)
            ->withCount('followers')
            ->withCount('projects')
            ->latest()
            ->paginate(20);

        return response()->json($users);
    }

    public function follow(Request $request, User $user)
    {
        $authUser = $request->user();

        if ($authUser->id === $user->id) {
            return response()->json(['message' => 'No puedes seguirte a ti mismo'], 422);
        }

        $existing = \App\Models\Follow::where('follower_id', $authUser->id)
            ->where('following_id', $user->id)
            ->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['following' => false]);
        }

        \App\Models\Follow::create([
            'follower_id' => $authUser->id,
            'following_id' => $user->id,
        ]);

        return response()->json(['following' => true]);
    }
}
