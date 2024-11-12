<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Sastojak>
 */
class SastojakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'naziv' => $this->faker->word, 
            'merna_jedinica' => $this->faker->randomElement(['kg', 'g', 'l', 'ml', 'kom']),
            'cena'=>$this->faker->numberBetween(10, 2000)
        ];
    }
}
