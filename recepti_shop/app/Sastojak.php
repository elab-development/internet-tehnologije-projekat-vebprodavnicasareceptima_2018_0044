<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sastojak extends Model
{
    use HasFactory;

    use HasFactory;
    protected $fillable = ['naziv'];
    protected $table = 'sastojci';

  
}
