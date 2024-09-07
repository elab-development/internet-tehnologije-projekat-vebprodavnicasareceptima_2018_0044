<?php

namespace App\Http\Controllers;

use App\Http\Resources\KategorijaResource;
use App\Models\Kategorija;
use Illuminate\Http\Request;

class KategorijaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return KategorijaResource::collection(Kategorija::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $kategorija = Kategorija::create($request->all());
        return new KategorijaResource($kategorija);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kategorija $kategorija)
    {
        return new KategorijaResource($kategorija);
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kategorija $kategorija)
    {
        $kategorija->update($request->all());
        return new KategorijaResource($kategorija);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kategorija $kategorija)
    {
        $kategorija->delete();
        return response()->json(null, 204);
    }
}
