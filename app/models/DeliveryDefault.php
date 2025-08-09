<?php

namespace App\Models;

class DeliveryDefault extends Model
{
    protected $fillable = [
        'store_id',
        'allow_pickups',
        'expected_delivery_days',
        'longitude',
        'latitude',
        'work_hours',
        'config',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
