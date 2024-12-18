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
        Schema::create('recept_sastojak', function (Blueprint $table) {
            //$table->id(); //da li mi treba sopstveni id, ne treba slozen je al kako ??
            $table->foreignId('recept_id')->constrained('recepti')->onDelete('cascade');
            $table->foreignId('sastojak_id')->constrained('sastojci')->onDelete('cascade');
            $table->integer('kolicina')->nullable();
            $table->primary(['recept_id', 'sastojak_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recept_sastojak');
    }
};
