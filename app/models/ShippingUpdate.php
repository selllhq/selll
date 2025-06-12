<?php

namespace App\Models;

class ShippingUpdate extends Model
{
    protected $fillable = [
        'cart_id',
        'customer_id',
        'store_id',
        'tracking_id',
        'message',
        'shipping_method',
        'carrier',
        'status',
        'estimated_delivery_date',
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
