<?php

namespace App\Models;

class Analytics extends Model
{
    protected $connection = 'analytics';
    protected $table = 'analytics';

    protected $fillable = [
        'event',
        'page',
        'action_id',
        'store_id',
        'metadata',
        'user_ip',
        'user_location',
        'user_device',
        'internal_reference',
    ];
}
