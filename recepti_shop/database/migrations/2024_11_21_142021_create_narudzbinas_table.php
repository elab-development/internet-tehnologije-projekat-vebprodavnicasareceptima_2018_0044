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
        Schema::create('narudzbine', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('ime');
            $table->string('prezime');
            $table->string('email');
            $table->string('grad');
            $table->string('postanski_broj');
            $table->string('adresa');
            $table->string('telefon');
            $table->decimal('ukupan_iznos', 10, 2);
            $table->enum('status', ['na_cekanju', 'isporuceno', 'odbijeno'])->default('na_cekanju');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('narudzbine');
    }
};
