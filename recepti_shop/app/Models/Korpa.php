<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Korpa extends Model
{
    use HasFactory;

    protected $table = 'korpe';

    protected $fillable = ['user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sastojci()
    {
        return $this->belongsToMany(Sastojak::class, 'korpa_sastojak')->withPivot('kolicina');
    }

    public function dodajIliAzurirajSastojak($sastojakId, $kolicina)
    {
        if ($this->sastojci()->where('sastojak_id', $sastojakId)->exists()) {
            $this->sastojci()->updateExistingPivot($sastojakId, ['kolicina' => $kolicina]);
        } else {
            $this->sastojci()->attach($sastojakId, ['kolicina' => $kolicina]);
        }
    }

    public function dodajReceptUKorpu($receptId)
    {
        $recept = Recept::with('sastojci')->findOrFail($receptId);

        foreach ($recept->sastojci as $sastojak) {
            $this->dodajIliAzurirajSastojak($sastojak->id, $sastojak->pivot->kolicina);
        }
    }
}
