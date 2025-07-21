<?php

namespace App\Services;

use App\Helpers\StoreHelper;
use App\Models\Analytics;
use App\Models\Cart;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;

class InventoryService
{
    /**
     * Get all store products.
     * @param Store $store
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getProducts(Store $store)
    {
        return $store
            ->products()
            ->with('purchases')
            ->get();
    }

    /**
     * Get product by ID.
     * @param int $id
     */
    public function getProductById(int $id, Store $store)
    {
        return $store
            ->products()
            ->with('categories')
            ->find($id);
    }

    /**
     * Get product views
     */
    public function getProductViews(int $id)
    {
        return Analytics::where('store_id', $id)
            ->where('action_id', $id)
            ->where('event', 'page_view')
            ->whereMonth('created_at', date('m'))
            ->count();
    }

    public function createProduct()
    {
        $data = request()->get([
            'name',
            'description',
            'price',
            'quantity',
            'quantity_items',
        ], false);

        $uploads = request()->upload(
            'images',
            withBucket('products/' . auth()->user()->current_store_id),
            ['rename' => true]
        );

        if (!$uploads) {
            return false;
        }

        $data['images'] = json_encode(array_map(
            function ($item) {
                return $item['url'];
            },
            $uploads
        ));

        $currentStore = StoreHelper::find();
        $product = $currentStore->products()->create($data);

        foreach (request()->get('categories', false) ?? [] as $categoryData) {
            $category = $currentStore->categories()->where('title', $categoryData['value'])->first();

            if (!$category) {
                $category = $currentStore->categories()->firstOrCreate(
                    ['title' => $categoryData['value']],
                    ['description' => $categoryData['label']]
                );
            }

            $product->categories()->attach($category->id, [
                'store_id' => auth()->user()->current_store_id,
            ]);
        }

        if ($currentStore->products()->count() === 1) {
            User::find(auth()->id())->referral()->first()?->update([
                'store_product_added_at' => $currentStore->updated_at
            ]);
        }

        $geoData = request()->getUserLocation();

        app()->mixpanel->track('Product Created', [
            '$user_id' => auth()->id(),
            'store_id' => $currentStore->id,
            'product_id' => $product->id,
            'source' => request()->headers('Referer') ?? 'default',
            '$region' => $geoData['region'] ?? null,
            '$city' => $geoData['city'] ?? null,
            'mp_country_code' => $geoData['countryCode'] ?? null,
            '$country_code' => $geoData['countryCode'] ?? null,
        ]);

        return $product;
    }

    public function updateProduct(int $id)
    {
        $data = request()->try([
            'name',
            'description',
            'price',
            'images',
            'quantity',
            'quantity_items',
            'existing_images',
            'images_to_delete',
        ], false);

        $currentStore = StoreHelper::find();
        $product = $currentStore->products()->find($id);

        if (!empty($categories = request()->get('categories', false))) {
            $product->categories()->detach();

            foreach ($categories as $categoryData) {
                $category = $currentStore->categories()->where('title', $categoryData['value'])->first();

                if (!$category) {
                    $category = $currentStore->categories()->firstOrCreate(
                        ['title' => $categoryData['value']],
                        ['description' => $categoryData['label']]
                    );
                }

                $product->categories()->attach($category->id, [
                    'store_id' => auth()->user()->current_store_id,
                ]);
            }
        }

        $currentImages = [];

        if (isset($data['existing_images']) && !empty($data['existing_images'])) {
            $currentImages = json_decode($data['existing_images'], true);
        } elseif ($product->images) {
            try {
                $currentImages = json_decode($product->images, true);
            } catch (\Exception $e) {
                $currentImages = [];
            }
        }

        if (isset($data['images_to_delete']) && !empty($data['images_to_delete'])) {
            $currentImages = array_filter($currentImages, function ($image) use ($data) {
                return !in_array($image, $data['images_to_delete']);
            });
        }

        $uploadedImages = [];

        if (isset($data['images']) && !empty($data['images'])) {
            $uploads = request()->upload(
                'images',
                withBucket('products/' . auth()->user()->current_store_id),
                ['rename' => true]
            );

            if (!$uploads) {
                return false;
            }

            if (request()->get('images')) {
                $uploadedImages = array_map(
                    function ($item) {
                        return $item['url'];
                    },
                    $uploads
                );
            }
        }

        $allImages = array_merge($currentImages, $uploadedImages);
        $data['images'] = json_encode($allImages);

        unset($data['existing_images']);
        unset($data['images_to_delete']);

        $product->update($data);

        return $product;
    }

    /**
     * Destroy a product.
     * @param int $id
     */
    public function destroyProduct(Product $product)
    {
        $geoData = request()->getUserLocation();

        if ($product->purchases()->count() > 0) {
            $product->update(['status' => 'archived']);

            app()->mixpanel->track('Product Archived', [
                '$user_id' => auth()->id(),
                'store_id' => auth()->user()->current_store_id,
                'product_id' => $product->id,
                '$region' => $geoData['region'] ?? null,
                '$city' => $geoData['city'] ?? null,
                'mp_country_code' => $geoData['countryCode'] ?? null,
                '$country_code' => $geoData['countryCode'] ?? null,
            ]);

            return true;
        }

        // if ($product->images) {
        //     $images = json_decode($product->images, true);

        //     foreach ($images as $image) {
        //         storage()->delete(withBucket($image));
        //     }
        // }

        $success = $product->delete();

        if ($success) {
            app()->mixpanel->track('Product Deleted', [
                '$user_id' => auth()->id(),
                'store_id' => auth()->user()->current_store_id,
                'product_id' => $product->id,
                '$region' => $geoData['region'] ?? null,
                '$city' => $geoData['city'] ?? null,
                'mp_country_code' => $geoData['countryCode'] ?? null,
                '$country_code' => $geoData['countryCode'] ?? null,
            ]);
        }

        return $success;
    }
}
