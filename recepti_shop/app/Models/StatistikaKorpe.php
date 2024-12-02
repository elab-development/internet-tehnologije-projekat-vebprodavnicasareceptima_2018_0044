<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatistikaKorpe extends Model
{
    use HasFactory;
    protected $table = 'statistika_korpe';

    protected $fillable = [
        'user_id',
        'sastojak_id',
        'kolicina',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function sastojak()
    {
        return $this->belongsTo(Sastojak::class);
    }
}
