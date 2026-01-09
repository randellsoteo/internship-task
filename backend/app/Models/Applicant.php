<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;

    // ADD THIS LINE TO FIX THE ERROR:
    protected $fillable = ['name', 'school', 'resume_path', 'status'];
}