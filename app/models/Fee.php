<?php

namespace App\Models;

class Fee extends Model
{
    protected $fillable = [
        'store_id',
        'rate',
        'remaining_transactions',
        'resets_at'
    ];
}
