<?php

namespace App\Http\Controllers;

use App\Models\StavkaNarudzbine;
use Illuminate\Http\Request;

class StavkaNarudzbineController extends Controller
{
    public function show($id)
    {
        $stavka = StavkaNarudzbine::findOrFail($id);

        return response()->json(['data' => $stavka]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'narudzbina_id' => 'required|exists:narudzbine,id',
            'sastojak_id' => 'required|exists:sastojci,id',
            'kolicina' => 'required|integer|min:1',
            'cena' => 'required|numeric',
        ]);

        $stavka = StavkaNarudzbine::create($validated);

        return response()->json(['message' => 'Stavka uspešno dodata!', 'data' => $stavka], 201);
    }
    public function storeMultiple(Request $request)
    {
        $validated = $request->validate([
            'stavke' => 'required|array',
            'stavke.*.narudzbina_id' => 'required|exists:narudzbine,id',
            'stavke.*.sastojak_id' => 'required|exists:sastojci,id',
            'stavke.*.kolicina' => 'required|integer|min:1',
            'stavke.*.cena' => 'required|numeric',
        ]);

        $stavke = collect($validated['stavke'])->map(function ($stavka) {
            return StavkaNarudzbine::create($stavka);
        });

        return response()->json([
            'message' => 'Sve stavke uspešno dodate!',
            'data' => $stavke
        ], 201);
    }


    public function destroy($id)
    {
        $stavka = StavkaNarudzbine::findOrFail($id);
        $stavka->delete();

        return response()->json(['message' => 'Stavka uspešno obrisana!']);
    }

    public function indexByOrder($narudzbinaId)
    {
        $stavke = StavkaNarudzbine::where('narudzbina_id', $narudzbinaId)->get();

        return response()->json(['data' => $stavke]);
    }
}
