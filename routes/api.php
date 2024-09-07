<?php

use Illuminate\Support\Facades\Route;
use app\Http\Controllers;
use App\Http\Controllers\KategorijaController;
use App\Http\Controllers\KuhinjaController;
use App\Http\Controllers\ReceptController;
use App\Http\Controllers\SastojakController;
use App\Http\Controllers\UserController;
use App\Models\Kategorija;

Route::apiResource('kategorije', KategorijaController::class);
Route::apiResource('kuhinje', KuhinjaController::class);
Route::apiResource('recepti', ReceptController::class);
Route::apiResource('sastojci', SastojakController::class);

Route::get('/users', [UserController::class, 'index']);

//Route::get('recepti/vrsta-obroka/{vrsta}', [ReceptController::class, 'getByVrstaObroka']);
Route::get('recepti/{recept}/sastojci', [ReceptController::class, 'getSastojci']);
Route::get('recepti/filter', [ReceptController::class, 'filter']);



