<?php

namespace App\Http\Controllers;

use App\Models\Kategorija;
use Illuminate\Http\Request;

class KategorijaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kategorije = Kategorija::all();
        return response()->json($kategorije);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
        ]);

        $kategorija = Kategorija::create($validated);

        return response()->json($kategorija, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kategorija = Kategorija::findOrFail($id);
        return response()->json($kategorija);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
        ]);
        $kategorija = Kategorija::findOrFail($id);
        $kategorija->update($validated);
        return response()->json($kategorija);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kategorija = Kategorija::findOrFail($id);
        $kategorija->delete();
        return response()->json(null, 204);
    }
}
