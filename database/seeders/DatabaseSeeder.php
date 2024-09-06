<?php

namespace Database\Seeders;

use App\Models\Kategorija;
use App\Models\Kuhinja;
use App\Models\Recept;
use App\Models\ReceptSastojak;
use App\Models\Sastojak;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::truncate();
         DB::statement('SET FOREIGN_KEY_CHECKS=0;');
         ReceptSastojak::truncate();
         Recept::truncate();
         Kategorija::truncate();
         Kuhinja::truncate();
         Sastojak::truncate();
         DB::statement('SET FOREIGN_KEY_CHECKS=1;');

         User::factory(10)->create();

         Kategorija::factory(5)->create();
         Kategorija::factory(5)->create();
         Kategorija::factory(5)->create();
         Kuhinja::factory(5)->create();
         Sastojak::factory(20)->create();
         Recept::factory(3)->create();
         ReceptSastojak::factory()->count(10)->create();
    }
}
