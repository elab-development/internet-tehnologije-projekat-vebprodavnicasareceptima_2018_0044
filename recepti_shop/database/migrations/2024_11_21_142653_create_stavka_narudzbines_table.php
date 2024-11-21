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
        Schema::create('stavke_narudzbine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('narudzbina_id')->constrained()->onDelete('cascade');
            $table->foreignId('sastojak_id')->constrained()->onDelete('cascade');
            $table->integer('kolicina');
            $table->integer('cena');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stavke_narudzbine');
    }
};
