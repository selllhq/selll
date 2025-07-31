<?php

namespace App\Models;

class Paylink extends Model
{
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function order()
    {
        return $this->belongsTo(Cart::class);
    }
}
