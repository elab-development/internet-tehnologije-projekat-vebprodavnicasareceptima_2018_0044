<?php

namespace App\Http\Controllers;

use App\Http\Resources\KuhinjaResource;
use App\Models\Kuhinja;
use Illuminate\Http\Request;

class KuhinjaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return KuhinjaResource::collection(Kuhinja::all());
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $kuhinja = Kuhinja::create($request->all());
        return new KuhinjaResource($kuhinja);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kuhinja $kuhinja)
    {
        return new KuhinjaResource($kuhinja);
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Kuhinja $kuhinja)
    {
        $kuhinja->update($request->all());
        return new KuhinjaResource($kuhinja);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kuhinja $kuhinja)
    {
        $kuhinja->delete();
        return response()->json(null, 204);
    }
}
