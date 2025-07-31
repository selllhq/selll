<?php

namespace App\Helpers;

use App\Models\Customer;
use App\Models\Store;

class CustomerHelper
{
    public static function saveToStore(int $storeId, array $customer)
    {
        $store = Store::find($storeId);
        $customer = $store->customers()->where('email', $customer['email'])->firstOrCreate([
            'email' => $customer['email'],
        ], $customer);

        return $customer;
    }

    /**
     * Format phone number to international format.
     * @param string $phone
     * @param string $countryCode
     * @return string
     */
    public static function formatPhone($phone, $defaultCountryCode = '233')
    {
        $startsWithPlus = strpos($phone, '+') === 0;
        $digits = preg_replace('/\D+/', '', $phone);

        if ($startsWithPlus) {
            if (strpos($digits, $defaultCountryCode) === 0) {
                $rest = ltrim(substr($digits, strlen($defaultCountryCode)), '0');
                return "+$defaultCountryCode$rest";
            } else {
                return "+$digits";
            }
        }

        if (strpos($digits, $defaultCountryCode) === 0) {
            $rest = ltrim(substr($digits, strlen($defaultCountryCode)), '0');
            return "+$defaultCountryCode$rest";
        }

        if (strpos($digits, '0') === 0) {
            $digits = ltrim($digits, '0');
        }

        return "+$defaultCountryCode$digits";
    }

    public static function getCustomer(int $customerId)
    {
        return Customer::find($customerId);
    }

    public static function getCustomerByEmail(string $email)
    {
        return Customer::where('email', $email)->first();
    }
}
