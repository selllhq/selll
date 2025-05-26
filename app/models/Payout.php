<?php

namespace App\Models;

class Payout extends Model
{
    protected $fillable = [
        'wallet_id',
        'store_id',
        'amount',
        'currency',
        'status',
        'selll_fee',
        'selll_fee_amount',
        'payment_fee',
        'payment_fee_amount',
        'payment_provider',
    ];

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
