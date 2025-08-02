<?php

namespace App\Models;

class Paylink extends Model
{
    protected $fillable = [
        'store_id',
        'cart_id',
        'status',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function order()
    {
        return $this->belongsTo(Cart::class);
    }
}
