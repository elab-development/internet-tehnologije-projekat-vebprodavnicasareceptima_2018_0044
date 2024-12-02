<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReceptResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'naziv' => $this->naziv,
            'opis' => $this->opis,
            'vreme_pripreme' => $this->vreme_pripreme,
            'broj_porcija' => $this->broj_porcija,
            'nacin_pripreme' => $this->nacin_pripreme,
            'vrsta_obroka' => $this->vrsta_obroka,
            'kategorija' => $this->kategorija ? [
                'id' => $this->kategorija->id,
                'naziv' => $this->kategorija->naziv,
            ] : null,
            'kuhinja' => $this->kuhinja ? [
                'id' => $this->kuhinja->id,
                'naziv' => $this->kuhinja->naziv,
            ] : null,
            'slika' => $this->slika ? url('storage/' . $this->slika) : null, //URL se upisuje
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
