<?php

namespace App\Controllers\Store;

use App\Helpers\StoreHelper;
use App\Mailers\StoreMailer;
use App\Models\Store;
use App\Models\User;
use App\Services\SettingsService;

class SetupController extends Controller
{
    public function index()
    {
        response()->inertia('store/setup', [
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function store()
    {
        $data = request()->validate([
            'name' => 'string',
            'slug' => 'string',
            'description' => 'min:10',
            'logo' => 'optional',
            'currency' => 'string',
            'email' => 'email',
            'phone' => 'optional|string',
            'address' => 'optional|string',
            'estimated_sales_volume' => 'string',
            'selling_journey_status' => 'string',
            'product_types' => 'string',
            'customer_source' => 'string',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/store/new', 303);
        }

        if (isset($data['logo'])) {
            $data['logo'] = request()->upload(
                'logo',
                withBucket('stores/' . auth()->id()),
                ['rename' => true]
            )['url'] ?? null;

            if (!$data['logo']) {
                return response()
                    ->withFlash('errors', request()->errors())
                    ->redirect('/store/new', 303);
            }
        }

        if (Store::where('slug', $data['slug'])->exists()) {
            return response()
                ->withFlash('errors', ['slug' => "{$data['slug']}.selll.store is already taken, please choose another URL"])
                ->redirect('/store/new', 303);
        }

        $user = User::with('referral')->find(auth()->id());
        $user->switchStore($store = $user->ownedStores()->create($data));
        $user->referral()->first()?->update([
            'store_id' => $store->id,
            'store_created_at' => $store->created_at,
        ]);

        StoreMailer::welcome($user, $store)->send();

        $geoData = request()->getUserLocation();

        app()->mixpanel->track('Store Created', [
            '$user_id' => auth()->id(),
            'store_id' => $store->id,
            '$region' => $geoData['region'] ?? null,
            '$city' => $geoData['city'] ?? null,
            'mp_country_code' => $geoData['countryCode'] ?? null,
            '$country_code' => $geoData['countryCode'] ?? null,
        ]);

        return response()->redirect('/payouts/setup', 303);
    }

    public function showCustomize()
    {
        response()->inertia('store/customize', [
            'store' => StoreHelper::find(),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function customize()
    {
        $data = request()->validate([
            'hero_image' => 'optional|string',
            'hero_title' => 'optional|string',
            'hero_description' => 'optional|string',
            'hero_content_alignment' => 'optional|string',
            'hero_button_text' => 'optional|string',
            'theme_color' => 'string',
            'background_color' => 'string',
            'text_color' => 'string',
            'border_color' => 'string',
            'contact_email' => 'email',
            'contact_phone' => 'string',
            'contact_address' => 'optional|string',
            'facebook_url' => 'optional|string',
            'instagram_url' => 'optional|string',
            'twitter_url' => 'optional|string',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/store/customize', 303);
        }

        $data = array_merge(
            $data,
            request()->try([
                'show_hero',
                'show_hero_button',
                'show_hero_search',
                'show_store_name',
                'show_store_logo',
                'show_store_description',
                'show_store_information_in_popup',
                'show_product_price',
                'show_product_description',
                'open_product_in_popup',
                'show_contact_info',
                'two_cards_on_mobile',
            ])
        );

        $store = Store::find(auth()->user()->current_store_id);
        $store->config = json_encode($data);
        $store->save();

        return response()->redirect('/store/customize', 303);
    }

    public function showDomain()
    {
        response()->inertia('store/domain', [
            'store' => StoreHelper::find(),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function domain()
    {
        $data = make(SettingsService::class)->updateUrl(
            StoreHelper::find()
        );

        if (!$data['success']) {
            return response()
                ->withFlash('errors', $data['errors'])
                ->redirect('/store/domain', 303);
        }

        return response()->redirect('/store/domain', 303);
    }
}
