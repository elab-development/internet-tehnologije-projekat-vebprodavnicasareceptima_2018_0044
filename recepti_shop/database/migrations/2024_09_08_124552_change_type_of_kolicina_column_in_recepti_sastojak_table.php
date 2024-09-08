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
        Schema::table('recept_sastojak', function (Blueprint $table) {

                $table->decimal('kolicina',8,3)->nullable()->change();            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recept_sastojak', function (Blueprint $table) {
            $table->integer('kolicina')->nullable()->change();
        });
    }
};
