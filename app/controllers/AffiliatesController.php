<?php

namespace App\Controllers;

use App\Models\Affiliate;
use App\Models\Product;
use Illuminate\Support\Facades\Cache;

class AffiliatesController extends Controller
{
    public function index()
    {
        response()->inertia('affiliates/affiliates');
    }

    public function showProducts()
    {
        response()->inertia('affiliates/products', [
            'products' => Product::where('status', 'active')
                ->where(function ($query) {
                    $query->whereNotLike('name', 'Example%')
                        ->orWhereNotLike('name', 'Sample%')
                        ->orWhereNotLike('name', 'Demo%')
                        ->orWhereNotLike('name', 'Test%');
                })
                ->where(function ($query) {
                    $query->where('quantity', 'unlimited')
                        ->orWhereRaw('quantity_items > ?', [2]);
                })
                ->where('description', '!=', '')
                ->whereRaw('LENGTH(description) > 70')
                ->whereRaw('CAST(price AS DECIMAL(10,2)) > ?', [20.00])
                ->inRandomOrder()
                ->limit(50)
                ->get(),
        ]);
    }

    public function showProduct($id)
    {
        $product = Product::findOrFail($id)->load(['store', 'purchases']);
        $billingProvider = billing(in_array('GHS', ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe');

        $banks = cache(
            "affiliates.banks",
            60 * 60,
            function () use ($billingProvider) {
                return $billingProvider->provider()->getAvailableBanks([
                    'type' => 'ghipss',
                    'country' => 'ghana',
                    'currency' => 'GHS',
                ]);
            }
        );

        $mobileMoney = cache(
            "affiliates.mobileMoney",
            60 * 60,
            function () use ($billingProvider) {
                return $billingProvider->provider()->getAvailableBanks([
                    'type' => 'mobile_money',
                    'country' => 'ghana',
                    'currency' => 'GHS',
                ]);
            }
        );

        response()->inertia('affiliates/product', [
            'product' => $product,
            'banks' => $banks,
            'mobileMoney' => $mobileMoney,
            'errors' => request()->flash('errors'),
        ]);
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'string',
            'email' => 'email',
            'type' => 'string',
            'phone' => 'string',
            'product' => 'numeric',
            'provider' => 'string',
            'commission' => 'numeric',
            'account_number' => 'string',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/affiliates/products/' . request()->get('product'), 303);
        }

        [$bankCode, $provider] = explode(':', $data['provider']);

        $billingProvider = billing(in_array('GHS', ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe');

        try {
            $existingAffiliateAccount = Affiliate::where('account_number', $data['account_number'])
                ->where('account_identifier', $bankCode)
                ->where('provider', $provider)
                ->first();

            if ($existingAffiliateAccount) {
                $affiliate = Affiliate::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                    'type' => $data['type'],
                    'provider' => $provider,
                    'commission' => $data['commission'] ?? 0,
                    'account_code' => $existingAffiliateAccount->account_code,
                    'account_number' => $data['account_number'],
                    'account_identifier' => $bankCode,
                    'currency' => $existingAffiliateAccount->currency,
                    'product_id' => $data['product'],
                ]);
            } else {
                $subaccount = $billingProvider->provider()->subaccounts()->create([
                    'business_name' => $data['name'],
                    'settlement_bank' => $bankCode,
                    'account_number' => $data['account_number'],
                    'percentage_charge' => 2,
                    'description' => "Selll payout account for {$data['name']}",
                    'primary_contact_email' => $data['email'],
                    'primary_contact_name' => $data['name'],
                ]);

                if (!$subaccount) {
                    return response()
                        ->withFlash('errors', ['type' => 'Unable to create subaccount. Please try again later.'])
                        ->redirect("/affiliates/products/{$data['product']}", 303);
                }

                $affiliate = Affiliate::create([
                    'name' => $data['name'],
                    'email' => $data['email'],
                    'phone' => $data['phone'],
                    'type' => $data['type'],
                    'provider' => $provider,
                    'commission' => $data['commission'] ?? 0,
                    'account_code' => $subaccount->subaccount_code,
                    'account_number' => $data['account_number'],
                    'account_identifier' => $bankCode,
                    'currency' => $subaccount->currency,
                    'product_id' => $data['product'],
                ]);
            }

            if (!$affiliate) {
                return response()
                    ->withFlash('errors', ['type' => 'Unable to create affiliate. Please try again later.'])
                    ->redirect("/affiliates/products/{$data['product']}", 303);
            }

            $affiliate->update([
                'slug' => base64_encode($affiliate->id) . '==',
            ]);

            $geoData = request()->getUserLocation();

            app()->mixpanel->track('Affiliate Saved', [
                '$user_id' => auth()->id(),
                'affiliate_id' => $affiliate->id,
                '$region' => $geoData['region'] ?? null,
                '$city' => $geoData['city'] ?? null,
                'mp_country_code' => $geoData['countryCode'] ?? null,
                '$country_code' => $geoData['countryCode'] ?? null,
            ]);

            return response()->redirect("/affiliates/links/{$affiliate->slug}", 303);
        } catch (\Throwable $th) {
            return response()
                ->withFlash('errors', ['account_number' => $th->getMessage()])
                ->redirect("/affiliates/products/{$data['product']}", 303);
        }
    }

    public function showAffiliate($slug)
    {
        $affiliate = Affiliate::where('slug', $slug)
            ->firstOrFail()
            ->load('product', 'product.store');

        response()->inertia('affiliates/affiliate', [
            'affiliate' => $affiliate,
        ]);
    }
}
