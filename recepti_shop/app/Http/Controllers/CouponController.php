<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class CouponController extends Controller
{
    public function initializeCoupon(Request $request)
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDQyZDlmOGJmZjVlYjFlODZjZGM5ZWQ2NmM3YjIyYWNiOTMyNjE5NTE3OGI1NzY1NGUyOWJkMDBlMTBlYzkyOGY5ZWJmNTVlMjdlYTI0OGYiLCJpYXQiOjE3MzIxMDQwMDMuNzA0MTU1LCJuYmYiOjE3MzIxMDQwMDMuNzA0MTU3LCJleHAiOjE3NjM2NDAwMDMuNzAwMzAzLCJzdWIiOiI2Iiwic2NvcGVzIjpbImNyZWF0ZTpjb3Vwb24iLCJyZWFkOmNvdXBvbiIsInVwZGF0ZTpjb3Vwb24iLCJkZWxldGU6Y291cG9uIl19.VX5cD3KcK434ZN7fmksEAyLIFoIATP97v980N_hrklmJSvGk-GaHyrNcTmaAwS1ef8hC0kcE9z0ezhtlv0mjCMoVtj59Mshrq-KqT3GRpyvk-tsyDXD4v1k7_i-_dVKLYUetAsln-8XIKW1ge-vrMNN2yDWilSEtldHAS7jUQcbAa4JM8HUwRrbb9w2rRDppp3ED-3--EbfWSgpxIn8gJ9_CluhxLu_RlWeaYXyDGTU0RVwArRgO0-VhIphLjg6ANTgh4IwD8G7zcEcwVRs3qjMRLkRSlchI8FV3qgo1xnqTnzaxSpcKy6ljmL-GFTI4pUMgKYSfOgfqcEtdyZBkYA',
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
