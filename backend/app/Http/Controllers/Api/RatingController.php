<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function rate(Request $request, Project $project)
    {
        $data = $request->validate([
            'stars' => 'required|integer|min:1|max:5',
        ]);

        Rating::updateOrCreate(
            ['user_id' => $request->user()->id, 'project_id' => $project->id],
            ['stars' => $data['stars']]
        );

        $avg = round($project->ratings()->avg('stars'), 1);
        $count = $project->ratings()->count();

        return response()->json([
            'rating_avg' => $avg,
            'rating_count' => $count,
        ]);
    }
}
