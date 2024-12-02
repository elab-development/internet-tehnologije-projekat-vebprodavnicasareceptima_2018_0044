<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StavkaNarudzbine extends Model
{
    use HasFactory;
    protected $table = 'stavke_narudzbine';

    protected $fillable = [
        'narudzbina_id',
        'sastojak_id',
        'kolicina',
        'cena',
    ];

    public function narudzbina()
    {
        return $this->belongsTo(Narudzbina::class, 'narudzbina_id');
    }

    public function sastojak()
    {
        return $this->belongsTo(Sastojak::class, 'sastojak_id');
    }
}
