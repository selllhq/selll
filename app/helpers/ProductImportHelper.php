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

        $dbPost = ProductImport::where('username', $instagramUrl);

        if ($dbPost->exists()) {
            return $dbPost->first();
        } else {
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

                $dbPost = ProductImport::create([
                    'import_id' => $body['data']['defaultDatasetId'],
                    'username' => $instagramUrl,
                    'data' => json_encode([]),
                ]);

                return $dbPost->first();
            } catch (\GuzzleHttp\Exception\RequestException $e) {
            } catch (\Exception $e) {
                error_log('Error importing instagram posts error: ' . $e->getMessage());
                return false;
            }
        }
    }

    /**
     * Fetch results from the Apify API
     */
    public static function fetchResults(string $runId)
    {
        $dbPost = ProductImport::where('import_id', $runId)->first();

        if ($dbPost->imported === true && !empty(json_decode($dbPost->data))) {
            return json_decode($dbPost->data, true);
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

            return $body;
        } catch (\GuzzleHttp\Exception\RequestException $e) {
        } catch (\Exception $e) {
            error_log('Error fetching instagram posts error: ' . $e->getMessage());
            return false;
        }
    }
}
