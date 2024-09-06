<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReceptSastojak extends Model
{
    use HasFactory;
    protected $table = 'recept_sastojak'; 

    protected $fillable = ['recept_id', 'sastojak_id', 'kolicina']; 
}
