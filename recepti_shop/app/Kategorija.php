<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategorija extends Model
{
    use HasFactory;
    
    protected $fillable = ['naziv'];
    protected $table = 'kategorije';

    public function recepti()
    {
        return $this->hasMany(Recept::class);
    }
}
