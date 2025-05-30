<?php

namespace App\Models;

class Category extends Model
{
    protected $fillable = [
        'store_id',
        'title',
        'description',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
