<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Kategorija>
 */
class KategorijaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv'=> $this->faker->randomElement(['Predjela', 'Glavna jela', 'Deserti', 'Salate', 'Supe i čorbe','Testa','15. minutni obroci','30.minuta obrok']),
        ];
    }
}
