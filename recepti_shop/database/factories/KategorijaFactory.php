<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Kategorija>
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
        static $counter = 0;
        $nazivi = ['Predjela', 'Glavna jela', 'Salate', 'Deserti', 'Supe i čorbe', '15-minutni obroci', 'Testa'];

        $naziv = $nazivi[$counter % count($nazivi)];
        $counter++;

        return [
            'naziv' => $naziv,
        ];
    }
}
