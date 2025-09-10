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
    /**
     * Get billing account data for a store transaction
     * @param array{store: \App\Models\Store, total: float} $data
     * @return array
     */
    public static function getBillingAccountData($data)
    {
        $store = $data['store'];
        $amount = $data['total'];
        $affiliate = $data['affiliate'] ?? null;

        $feeRecord = $store->fee()->first();
        $storePayoutWallet = $store->wallets()->find($store->payout_account_id);

        $billingData = !$affiliate ? [
            'subaccount' => $storePayoutWallet->account_code,
            'bearer' => 'subaccount',
        ] : [
            'split' => [
                'type' => 'flat',
                'bearer_type' => 'subaccount',
                'bearer_subaccount' => $affiliate->account_code,
                'subaccounts' => [
                    [
                        'subaccount' => $affiliate->account_code,
                        'share' => (($affiliate->commission * $affiliate->quantity) * 100),
                    ],
                    [
                        'subaccount' => $storePayoutWallet->account_code,
                        'share' => ($amount * 100) * 0.97,
                    ],
                ],
            ],
        ];

        if (!$feeRecord) {
            return $billingData;
        }

        if (
            ($feeRecord->remaining_transactions !== null && (int) $feeRecord->remaining_transactions === 0) ||
            ($feeRecord->resets_at !== null && $feeRecord->resets_at < date('Y-m-d H:i:s'))
        ) {
            $feeRecord->delete();
            return $billingData;
        }

        return !$affiliate ? [
            'subaccount' => $storePayoutWallet->account_code,
            'bearer' => 'subaccount',
            'transaction_charge' => ($amount * ((float) $feeRecord->rate)) * 100,
        ] : [
            'split' => [
                'type' => 'flat',
                'bearer_type' => 'subaccount',
                'bearer_subaccount' => $affiliate->account_code,
                'subaccounts' => [
                    [
                        'subaccount' => $affiliate->account_code,
                        'share' => (($affiliate->commission * $affiliate->quantity) * 100),
                    ],
                    [
                        'subaccount' => $storePayoutWallet->account_code,
                        'share' => ($amount * (1 - ((float) $feeRecord->rate))) * 100,
                    ],
                ],
            ],
        ];
    }

    public static function afterTransaction($store)
    {
        $feeRecord = $store->fee()->first();

        if (!$feeRecord) {
            return 0.02;
        }

        $fee = $feeRecord->rate;

        if ($feeRecord->remaining_transactions !== null) {
            $feeRecord->remaining_transactions = (int) $feeRecord->remaining_transactions - 1;
            $feeRecord->save();
        }

        return (float) $fee;
    }
}
