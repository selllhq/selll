<?php

namespace App\Models;

class Customer extends Model
{
    protected $fillable = ['name', 'email', 'phone'];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function cart()
    {
        return $this->hasOne(Cart::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
