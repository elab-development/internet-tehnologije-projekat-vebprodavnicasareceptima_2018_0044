<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sastojak extends Model
{
    use HasFactory;
    protected $fillable = ['naziv'];
    protected $table = 'sastojci';

    public function recepti()
    {
        return $this->belongsToMany(Recept::class, 'recept_sastojak');
    }
}
