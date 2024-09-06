<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kuhinja extends Model
{
    use HasFactory;

    protected $fillable = ['naziv'];
    protected $table = 'kuhinje';

    public function recepti()
    {
        return $this->hasMany(Recept::class);
    }
}
