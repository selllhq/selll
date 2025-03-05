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
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
