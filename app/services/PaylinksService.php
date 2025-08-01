<?php

namespace App\Services;

use App\Helpers\CustomerHelper;
use App\Helpers\StoreHelper;
use App\Models\Product;
use App\Models\Store;

class PaylinksService
{
    /**
     * Get all store paylinks.
     * @param Store $store
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getLinks(Store $store)
    {
        return $store
            ->payLinks()
            ->with('order')
            ->get();
    }

    /**
     * Get product by ID.
     * @param int $id
     */
    public function getLinkById(int $id, Store $store)
    {
        return $store
            ->payLinks()
            ->with('order')
            ->find($id);
    }

    /**
     * Get Link by Cart ID.
     * @param int $id
     */
    public function getLinkByCartId(int $id, Store $store)
    {
        return $store
            ->payLinks()
            ->where('cart_id', $id)
            ->first();
    }

    public function createLink()
    {
        $data = request()->get([
            'customer_id',
            'customer',
            'products',
            'amount',
        ]);

        $store = StoreHelper::find();
        $total = 0.00;
        $customer = null;
        $items = [];

        if ($data['customer_id'] !== "") {
            $customer = $store->customers()->find((int) $data['customer_id']);
        } else {
            $customer = $store->customers()
                ->where(function ($query) use ($data) {
                    if (preg_match('/^\d{10,15}$/', $data['customer'])) {
                        $data['customer'] = '+' . $data['customer'];
                    }

                    $query->where('email', $data['customer'])
                        ->orWhere('phone', CustomerHelper::formatPhone($data['customer']));
                })
                ->first();

            if (!$customer) {
                $customer = $store->customers()->create([
                    'name' => 'Paylink Customer',
                    'email' => $data['customer'],
                    'store_id' => auth()->user()->current_store_id,
                ]);
            }
        }

        if ($data['amount'] !== "") {
            $items[] = [
                'id' => null,
                'item' => 'Custom Order',
                'amount' => $data['amount'] * 100,
                'quantity' => 1,
            ];

            $total = (float) $data['amount'];
        } else {
            foreach ($data['products'] as $productData) {
                $product = Product::find($productData['id']);

                if ($product) {
                    $items[] = [
                        'id' => $product->id,
                        'item' => $product->name,
                        'amount' => $product->price * 100,
                        'quantity' => $productData['quantity'] ?? 1,
                    ];

                    $total += $product->price * ($productData['quantity'] ?? 1);
                }
            }
        }

        $cart = $customer->carts()->create([
            'total' => $total,
            'store_id' => $store->id,
            'items' => json_encode($items),
            'currency' => $store->currency,
            'store_url' => "https://{$store->slug}.selll.store",
            'status' => 'pending',
        ]);

        return $store->payLinks()->create([
            'cart_id' => $cart->id,
            'status' => 'pending',
        ]);
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
