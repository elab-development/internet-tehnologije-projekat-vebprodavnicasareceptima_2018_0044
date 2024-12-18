<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\CouponController;
use App\Http\Controllers\KorpaController;
use App\Http\Controllers\KuhinjaController;
use App\Http\Controllers\NarudzbinaController;
use App\Http\Controllers\ReceptController;
use App\Http\Controllers\SastojakController;
use App\Http\Controllers\StatistikaController;
use App\Http\Controllers\StavkaNarudzbineController;
use App\Http\Controllers\StripeController;
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
Route::get('recepti/filter', [ReceptController::class, 'filter']);
Route::get('/recepti/{id}', [ReceptController::class, 'show']);
Route::get('/recepti', [ReceptController::class, 'index']);
Route::get('/kuhinje', [KuhinjaController::class, 'index']);
Route::get('recepti/{id}/sastojci', [ReceptController::class, 'getSastojci']);
Route::get('/recepti/sastojak/{sastojakId}', [ReceptController::class, 'getReceptiBySastojak']);
Route::get('/recept/pretraga', [ReceptController::class, 'pretraziPoNazivu']);
Route::get('/sastojak/pretraga', [SastojakController::class, 'pretraziPoNazivu']);
Route::post('/coupon/initialize', [CouponController::class, 'initializeCoupon']);
Route::post('/coupon/callback', [CouponController::class, 'callbackCoupon']);
Route::post('/checkout', [StripeController::class, 'checkout']);



Route::middleware('guest')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

});

Route::middleware('auth:sanctum', 'role:admin')->group(function () {
    Route::apiResource('recepti', ReceptController::class)->except(['show','index']);
    Route::put('kuhinje/{id}', [KuhinjaController::class, 'update']);
    Route::get('/narudzbine', [NarudzbinaController::class, 'index']);
    Route::get('/narudzbine/{id}', [NarudzbinaController::class, 'show']);
    Route::get('/statistika/sastojci', [StatistikaController::class, 'najcesceDodavaniSastojci']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('/narudzbine', [NarudzbinaController::class, 'store']);
    Route::post('/stavke-narudzbine', [StavkaNarudzbineController::class, 'storeMultiple']);
    Route::get('/stavke-narudzbine/narudzbina/{narudzbinaId}', [StavkaNarudzbineController::class, 'indexByOrder']);

});

Route::middleware('auth:sanctum', 'role:user')->group(function () {
    Route::get('korpa', [KorpaController::class, 'prikaziKorpu']);
    Route::post('korpa/dodaj', [KorpaController::class, 'dodajUkorpu']);
    Route::put('korpa/azuriraj/{sastojakId}', [KorpaController::class, 'azurirajSastojak']);
    Route::delete('korpa/obrisi/{sastojakId}', [KorpaController::class, 'obrisiSastojak']);
    Route::delete('korpa/isprazni', [KorpaController::class, 'isprazniKorpu']);
    Route::post('korpa/recept/{receptId}', [ReceptController::class, 'dodajReceptUKorpu'])
     ->name('korpa.dodajRecept');
    Route::post('/statistika', [StatistikaController::class, 'store']);
});






