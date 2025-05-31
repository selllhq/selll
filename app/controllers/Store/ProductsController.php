<?php

namespace App\Controllers\Store;

use App\Models\Store;

class ProductsController extends Controller
{
    public function index()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        if (!$currentStore) {
            return response()->redirect('/store/new', 303);
        }

        response()->inertia('products/products', [
            'currentStore' => $currentStore,
            'orders' => $currentStore
                ->carts()
                ->with('customer')
                ->latest()
                ->get(),
            'products' => $currentStore
                ->products()
                ->withCount('purchases')
                ->get(),
        ]);
    }

    public function create()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/setup', [
            'currentStore' => $currentStore,
            'categories' => $currentStore->categories()->get(),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function store()
    {
        $data = request()->get([
            'name',
            'description',
            'price',
            'quantity',
            'quantity_items',
        ]);

        $uploads = request()->upload(
            'images',
            withBucket('products/' . auth()->user()->current_store_id),
            ['rename' => true]
        );

        if (!$uploads) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/products/create', 303);
        }

        $data['images'] = json_encode(array_map(
            function ($item) {
                return $item['url'];
            },
            $uploads
        ));

        $currentStore = Store::find(auth()->user()->current_store_id);
        $product = $currentStore->products()->create($data);

        foreach (request()->get('categories') as $categoryData) {
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

        return response()->redirect("/products/{$product->id}", 303);
    }

    public function show($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/product', [
            'currentStore' => $currentStore,
            'product' => $currentStore
                ->products()
                ->with('categories')
                ->find($id),
            'orders' => $currentStore
                ->carts()
                ->where('items', 'LIKE', "%\"id\":$id,%")
                ->with('customer')
                ->latest()
                ->get(),
        ]);
    }

    public function edit($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/edit', [
            'product' => $currentStore->products()->with('categories')->find($id),
            'currentStore' => $currentStore,
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function update($id)
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
        ]);

        $currentStore = Store::find(auth()->user()->current_store_id);
        $product = $currentStore->products()->find($id);

        if (!empty($categories = request()->get('categories'))) {
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

        if (isset($data['images'])) {
            $uploads = request()->upload(
                'images',
                withBucket('products/' . auth()->user()->current_store_id),
                ['rename' => true]
            );

            if (!$uploads) {
                return response()
                    ->withFlash('errors', request()->errors())
                    ->redirect("/products/{$product->id}/edit", 303);
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

        return response()->redirect("/products/{$product->id}", 303);
    }

    public function destroy($id)
    {
        $product = Store::find(auth()->user()->current_store_id)->products()->find($id);

        if (!$product) {
            return response()
                ->withFlash('errors', [
                    'product' => 'Product not found.',
                ])
                ->redirect('/products', 303);
        }

        if ($product->purchases()->count() > 0) {
            $product->update(['status' => 'archived']);

            return response()
                ->withFlash('success', 'Product archived successfully.')
                ->redirect('/products', 303);
        }

        // if ($product->images) {
        //     $images = json_decode($product->images, true);

        //     foreach ($images as $image) {
        //         storage()->delete(withBucket($image));
        //     }
        // }

        $product->delete();

        return response()
            ->withFlash('success', 'Product deleted successfully.')
            ->redirect('/products', 303);
    }
}
