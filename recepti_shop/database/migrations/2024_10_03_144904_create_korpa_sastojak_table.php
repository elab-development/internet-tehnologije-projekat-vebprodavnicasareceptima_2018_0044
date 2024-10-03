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
        Schema::create('korpa_sastojak', function (Blueprint $table) {
            $table->id();
            $table->foreignId('korpa_id')->constrained('korpe')->onDelete('cascade');
            $table->foreignId('sastojak_id')->constrained('sastojci')->onDelete('cascade');
            $table->integer('kolicina');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('korpa_sastojak');
    }
};
