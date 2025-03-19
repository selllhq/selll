<?php

namespace App\Models;

class Customer extends Model
{
    protected $fillable = ['name', 'email', 'phone'];

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
