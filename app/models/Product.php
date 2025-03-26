<?php

namespace App\Models;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'currency',
        'price',
        'quantity',
        'quantity_items',
        'images'
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function purchases()
    {
        return $this->hasMany(ProductPurchase::class);
    }
}
