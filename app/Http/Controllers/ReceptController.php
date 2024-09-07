<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReceptResource;
use App\Http\Resources\SastojakResource;
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
    public function show(Recept $recept)
    {
        return new ReceptResource($recept);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Recept $recept)
    {
        $recept->update($request->all());
        return new ReceptResource($recept);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Recept $recept)
    {
        $recept->delete();
        return response()->json(null, 204);
    }

    // public function getByVrstaObroka($vrsta)
    // {
    //     $recepti = Recept::where('vrsta_obroka', $vrsta)->get();
    //     return ReceptResource::collection($recepti);
    // }

    public function getSastojci(Recept $recept)
    {
        $sastojci = $recept->sastojci;
        return SastojakResource::collection($sastojci);
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

        $recepti = $query->paginate(10);
        return ReceptResource::collection($recepti);
    }
    

}
