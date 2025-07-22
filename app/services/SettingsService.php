<?php

namespace App\Services;

use App\Models\Store;

class SettingsService
{
    /**
     * Update the store URL.
     * @param Store $store
     * @return array
     */
    public function updateUrl(Store $store): array
    {
        $data = request()->validate([
            'slug' => 'string|min:1',
        ]);

        if (!$data) {
            return [
                'success' => false,
                'errors' => request()->errors(),
            ];
        }

        if (Store::where('slug', $data['slug'])->exists()) {
            return [
                'success' => false,
                'errors' => ['slug' => "{$data['slug']}.selll.store is already taken, please choose another one"],
            ];
        }

        $store->slug = $data['slug'];
        $store->save();

        return [
            'success' => true,
        ];
    }

    /**
     * Update the store name.
     * @param Store $store
     * @return bool
     */
    public function updateName(Store $store): bool
    {
        $data = request()->validate([
            'name' => 'string|min:1',
        ]);

        if (!$data) {
            return false;
        }

        $store->name = $data['name'];
        $store->save();

        return true;
    }

    /**
     * Update store information.
     * @param Store $store
     * @return bool
     */
    public function updateInfo(Store $store): bool
    {
        $data = request()->validate([
            'name' => 'string|min:1',
            'description' => 'min:10',
            'contact_email' => 'email',
            'contact_phone' => 'string',
            'contact_address' => 'optional|string',
            'facebook_url' => 'optional|string',
            'instagram_url' => 'optional|string',
            'twitter_url' => 'optional|string',
            'tiktok_url' => 'optional|string',
            'snapchat_url' => 'optional|string',
        ]);

        if (!$data) {
            return false;
        }

        $store = Store::find(auth()->user()->current_store_id);
        $store->name = $data['name'] ?? $store->name;
        $store->description = $data['description'] ?? $store->description;
        $store->email = $data['contact_email'] ?? $store->email;
        $store->phone = $data['contact_phone'] ?? $store->phone;
        $store->config = json_encode(array_merge(
            json_decode($store->config, true) ?? [],
            $data
        ));
        $store->save();

        return true;
    }
}
