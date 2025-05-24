<?php

namespace App\Controllers\Store;

use App\Models\Store;
use App\Models\User;

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
            'estimated_sales_volume' => 'optional|string',
            'selling_journey_status' => 'optional|string',
            'product_types' => 'optional|string',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/store/new', 303);
        }

        if ($data['logo']) {
            $data['logo'] = request()->upload(
                'logo',
                withBucket('stores/' . auth()->id()),
                ['rename' => true]
            )['url'];

            if (!$data['logo']) {
                return response()
                    ->withFlash('errors', request()->errors())
                    ->redirect('/store/new', 303);
            }
        }

        if (Store::where('slug', $data['slug'])->exists()) {
            return response()
                ->withFlash('errors', ['slug' => "{$data['slug']}.selll.store is already taken, please choose another one"])
                ->redirect('/store/new', 303);
        }

        $user = User::find(auth()->id());
        $user->switchStore($user->ownedStores()->create($data));

        return response()->redirect('/dashboard');
    }

    public function showCustomize()
    {
        response()->inertia('store/customize', [
            'store' => User::find(auth()->id())->currentStore()->first(),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function customize()
    {
        $data = request()->validate([
            'show_hero' => 'optional|boolean',
            'hero_image' => 'optional|string',
            'hero_title' => 'optional|string',
            'hero_description' => 'optional|string',
            'hero_content_alignment' => 'optional|string',
            'show_store_name' => 'boolean',
            'show_store_logo' => 'boolean',
            'show_store_description' => 'boolean',
            'show_store_information_in_popup' => 'boolean',
            'show_product_price' => 'boolean',
            'show_product_description' => 'boolean',
            'theme_color' => 'string',
            'background_color' => 'string',
            'text_color' => 'string',
            'border_color' => 'string',
            'open_product_in_popup' => 'boolean',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/store/customize', 303);
        }

        $store = Store::find(auth()->user()->current_store_id);
        $store->config = json_encode($data);
        $store->save();

        return response()->redirect('/dashboard', 303);
    }
}
