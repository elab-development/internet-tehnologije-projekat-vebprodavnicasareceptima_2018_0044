<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CouponController extends Controller
{
    public function initializeCoupon(Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('KUPONIFY_API_TOKEN'),
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ])->post('https://api.kuponify.com/api/v1/coupons/initialize', [
            'store_id' => $request->store_id,
            'coupon' => $request->coupon,
            'total' => $request->total,
            'customer_email' => $request->customer_email,
            'metadata' => $request->metadata
        ]);

        return $response->json();
    }

    public function callbackCoupon(Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('KUPONIFY_API_TOKEN'),
            'Content-Type' => 'application/json',
            'Accept' => 'application/json'
        ])->post('https://api.kuponify.com/api/v1/coupons/callback', [
            'usage_id' => $request->usage_id,
            'status' => $request->status
        ]);

        return $response->json();
    }
}
