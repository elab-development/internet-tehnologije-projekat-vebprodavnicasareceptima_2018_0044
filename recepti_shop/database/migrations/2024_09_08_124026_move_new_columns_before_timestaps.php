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
        Schema::table('recepti', function (Blueprint $table) {
            $table->foreignId('kategorija_id')->after('vrsta_obroka')->change();
            $table->foreignId('kuhinja_id')->after('kategorija_id')->change();
        });
        
        Schema::table('sastojci', function (Blueprint $table) {
            $table->string('merna_jedinica')->after('naziv')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recepti', function (Blueprint $table) {
            $table->foreignId('kategorija_id')->after('updated_at')->change(); 
            $table->foreignId('kuhinja_id')->after('kategorija_id')->change();
        });
        
        Schema::table('sastojci', function (Blueprint $table) {
            $table->string('merna_jedinica')->after('updated_at')->change();
        });
    }
};
