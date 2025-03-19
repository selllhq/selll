<?php

namespace App\Models;

class Cart extends Model
{
    protected $fillable = ['store_id', 'items', 'total', 'status', 'store_url', 'billing_session_id'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
