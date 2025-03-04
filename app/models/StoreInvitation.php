<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreInvitation extends Model
{
    public function store(): BelongsTo
    {
        return $this->belongsTo(Store::class);
    }
}
