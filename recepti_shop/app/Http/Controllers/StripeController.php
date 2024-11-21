<?php

namespace App\Http\Controllers;

use Stripe\Checkout\Session;
use Illuminate\Http\Request;
use Stripe\Stripe;

class StripeController extends Controller
{
    public function checkout()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $YOUR_DOMAIN = 'http://localhost:8000';

        $checkout_session = Session::create([
            'line_items' => [[
                'price' => '{{PRICE_ID}}', // Zameni stvarnim ID-jem
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => $YOUR_DOMAIN . '/?success=true',
            'cancel_url' => $YOUR_DOMAIN . '/?canceled=true',
        ]);

        return redirect($checkout_session->url);
    }
}
