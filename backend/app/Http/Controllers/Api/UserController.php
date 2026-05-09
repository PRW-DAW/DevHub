<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $authUser = $request->user();
        $followingIds = $authUser->following()->pluck('following_id')->toArray();

        $query = User::withCount('followers')
            ->withCount('projects')
            ->latest();

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'ilike', "%{$search}%")
                  ->orWhere('username', 'ilike', "%{$search}%")
                  ->orWhere('bio', 'ilike', "%{$search}%");
            });
        }

        $users = $query->paginate(12);

        $users->getCollection()->transform(function ($user) use ($followingIds) {
            $user->is_following = in_array($user->id, $followingIds);
            return $user;
        });

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

    public function me(Request $request)
    {
        $user = $request->user()->loadCount(['followers', 'following', 'projects']);
        return response()->json($user);
    }

    public function show(Request $request, User $user)
    {
        $authUser = $request->user();
        $user->loadCount(['followers', 'following', 'projects']);
        $user->is_following = $authUser->following()
            ->where('following_id', $user->id)
            ->exists();

        return response()->json($user);
    }

    public function showProjects(Request $request, User $user)
    {
        $userId = $request->user()->id;

        $projects = $user->projects()
            ->with(['ratings' => fn($q) => $q->where('user_id', $userId)])
            ->withCount(['views', 'comments', 'ratings'])
            ->withAvg('ratings', 'stars')
            ->latest()
            ->paginate(10);

        $projects->getCollection()->transform(function ($project) {
            $project->user_rating = $project->ratings->first()?->stars ?? null;
            unset($project->ratings);
            return $project;
        });

        return response()->json($projects);
    }

    public function topByFollowers()
    {
        $users = User::withCount('followers')
            ->orderByDesc('followers_count')
            ->limit(5)
            ->get();

        return response()->json($users);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'bio'      => 'nullable|string|max:500',
            'name'     => 'sometimes|string|max:255',
            'username' => 'sometimes|string|unique:users,username,' . $request->user()->id,
        ]);

        $user = $request->user();
        $user->update($data);

        return response()->json($user);
    }
}
