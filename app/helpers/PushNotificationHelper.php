<?php
namespace App\Helpers;

class PushNotificationHelper
{
    public static function push($message, $title = null): bool
    {
        $client = new \GuzzleHttp\Client();
        $body = [
            'app_id' => _env('ONESIGNAL_APP_ID'),
            'included_segments' => ['Subscribed Users'],
            'contents' => [
                'en' => $message,
            ],
        ];

        if ($title) {
            $body['headings'] = ['en' => $title];
        }

        try {
            $response = $client->request('POST', 'https://api.onesignal.com/notifications?c=push', [
                'body' => json_encode($body),
                'headers' => [
                    'Authorization' => 'Key ' . _env('ONESIGNAL_API_KEY'),
                    'accept' => 'application/json',
                    'content-type' => 'application/json',
                ],
            ]);
        } catch (\GuzzleHttp\Exception\RequestException $e) {
            // Handle the exception
            error_log('Push notification failed: ' . $e->getMessage());
            return false;
        }

        if ($response->getStatusCode() === 200) {
            $responseBody = json_decode($response->getBody(), true);

            if (isset($responseBody['id'])) {
                return true;
            }
        }

        return false;
    }
}
