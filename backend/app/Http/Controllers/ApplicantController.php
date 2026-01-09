<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ApplicantController extends Controller
{
    public function index()
{
    // READ: Get all applicants, latest first
    return response()->json(\App\Models\Applicant::latest()->get());
}

public function store(Request $request)
{
    // Validation
    $request->validate([
        'name' => 'required',
        'school' => 'required',
        'resume' => 'required|file|mimes:pdf,doc,docx|max:2048', // Max 2MB
    ]);

    // Handle File Upload
    $path = null;
    if ($request->hasFile('resume')) {
        // Save to 'public/resumes' folder
        $path = $request->file('resume')->store('resumes', 'public');
    }

    // CREATE: Save to Database
    $applicant = \App\Models\Applicant::create([
        'name' => $request->name,
        'school' => $request->school,
        'resume_path' => $path,
    ]);

    return response()->json($applicant, 201);
}
}
