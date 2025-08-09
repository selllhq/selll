<?php

namespace App\Models;

class Customer extends Model
{
    protected $fillable = ['name', 'email', 'phone', 'address', 'city', 'country', 'notes'];

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function shippingUpdates()
    {
        return $this->hasMany(DeliveryUpdate::class);
    }
}
