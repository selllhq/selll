<?php

namespace App\Helpers;

use App\Models\Fee;

/**
 * Helper class to handle split of funds between Selll and stores
 * ---
 * Selll takes a 2% fee on all transactions, which is tracked in a table
 * called `fees`. The remaining 98% is then credited to the store's
 * wallet.
 */
class WalletHelper
{
    public static function splitFunds($amount, $storeId)
    {
        // Calculate the fee
        $fee = $amount * 0.02;

        // Calculate the amount to credit to the store
        $storeAmount = $amount - $fee;

        // update main transaction information
        // ...

        // Store the fee in the database
        Fee::create([
            'store_id' => $storeId,
            'transaction_id' => null, // Assuming you have a transaction ID to associate with this fee
            'amount' => $fee,
        ]);

        return [
            'store_amount' => $storeAmount,
            'fee' => $fee,
        ];
    }
}
