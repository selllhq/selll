<?php

namespace App\Models;

class ProductPurchase extends Model
{
    protected $fillable = [
        'customer_id',
        'product_id',
        'quantity'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
