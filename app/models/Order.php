<?php

namespace App\Models;

class Order extends Model
{
    protected $fillable = [
        'store_id',
        'customer_id',
        'cart_id',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function products()
    {
        return $this->belongsTo(Product::class);
    }
}
