<?php

namespace App\Http\Controllers;

use App\Models\StatistikaKorpe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class StatistikaController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sastojak_id' => 'required|exists:sastojci,id',
            'kolicina' => 'nullable|numeric|min:1'
        ]);

        $userId = Auth::id();
        
        $kolicina = $validated['kolicina'] ?? 1;

        $statistika = StatistikaKorpe::updateOrCreate(
            [
                'user_id' => $userId,
                'sastojak_id' => $validated['sastojak_id'],
            ],
            [
                'kolicina' => DB::raw("kolicina + $kolicina"),
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
