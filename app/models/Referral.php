<?php

namespace App\Models;

class Referral extends Model
{
    protected $fillable = [
        'user_id',
        'referrer_id',
        'store_id',
        'store_created_at',
        'store_verified_at',
        'store_activated_at',
        'store_product_added_at',
        'store_first_order_at',
    ];

    public function referrer()
    {
        return $this->belongsTo(User::class, 'referrer_id');
    }

    public function referredUser()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function store()
    {
        return $this->belongsTo(Store::class, 'store_id');
    }
}
