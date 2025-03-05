<?php

namespace App\Models;

class Customer extends Model
{
    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
