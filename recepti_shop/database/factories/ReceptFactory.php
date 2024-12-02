<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Recept>
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
            'naziv' => $this->faker->sentence(3), 
            'opis' => $this->faker->paragraph,
            'vreme_pripreme' => $this->faker->numberBetween(10, 120), 
            'broj_porcija' => $this->faker->numberBetween(1, 10), 
            'nacin_pripreme' => $this->faker->paragraph, 
            'vrsta_obroka' => $this->faker->randomElement(['dorucak', 'brunc', 'rucak', 'vecera', 'uzina', 'desert']), 
            'kategorija_id' => \App\Models\Kategorija::inRandomOrder()->first()->id, 
            'kuhinja_id' => \App\Models\Kuhinja::inRandomOrder()->first()->id
        ];
    }
}
