<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recept>
 */
class ReceptFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->sentence(3), // Naslov sa 3 reči
            'opis' => $this->faker->paragraph, // Kratki opis recepta
            'vreme_pripreme' => $this->faker->numberBetween(10, 120), // Vreme pripreme u minutima
            'broj_porcija' => $this->faker->numberBetween(1, 10), // Broj porcija
            'nacin_pripreme' => $this->faker->paragraph, // Opis načina pripreme
            'vrsta_obroka' => $this->faker->randomElement(['dorucak', 'brunc', 'rucak', 'vecera', 'uzina', 'desert']), // Vrsta obroka
            'kategorija_id' => \App\Models\Kategorija::inRandomOrder()->first()->id, // Nasumična kategorija
            'kuhinja_id' => \App\Models\Kuhinja::inRandomOrder()->first()->id
        ];
    }
}
