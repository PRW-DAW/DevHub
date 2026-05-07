<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectView extends Model
{
    public $timestamps = false;
    protected $fillable = ['user_id', 'project_id'];

    protected static function booted()
    {
        static::creating(function ($view) {
            $view->created_at = now();
        });
    }
}
