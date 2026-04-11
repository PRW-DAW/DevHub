<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('user')
            ->latest()
            ->paginate(10);

        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'        => 'required|string|max:255',
            'description'  => 'required|string',
            'tags'         => 'nullable|array',
            'project_link' => 'required|url',
            'github_link'  => 'nullable|url',
        ]);

        $project = $request->user()->projects()->create($data);

        return response()->json($project->load('user'), 201);
    }

    public function show(Project $project)
    {
        return response()->json($project->load('user'));
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
        $projects = $request->user()
            ->projects()
            ->latest()
            ->paginate(10);
    
        return response()->json($projects);
    }
}
