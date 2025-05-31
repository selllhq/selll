<?php

namespace App\Models;

class ProductPurchase extends Model
{
    protected $fillable = [
        'customer_id',
        'product_id',
        'quantity',
        'amount',
        'currency',
        'cart_id',
        'store_id',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function customer()
    {
        return $this->belongsTo(User::class);
    }

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
