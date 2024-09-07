<?php

namespace App\Http\Controllers;

use App\Http\Resources\SastojakResource;
use App\Models\Sastojak;
use Illuminate\Http\Request;

class SastojakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SastojakResource::collection(Sastojak::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $sastojak = Sastojak::create($request->all());
        return new SastojakResource($sastojak);
    }

    /**
     * Display the specified resource.
     */
    public function show(Sastojak $sastojak)
    {
        return new SastojakResource($sastojak);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Sastojak $sastojak)
    {
        $sastojak->update($request->all());
        return new SastojakResource($sastojak);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sastojak $sastojak)
    {
        $sastojak->delete();
        return response()->json(null, 204);
    }
}
