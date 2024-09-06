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
        Schema::create('recepti', function (Blueprint $table) {
            $table->id();
            $table -> string('naziv');
            $table -> text('opis');
            $table -> integer('vreme_pripreme');
            $table -> integer('broj_porcija');
            $table -> text('nacin_pripreme');
            $table->enum('vrsta_obroka', ['dorucak', 'brunc','rucak', 'vecera', 'uzina', 'desert']);
            $table->foreignId('kategorija_id')->constrained('kategorije');
            $table->foreignId('kuhinja_id')->constrained('kuhinje');
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('recepti');
    }
};
