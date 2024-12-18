<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReceptResource;
use App\Models\Korpa;
use App\Models\Recept;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReceptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //  $recepti = Recept::paginate(10);
        //  return ReceptResource::collection($recepti);
        return ReceptResource::collection(Recept::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
            'opis' => 'required|string',
            'vreme_pripreme' => 'required|integer',
            'broj_porcija' => 'required|integer',
            'nacin_pripreme' => 'required|string',
            'vrsta_obroka' => 'required|string',
            'kategorija_id' => 'required|integer|exists:kategorije,id',
            'kuhinja_id' => 'required|integer|exists:kuhinje,id',
            'slika' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('slika')) {
            $validated['slika'] = $request->file('slika')->store('images', 'public');
        }

        $recept = Recept::create($validated);

        return new ReceptResource($recept);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $recept=Recept::with(['kategorija','kuhinja'])->find($id);

        if(!$recept){
            return response()->json(['error'=>'Recept ne postoji'],404);
        }
        return new ReceptResource($recept);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $recept = Recept::findOrFail($id);
        $recept->update($request->all());
        return new ReceptResource($recept);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $recept = Recept::findOrFail($id);
        $recept->delete();
        return response()->json(null, 204);
    }

    public function getSastojci(string $id)
    {
        $recept = Recept::findOrFail($id);
        $sastojci = $recept->sastojci()->withPivot('kolicina')->get();
        return response()->json([
            'data' => $sastojci
        ]);        
    }

    public function filter(Request $request)
    {
        $query = Recept::query();

        if ($request->has('kategorija_id')) {
            $query->where('kategorija_id', $request->input('kategorija_id'));
        }

        if ($request->has('kuhinja_id')) {
            $query->where('kuhinja_id', $request->input('kuhinja_id'));
        }

        if ($request->has('vrsta_obroka')) {
            $query->where('vrsta_obroka', $request->input('vrsta_obroka'));
        }

        $recepti = $query->with(['kategorija', 'kuhinja'])->paginate(10);
        $recepti = $query->paginate(10);
        return ReceptResource::collection($recepti);
    }

    public function dodajReceptUKorpu($receptId)
    {
        $korpa = Korpa::firstOrCreate(['user_id' => Auth::id()]);

        $korpa->dodajReceptUKorpu($receptId);

        return response()->json(['message' => 'Recept je dodat u korpu.'], 200);
    }

    public function pretraziPoNazivu(Request $request)
    {
        $upit = $request->input('naziv');
        $sort = $request->input('sort');
    
        // default
        $orderColumn = 'naziv';
        $orderDirection = 'asc';
    
        if ($sort) {
            switch ($sort) {
                case 'naziv_asc':
                    $orderColumn = 'naziv';
                    $orderDirection = 'asc';
                    break;
                case 'naziv_desc':
                    $orderColumn = 'naziv';
                    $orderDirection = 'desc';
                    break;
                case 'datum_desc':
                    $orderColumn = 'created_at'; 
                    $orderDirection = 'desc';
                    break;
                case 'datum_asc':
                    $orderColumn = 'created_at';
                    $orderDirection = 'asc';
                    break;
            }
        }
    
        $recepti = Recept::where('naziv', 'LIKE', '%' . $upit . '%')
            ->orderBy($orderColumn, $orderDirection)
            ->get();
    
        return response()->json([
            'status' => 'success',
            'data' => $recepti
        ], 200);
    }    

    public function getReceptiBySastojak(string $sastojakId)
    {

        $recepti = Recept::whereHas('sastojci', function ($query) use ($sastojakId) {
            $query->where('sastojak_id', $sastojakId);
        })->get();

        return response()->json([
            'data' => $recepti
        ]);
    }


}
