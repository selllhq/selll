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

    public static function getCustomer(int $customerId)
    {
        return Customer::find($customerId);
    }

    public static function getCustomerByEmail(string $email)
    {
        return Customer::where('email', $email)->first();
    }
}
