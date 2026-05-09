<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Models\ProjectView;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $query = Project::with(['user', 'ratings' => fn($q) => $q->where('user_id', $userId)])
            ->withCount(['views', 'comments'])
            ->withAvg('ratings', 'stars')
            ->withCount('ratings')
            ->latest();

        if ($request->has('search') && $request->search !== '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'ilike', "%{$search}%")
                  ->orWhere('description', 'ilike', "%{$search}%")
                  ->orWhereHas('user', function ($q) use ($search) {
                      $q->where('username', 'ilike', "%{$search}%");
                  })
                  ->orWhere('tags', 'ilike', "%{$search}%");
            });
        }

        $projects = $query->paginate(10);

        $projects->getCollection()->transform(function ($project) {
            $project->user_rating = $project->ratings->first()?->stars ?? null;
            unset($project->ratings);
            return $project;
        });

        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:100',
            'description'  => 'required|string|max:1000',
            'tags'         => 'nullable|array|max:10',
            'tags.*'       => 'string|max:10',
            'project_link' => 'required|url|max:255',
            'github_link'  => 'nullable|url|max:255',
        ]);

        $project = $request->user()->projects()->create($data);

        return response()->json($project->load('user'), 201);
    }

    public function show(Request $request, Project $project)
    {
        ProjectView::firstOrCreate([
            'user_id'    => $request->user()->id,
            'project_id' => $project->id,
        ]);

        $project->load(['user', 'ratings' => fn($q) => $q->where('user_id', $request->user()->id)])
            ->loadCount(['views', 'comments', 'ratings'])
            ->loadAvg('ratings', 'stars');

        $project->user_rating = $project->ratings->first()?->stars ?? null;
        unset($project->ratings);

        return response()->json($project);
    }

    public function update(Request $request, Project $project)
    {
        if ($request->user()->id !== $project->user_id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $data = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'description'  => 'sometimes|string',
            'tags'         => 'nullable|array',
            'project_link' => 'sometimes|url',
            'github_link'  => 'nullable|url',
            'status'       => 'sometimes|in:active,completed,paused',
        ]);

        $project->update($data);

        return response()->json($project->load('user'));
    }

    public function destroy(Request $request, Project $project)
    {
        if ($request->user()->id !== $project->user_id) {
            return response()->json(['message' => 'No autorizado'], 403);
        }

        $project->delete();

        return response()->json(['message' => 'Proyecto eliminado']);
    }

    public function myProjects(Request $request)
    {
        $userId = $request->user()->id;

        $projects = $request->user()
            ->projects()
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

    public function topTechnologies()
    {
        $projects = Project::whereNotNull('tags')->get(['tags']);

        $tagCounts = [];
        foreach ($projects as $project) {
            foreach ($project->tags as $tag) {
                $tag = trim($tag);
                if ($tag) {
                    $tagCounts[$tag] = ($tagCounts[$tag] ?? 0) + 1;
                }
            }
        }

        $total = array_sum($tagCounts);

        if ($total === 0) {
            return response()->json([]);
        }

        arsort($tagCounts);
        $top5 = array_slice($tagCounts, 0, 5, true);

        $result = array_map(fn($tag, $count) => [
            'name'       => $tag,
            'count'      => $count,
            'percentage' => round(($count / $total) * 100, 1),
        ], array_keys($top5), array_values($top5));

        return response()->json(array_values($result));
    }
}
