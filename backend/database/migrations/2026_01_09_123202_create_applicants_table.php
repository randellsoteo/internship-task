<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('applicants', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('school');
        $table->string('resume_path'); // Stores the filename/path
        $table->string('status')->default('Pending'); // For your "Update" feature
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applicants');
    }
};
