<?php

namespace App\Helpers;

use App\Models\ProductImport;

class ProductImportHelper
{
    /**
     * Import products from instagram posts
     */
    public static function fromInstagram(string $instagramUrl)
    {
        $instagramUrl = trim($instagramUrl, '/');

        if (preg_match('/^@/', $instagramUrl)) {
            $instagramUrl = 'https://www.instagram.com/' . ltrim($instagramUrl, '@') . '/';
        } elseif (!preg_match('/^https?:\/\//', $instagramUrl)) {
            $instagramUrl = "https://www.instagram.com/$instagramUrl/";
        }

        if ($dbPost = ProductImport::where('username', $instagramUrl)->first()) {
            return $dbPost;
        }

        $client = new \GuzzleHttp\Client();

        try {
            $response = $client->post("https://api.apify.com/v2/acts/apify~instagram-scraper/runs", [
                'json' => [
                    'addParentData' => false,
                    'directUrls' => [
                        $instagramUrl,
                    ],
                    'enhanceUserSearchWithFacebookPage' => false,
                    'isUserReelFeedURL' => false,
                    'isUserTaggedFeedURL' => false,
                    'resultsLimit' => 30,
                    'resultsType' => 'posts',
                    'searchLimit' => 1,
                    'searchType' => 'hashtag',
                ],
                'headers' => [
                    'Authorization' => 'Bearer apify_api_GAMnXPuglW4KgTm4NcHRHrCDgnxiqm0KR5AU',
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            return ProductImport::create([
                'import_id' => $body['data']['defaultDatasetId'],
                'username' => $instagramUrl,
                'imported' => false,
                'transformed' => false,
                'data' => json_encode([]),
            ]);
        } catch (\GuzzleHttp\Exception\RequestException $e) {
        } catch (\Exception $e) {
            error_log('Error importing instagram posts error: ' . $e->getMessage());
            return false;
        }
    }

    /**
     * Fetch results from the Apify API
     */
    public static function fetchResults(string $runId)
    {
        $dbPost = ProductImport::where('import_id', $runId)->first();

        if ($dbPost->imported === true && !empty(json_decode($dbPost->data))) {
            return $dbPost;
        }

        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->get("https://api.apify.com/v2/datasets/$runId/items", [
                'headers' => [
                    'Authorization' => 'Bearer apify_api_GAMnXPuglW4KgTm4NcHRHrCDgnxiqm0KR5AU',
                ],
            ]);

            $body = json_decode($response->getBody(), true);

            $dbPost->data = json_encode($body);
            $dbPost->imported = true;
            $dbPost->save();

            return $dbPost;
        } catch (\GuzzleHttp\Exception\RequestException $e) {
        } catch (\Exception $e) {
            error_log('Error fetching instagram posts error: ' . $e->getMessage());
            return false;
        }
    }
}
