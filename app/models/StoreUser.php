<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class StoreUser extends Pivot
{
    /**
     * The table associated with the pivot model.
     *
     * @var string
     */
    protected $table = 'store_users';
}
