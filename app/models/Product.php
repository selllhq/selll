<?php

namespace App\Models;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'quantity',
        'quantity_items',
        'images',
        'physical',
        'is_featured',
        'variants',
        'status'
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function purchases()
    {
        return $this->hasMany(ProductPurchase::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }
}
