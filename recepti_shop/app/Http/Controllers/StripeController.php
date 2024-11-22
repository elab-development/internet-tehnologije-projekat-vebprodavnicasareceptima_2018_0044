<?php

namespace App\Http\Controllers;

use Stripe\Checkout\Session;
use Illuminate\Http\Request;
use Stripe\Stripe;

class StripeController extends Controller
{
    public function checkout(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $YOUR_DOMAIN = 'http://localhost:3000';

        $items = $request->input('items');
        $couponTotal = $request->input('couponTotal', 0);
        $deliveryCost = 250;

        $totalAmount = collect($items)->reduce(function ($total, $item) {
            return $total + ($item['cena'] * $item['kolicina']);
        }, 0) + $deliveryCost - $couponTotal;

        if ($totalAmount < 0) {
            $totalAmount = 0;
        }

        $line_items = array_map(function ($item) {
            return [
                'price_data' => [
                    'currency' => 'rsd',
                    'product_data' => [
                        'name' => $item['naziv'],
                    ],
                    'unit_amount' => $item['cena'] * 100,
                ],
                'quantity' => $item['kolicina'],
            ];
        }, $items);

        $line_items[] = [
            'price_data' => [
                'currency' => 'rsd',
                'product_data' => [
                    'name' => 'Troškovi dostave',
                ],
                'unit_amount' => $deliveryCost * 100,
            ],
            'quantity' => 1,
        ];

        $checkout_session = Session::create([
            'payment_method_types' => ['card'],
            'line_items' => $line_items,
            'mode' => 'payment',
            'success_url' => $YOUR_DOMAIN . '/?success=true',
            'cancel_url' => $YOUR_DOMAIN . '/?canceled=true',
        ]);

        return response()->json(['url' => $checkout_session->url]);

        }
}
