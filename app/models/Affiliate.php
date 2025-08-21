<?php

namespace App\Models;

class Affiliate extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'email',
        'type',
        'phone',
        'provider',
        'commission',
        'product_id',
        'account_code',
        'account_number',
        'account_identifier',
        'currency',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
