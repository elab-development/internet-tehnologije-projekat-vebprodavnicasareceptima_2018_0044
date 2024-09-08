<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Kategorija as AppKategorija;
use Illuminate\Database\Seeder;
use App\Models\Kategorija;
use App\Models\Kuhinja;
use App\Models\Recept;
use App\Models\Sastojak;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        User::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('recept_sastojak')->truncate();
        Recept::truncate();
        Kategorija::truncate();
        Kuhinja::truncate();
        Sastojak::truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        User::factory(10)->create();

        Kategorija::factory(7)->create();
        Kuhinja::factory(10)->create();
        $sastojci=Sastojak::factory(30)->create();
        $recepti=Recept::factory(10)->create();
        
        $recepti->each(function ($recept) use ($sastojci) {
            
            $recept->sastojci()->attach(
                $sastojci->random(rand(2, 5))->pluck('id')->toArray(),
                ['kolicina' => rand(1, 10)]
            );
        });
    }
}
