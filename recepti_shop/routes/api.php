<?php

use App\Http\Controllers\KuhinjaController;
use App\Http\Controllers\ReceptController;
use App\Http\Controllers\SastojakController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::apiResource('recepti', ReceptController::class);

Route::get('/users', [UserController::class, 'index']);
Route::post('/sastojci', [SastojakController::class, 'store']);
Route::put('/kuhinje/{id}', [KuhinjaController::class, 'update']);

Route::get('recepti/{id}/sastojci', [ReceptController::class, 'getSastojci']);
Route::get('recepti/filter', [ReceptController::class, 'filter']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
