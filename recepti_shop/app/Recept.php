<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recept extends Model
{
    use HasFactory;

    protected $fillable = ['naziv', 'opis','vreme_pripreme', 'broj_porcija', 'nacin_pripreme','vrsta_obroka',
    'kategorija_id', 'kuhinja_id'];
    protected $table = 'recepti';

   public function kategorija()
   {
       return $this->belongsTo(Kategorija::class);
   }

   public function kuhinja()
   {
       return $this->belongsTo(Kuhinja::class);
   }

}
