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
            $table->foreignId('kategorija_id')->constrained('kategorije')->onDelete('cascade');
            $table->foreignId('kuhinja_id')->constrained('kuhinje')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('recepti', function (Blueprint $table) {
            $table->dropForeign(['kategorija_id']);
            $table->dropColumn('kategorija_id');

            $table->dropForeign(['kuhinja_id']);
            $table->dropColumn('kuhinja_id');
        });
    }
};
