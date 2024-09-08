<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReceptResource;
use App\Models\Recept;
use Illuminate\Http\Request;

class ReceptController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $recepti = Recept::paginate(10);
         return ReceptResource::collection($recepti);
        //return ReceptResource::collection(Recept::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $recept = Recept::create($request->all());
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
}
