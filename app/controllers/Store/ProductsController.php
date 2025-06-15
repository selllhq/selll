<?php

namespace App\Controllers\Store;

use App\Helpers\ProductImportHelper;
use App\Models\ProductImport;
use App\Models\Store;
use App\Models\User;

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
                ->with('purchases')
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

    public function import()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/import', [
            'currentStore' => $currentStore,
            'categories' => $currentStore->categories()->get(),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function importFromInstagram()
    {
        $username = request()->get('username');

        response()->json(ProductImportHelper::fromInstagram(
            $username,
        ) ?? []);
    }

    public function checkInstagramImport($request)
    {
        $data = ProductImportHelper::fetchResults($request);

        if (isset($data['error'])) {
            return response()->die(['errors' => $data['error']]);
        }

        $parsedData = [];

        $dbPost = ProductImport::where('import_id', $request)->get()->first();

        if (!$dbPost->transformed) {
            set_time_limit(0);

            foreach ($data as $post) {
                if (count($post['images']) === 0) {
                    $post['displayUrl'] = storage()->createFile(
                        withBucket("products/$request/display.jpg"),
                        file_get_contents($post['displayUrl']),
                        [
                            'rename' => true,
                            'recursive' => true,
                        ]
                    );
                } else {
                    $post['images'] = array_map(function ($image) use ($request) {
                        return storage()->createFile(
                            withBucket("products/$request/image.jpg"),
                            file_get_contents($image),
                            [
                                'rename' => true,
                                'recursive' => true,
                            ]
                        );
                    }, $post['images']);

                    $post['displayUrl'] = $post['images'][0];
                }

                $parsedData[] = $post;
            }

            $dbPost->data = json_encode($parsedData);
            $dbPost->transformed = true;
            $dbPost->save();
        } else {
            $parsedData = json_decode($dbPost->data, true);
        }

        return response()->json($parsedData);
    }

    public function store()
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
            'purchases' => $currentStore
                ->products()
                ->find($id)
                ->purchases()
                ->get(),
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
        ], false);

        $currentStore = Store::find(auth()->user()->current_store_id);
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
