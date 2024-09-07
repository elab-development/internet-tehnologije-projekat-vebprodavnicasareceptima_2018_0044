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
            'kategorija' => new KategorijaResource($this->whenLoaded('kategorija')),
            'kuhinja' => new KuhinjaResource($this->whenLoaded('kuhinja')),
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
        ];
    }
}
