<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Applicant;
use Illuminate\Support\Facades\Storage;

class ApplicantController extends Controller
{
    // READ + SEARCH
    public function index(Request $request)
    {
        $query = Applicant::latest();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('school', 'like', "%{$search}%");
        }

        return response()->json($query->get());
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