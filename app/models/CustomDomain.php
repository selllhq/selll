<?php

namespace App\Models;

class CustomDomain extends Model
{
    protected $fillable = [
        'domain',
        'store_id',
        'is_primary',
    ];

    /**
     * Get the store associated with the custom domain.
     */
    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    /**
     * Check if the custom domain is primary.
     */
    public function isPrimary()
    {
        return $this->is_primary;
    }
}
