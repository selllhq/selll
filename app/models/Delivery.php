<?php

namespace App\Models;

class Delivery extends Model
{
    protected $fillable = [
        'store_id',
        'cart_id',
        'customer_id',
        'partner',
        'price',
        'distance',
        'duration',
        'status',
        'tracking_id',
        'message',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function order()
    {
        return $this->belongsTo(Cart::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
