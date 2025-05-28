<?php

namespace App\Models;

class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
