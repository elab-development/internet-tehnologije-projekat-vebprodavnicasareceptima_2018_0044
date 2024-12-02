<?php

namespace App\Http\Controllers;

use App\Models\Kuhinja;
use Illuminate\Http\Request;

class KuhinjaController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $kuhinje = Kuhinja::all();
        return response()->json($kuhinje);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
        ]);

        $kuhinja = Kuhinja::create($validated);

        return response()->json($kuhinja, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $kuhinja = Kuhinja::findOrFail($id);
        return response()->json($kuhinja);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
        ]);
        $kuhinja = Kuhinja::findOrFail($id);
        $kuhinja->update($validated);
        return response()->json($kuhinja);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $kuhinja = Kuhinja::findOrFail($id);
        $kuhinja->delete();
        return response()->json(null, 204);
    }
}
