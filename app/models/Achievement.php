<?php

namespace App\Models;

class Achievement extends Model
{
    public const FIRST_PRODUCT_ADDED = 'store.firstProductAdded';

    public static $achievements = [
        self::FIRST_PRODUCT_ADDED => [
            'title' => 'First Product Added',
            'description' => 'You have successfully added your first product to the store!',
            'icon' => '/assets/achievements/first-product-added.svg',
            'reward' => '1% off your next sale fee (3.95% -> 2.95%)',
            'points' => 10,
        ],
    ];

    protected $fillable = [
        'type',
        'points',
        'data',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
