<?php

namespace Database\Factories;
use App\Models\Recept;
use App\Models\Sastojak;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ReceptSastojakFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            
                'recept_id' => Recept::factory(),
                'sastojak_id' => Sastojak::factory(),
                'kolicina' => $this->faker->randomFloat(2, 0.1, 10), // Generiše razlomljene brojeve
            
        ];
    }
}
