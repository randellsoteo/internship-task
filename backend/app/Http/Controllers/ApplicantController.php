<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use Illuminate\Support\Facades\Storage;

class ApplicantController extends Controller
{
    // READ + SEARCH + SORT + PAGINATE
    public function index(Request $request)
    {
        $query = Applicant::query();

        // 1. Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('school', 'like', "%{$search}%");
            });
        }

        // 2. Sorting (Default: Latest first)
        $sortField = $request->input('sort_by', 'created_at'); // name, school, status, created_at
        $sortOrder = $request->input('sort_order', 'desc');    // asc or desc
        
        $query->orderBy($sortField, $sortOrder);

        // 3. Pagination (5 items per page)
        // This changes the JSON format! It wraps data in a 'data' array.
        return response()->json($query->paginate(5));
    }

    // CREATE
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'school' => 'required',
            'resume' => 'required|file|mimes:pdf,doc,docx|max:2048',
        ]);

        $path = $request->file('resume')->store('resumes', 'public');

        $applicant = Applicant::create([
            'name' => $request->name,
            'school' => $request->school,
            'resume_path' => $path,
            'status' => 'Pending', // Default status
        ]);

        return response()->json($applicant, 201);
    }

    // UPDATE (Status)
    public function update(Request $request, $id)
    {
        $applicant = Applicant::find($id);
        
        if ($applicant) {
            $applicant->update($request->all());
            return response()->json($applicant);
        }
        
        return response()->json(['message' => 'Not found'], 404);
    }

    // DELETE
    public function destroy($id)
    {
        $applicant = Applicant::find($id);

        if ($applicant) {
            // Optional: Delete the file from storage too
            // Storage::disk('public')->delete($applicant->resume_path);
            
            $applicant->delete();
            return response()->json(['message' => 'Deleted successfully']);
        }

        return response()->json(['message' => 'Not found'], 404);
    }
}