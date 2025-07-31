<?php

namespace App\Controllers\Store;

use App\Helpers\ProductImportHelper;
use App\Helpers\StoreHelper;
use App\Models\Store;
use App\Services\InventoryService;
use App\Services\OrdersService;

class LinksController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('links/links', [
            'currentStore' => $currentStore,
            'orders' => make(OrdersService::class)->getOrders($currentStore),
            'products' => make(InventoryService::class)->getProducts($currentStore),
        ]);
    }

    public function create()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('products/setup', [
            'currentStore' => $currentStore,
            'categories' => $currentStore->categories()->get(),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function import()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('products/import', [
            'currentStore' => $currentStore,
            'categories' => $currentStore->categories()->get(),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function importFromInstagram()
    {
        $username = request()->get('username');

        app()->mixpanel->track('Instagram Import', [
            'username' => $username,
            'source' => request()->headers('Referer') ?? 'unknown',
        ]);

        response()->json(ProductImportHelper::fromInstagram(
            $username,
        ) ?? []);
    }

    public function checkInstagramImport($request)
    {
        set_time_limit(0);

        $dbPost = ProductImportHelper::fetchResults($request);

        if (!$dbPost) {
            return response()->die(['errors' => 'Could not fetch import data.']);
        }

        $parsedData = [];

        if (
            $dbPost->transformed === false ||
            strpos($dbPost->data, 'cdninstagram.com') !== false ||
            strpos($dbPost->data, 'fbcdn.net') !== false
        ) {
            foreach (json_decode($dbPost->data, true) as $post) {
                if (count($post['images']) === 0) {
                    if (
                        strpos($post['displayUrl'], 'cdn1.selll.online') === false &&
                        (strpos($post['displayUrl'], 'cdninstagram.com') !== false ||
                            strpos($post['displayUrl'], 'fbcdn.net') !== false)
                    ) {
                        $post['displayUrl'] = storage()->createFile(
                            withBucket("imports/$request/display.jpg"),
                            $this->fetchRemoteImage($post['displayUrl']),
                            [
                                'rename' => true,
                                'recursive' => true,
                            ]
                        );

                        // if ($post['type'] === 'Video') {
                        //     $post['images'][] = $post['displayUrl'];
                        //     $post['images'][] = storage()->createFile(
                        //         withBucket("imports/$request/video.mp4"),
                        //         $this->fetchRemoteImage($post['videoUrl']),
                        //         [
                        //             'rename' => true,
                        //             'recursive' => true,
                        //         ]
                        //     );
                        // }
                    }
                } else {
                    $post['images'] = array_map(function ($image) use ($request) {
                        if ((strpos($image, 'cdninstagram.com') !== false || strpos($image, 'fbcdn.net') !== false) && strpos($image, 'cdn1.selll.online') === false) {
                            return storage()->createFile(
                                withBucket("imports/$request/display.jpg" . basename($image)),
                                $this->fetchRemoteImage($image),
                                [
                                    'rename' => true,
                                    'recursive' => true,
                                ]
                            );
                        }

                        return $image;
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

    protected function fetchRemoteImage($url)
    {
        $ch = curl_init($url);

        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_SSL_VERIFYPEER => true,
        ]);

        $data = curl_exec($ch);
        $error = curl_error($ch);

        curl_close($ch);

        if ($data === false) {
            throw new \Exception("Failed to fetch image: $error");
        }

        return $data;
    }

    public function store()
    {
        $product = make(InventoryService::class)
            ->createProduct();

        if (!$product) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/products/setup', 303);
        }

        return response()->redirect("/products/{$product->id}", 303);
    }

    public function storeFromImport()
    {
        $data = request()->get([
            'name',
            'description',
            'price',
            'quantity',
            'quantity_items',
            'images'
        ], false);

        $data['images'] = json_encode($data['images'] ?? []);
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

        $geoData = request()->getUserLocation();

        app()->mixpanel->track('Product Created', [
            '$user_id' => auth()->id(),
            'store_id' => $currentStore->id,
            'product_id' => $product->id,
            'source' => 'instagram_import',
            '$region' => $geoData['region'] ?? null,
            '$city' => $geoData['city'] ?? null,
            'mp_country_code' => $geoData['countryCode'] ?? null,
            '$country_code' => $geoData['countryCode'] ?? null,
        ]);

        return response()->redirect('/products/import', 303);
    }

    public function show($id)
    {
        $currentStore = StoreHelper::find();
        $product = make(InventoryService::class)->getProductById($id, $currentStore);

        response()->inertia('products/product', [
            'product' => $product,
            'currentStore' => $currentStore,
            'purchases' => $product->purchases()->get(),
            'views' => make(InventoryService::class)->getProductViews($id),
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
        $currentStore = StoreHelper::find();

        response()->inertia('products/edit', [
            'currentStore' => $currentStore,
            'product' => make(InventoryService::class)->getProductById($id, $currentStore),
            'errors' => flash()->display('errors') ?? [],
        ]);
    }

    public function update($id)
    {
        $product = make(InventoryService::class)
            ->updateProduct($id);

        if (!$product) {
            response()
                ->withFlash('errors', request()->errors())
                ->redirect("/products/{$product->id}/edit", 303);
        }

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

        make(InventoryService::class)->destroyProduct($product);

        return response()
            ->withFlash('success', 'Product disabled successfully.')
            ->redirect('/products', 303);
    }
}
