<?php

namespace App\Helpers;

class SMSHelper
{
    protected $data = [];
    protected $apiUrl;

    public function __construct($data = [])
    {
        $this->data = $data;
    }

    public static function write($data): SMSHelper
    {
        return new self($data);
    }

    /**
     * Use arkesel for sending SMS messages
     */
    public function withArkesel(): SMSHelper
    {
        $apiKey = $this->data['apiKey'] ?? _env('ARKESEL_API_KEY');
        $receiver = $this->data['recipient'] ?? null;
        $senderId = $this->data['senderId'] ?? 'Selll';
        $message = $this->data['message'] ?? null;

        if (!$apiKey) {
            throw new \InvalidArgumentException('API key is required for sending SMS.');
        }

        if (!$receiver) {
            throw new \InvalidArgumentException('Recipient phone number is required.');
        }

        if (!$message) {
            throw new \InvalidArgumentException('Message content is required.');
        }

        $message = urlencode($message);
        $receiver = urlencode($receiver);

        $this->apiUrl = "https://sms.arkesel.com/sms/api?action=send-sms&api_key=$apiKey&to=$receiver&from=$senderId&sms=$message";

        return $this;
    }

    /**
     * Send an SMS message.
     *
     * @return bool True on success, false on failure.
     */
    public function send(): bool
    {
        $client = new \GuzzleHttp\Client();

        try {
            $response = $client->get($this->apiUrl);
            $body = json_decode($response->getBody(), true);

            if (isset($body['status']) && $body['status'] === 'success') {
                return true;
            } else if (isset($body['code']) && $body['code'] === 'ok') {
                return true;
            } else {
                throw new \Exception('SMS sending failed: ' . ($body['message'] ?? 'Unknown error'));
            }
        } catch (\Exception $e) {
            error_log('SMS sending error: ' . $e->getMessage());
            return false;
        }
    }
}
