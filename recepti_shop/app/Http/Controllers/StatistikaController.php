<?php

namespace App\Http\Controllers;

use App\Models\StatistikaKorpe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistikaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'sastojak_id' => 'required|exists:sastojci,id',
            'kolicina' => 'required|integer|min:1',
        ]);

        $statistika = StatistikaKorpe::updateOrCreate(
            [
                'user_id' => $validated['user_id'],
                'sastojak_id' => $validated['sastojak_id']
            ],
            [
                'kolicina' => DB::raw("kolicina + {$validated['kolicina']}")
            ]
        );

        return response()->json([
            'message' => 'Statistika uspešno dodata ili ažurirana.',
            'data' => $statistika
        ], 201);
    }

    public function najcesceDodavaniSastojci()
    {
        $data = StatistikaKorpe::select('sastojci.naziv', DB::raw('SUM(statistika_korpe.kolicina) as broj_dodavanja'))
            ->join('sastojci', 'statistika_korpe.sastojak_id', '=', 'sastojci.id')
            ->groupBy('sastojci.naziv')
            ->orderByDesc('broj_dodavanja')
            ->take(10)
            ->get();

        return response()->json($data);
    }
}
