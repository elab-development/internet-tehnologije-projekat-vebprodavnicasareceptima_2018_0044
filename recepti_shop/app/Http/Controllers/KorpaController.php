<?php

namespace App\Http\Controllers;
use App\Models\Korpa;
use App\Models\Sastojak;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class KorpaController extends Controller
{
    public function prikaziKorpu()
    {
        $korpa = Korpa::where('user_id', Auth::id())->with('sastojci')->first();

        if (!$korpa) {
            return response()->json(['message' => 'Korpa je prazna.'], 200);
        }

        return response()->json($korpa, 200);
    }

    public function dodajUkorpu(Request $request)
    {
        $request->validate([
            'sastojak_id' => 'required|exists:sastojci,id',
            'kolicina' => 'required|integer|min:1'
        ]);

        $sastojakId = $request->sastojak_id;
        $kolicina = $request->kolicina;

        $korpa = Korpa::firstOrCreate(
            ['user_id' => Auth::id()]
        );

        $korpa->dodajIliAzurirajSastojak($sastojakId, $kolicina);

        return response()->json(['message' => 'Sastojak je dodat u korpu.'], 200);
    }

    public function azurirajSastojak(Request $request, $sastojakId)
    {
        $request->validate([
            'kolicina' => 'required|integer|min:1'
        ]);

        $kolicina = $request->kolicina;

        $korpa = Korpa::where('user_id', Auth::id())->firstOrFail();

        if ($korpa->sastojci->contains($sastojakId)) {
            $korpa->dodajIliAzurirajSastojak($sastojakId, $kolicina);
            return response()->json(['message' => 'Količina je ažurirana.'], 200);
        }

        return response()->json(['message' => 'Sastojak nije pronađen u korpi.'], 404);
    }

    public function obrisiSastojak($sastojakId)
    {
        $korpa = Korpa::where('user_id', Auth::id())->firstOrFail();

        if ($korpa->sastojci->contains($sastojakId)) {
            $korpa->sastojci()->detach($sastojakId);
            return response()->json(['message' => 'Sastojak je uklonjen iz korpe.'], 200);
        }

        return response()->json(['message' => 'Sastojak nije pronađen u korpi.'], 404);
    }

    public function isprazniKorpu()
    {
        $korpa = Korpa::where('user_id', Auth::id())->firstOrFail();

        $korpa->sastojci()->detach();

        return response()->json(['message' => 'Korpa je ispražnjena.'], 200);
    }
}
