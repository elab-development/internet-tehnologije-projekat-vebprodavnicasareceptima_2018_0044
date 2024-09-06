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

            $table->dropColumn('merna_jedinica');

            $table->double('kolicina')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recept_sastojak', function (Blueprint $table) {
            
            $table->string('merna_jedinica')->nullable();

            $table->integer('kolicina')->change();
        });
    }
};
