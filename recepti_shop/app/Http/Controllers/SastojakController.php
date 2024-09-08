<?php

namespace App\Http\Controllers;

use App\Models\Sastojak;
use Illuminate\Http\Request;

class SastojakController extends Controller
{
      /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sastojci = Sastojak::all();
        return response()->json($sastojci);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
            'merna_jedinica' => 'nullable|string|max:255'
        ]);

        $sastojak = Sastojak::create($validated);

        return response()->json($sastojak, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $sastojak = Sastojak::findOrFail($id);
        return response()->json($sastojak);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'naziv' => 'required|string|max:255',
            'merna_jedinica' => 'nullable|string|max:255'
        ]);

        $sastojak = Sastojak::findOrFail($id);
        $sastojak->update($validated);
        return response()->json($sastojak);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $sastojak = Sastojak::findOrFail($id);
        $sastojak->delete();
        return response()->json(null, 204);
    }
}
