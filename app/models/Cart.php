<?php

namespace App\Models;

class Cart extends Model
{
    protected $fillable = ['items', 'total', 'status'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
