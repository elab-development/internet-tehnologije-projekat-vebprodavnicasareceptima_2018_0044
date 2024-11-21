<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Narudzbina extends Model
{
    use HasFactory;
    protected $table = 'narudzbine';

    protected $fillable = [
        'user_id',
        'ime',
        'prezime',
        'e-mail',
        'grad',
        'postanski_broj',
        'adresa',
        'telefon',
        'ukupan_iznos',
        'status',
    ];
    
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function stavkeNarudzbine()
    {
        return $this->hasMany(StavkaNarudzbine::class, 'narudzbina_id');
    }

}
