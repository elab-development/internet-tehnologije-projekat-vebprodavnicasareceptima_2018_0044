<?php

namespace App\Http\Controllers;

use App\Models\Narudzbina;
use Illuminate\Http\Request;

class NarudzbinaController extends Controller
{
    public function index()
    {
        $narudzbine = Narudzbina::all();
        return response()->json(['data' => $narudzbine]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'ime' => 'required|string',
            'prezime' => 'required|string',
            'email' => 'required|email',
            'grad' => 'required|string',
            'postanski_broj' => 'required|string',
            'adresa' => 'required|string',
            'telefon' => 'required|string',
            'ukupan_iznos' => 'required|numeric',
        ]);

        $narudzbina = Narudzbina::create(array_merge($validated, [
            'user_id' => auth()->id(),
            'status' => 'na_cekanju',
        ]));

        return response()->json([
            'message' => 'Narudžbina uspešno kreirana!',
            'narudzbina_id' => $narudzbina->id,
        ], 201);
    }

    public function show($id)
    {
        $narudzbina = Narudzbina::with('stavkeNarudzbine')->findOrFail($id);
        return response()->json(['data' => $narudzbina]);
    }

    public function updateStatus(Request $request, $id)
    {
        $validated = $request->validate([
            'status' => 'required|in:na_cekanju,isporuceno,odbijeno',
        ]);

        $narudzbina = Narudzbina::findOrFail($id);
        $narudzbina->update(['status' => $validated['status']]);

        return response()->json(['message' => 'Status narudžbine uspešno ažuriran.', 'data' => $narudzbina]);
    }
}
