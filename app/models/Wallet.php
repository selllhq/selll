<?php

namespace App\Models;

class Wallet extends Model
{
    protected $fillable = [
        'type',
        'provider',
        'account_code',
        'account_number',
        'account_identifier',
        'currency',
        'verified_at',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class);
    }
}
