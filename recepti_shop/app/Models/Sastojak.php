<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sastojak extends Model
{
    use HasFactory;

    use HasFactory;
    protected $fillable = ['naziv'];
    protected $table = 'sastojci';

    public function recepti()
    {
        return $this->belongsToMany(Recept::class, 'recept_sastojak')->withPivot('kolicina');
    }
  
    public function korpe()
    {
        return $this->belongsToMany(Korpa::class, 'korpa_sastojak')->withPivot('kolicina');
    }

    public function stavkeNarudzbine()
    {
        return $this->hasMany(StavkaNarudzbine::class, 'sastojak_id');
    }
}
