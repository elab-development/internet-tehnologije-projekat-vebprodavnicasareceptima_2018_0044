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
        Schema::table('sastojci', function (Blueprint $table) {
            $table->string('merna_jedinica')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sastojci', function (Blueprint $table) {
            $table->dropColumn('merna_jedinica');
        });
    }
};
