<?php

namespace App\Models;

class User extends Model
{
    /**
     * The attributes that are mass assignable.
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Indicates if the model should be timestamped.
     * @var bool
     */
    public $timestamps = true;

    /**
     * The attributes that should be cast to native types.
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Determine if the given store is the current store.
     *
     * @param  mixed  $store
     * @return bool
     */
    public function isCurrentStore($store)
    {
        return $store->id === $this->currentStore->id;
    }

    /**
     * Get the current store of the user's context.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function currentStore()
    {
        if ($this->current_store_id === null && $this->id) {
            $this->switchStore($this->personalStore());
        }

        return $this->belongsTo(Store::class, 'current_store_id');
    }

    /**
     * Switch the user's context to the given store.
     *
     * @param  mixed  $store
     * @return bool
     */
    public function switchStore($store)
    {
        if (!$this->belongsToStore($store)) {
            return false;
        }

        $this->forceFill([
            'current_store_id' => $store->id,
        ])->save();

        $this->setRelation('currentStore', $store);

        return true;
    }

    /**
     * Get all of the stores the user owns or belongs to.
     *
     * @return \Illuminate\Support\Collection
     */
    public function allStores()
    {
        return $this->ownedStores->merge($this->stores)->sortBy('name');
    }

    /**
     * Get all of the stores the user owns.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function ownedStores()
    {
        return $this->hasMany(Store::class);
    }

    /**
     * Get all of the stores the user belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function stores()
    {
        return $this->belongsToMany(Store::class)
            // ->withPivot('role')
            ->withTimestamps()
            ->as('stores');
    }

    /**
     * Get the referral user joined with.
     */
    public function referral()
    {
        return $this->hasOne(Referral::class, 'user_id');
    }

    /**
     * Get the user's referral list.
     */
    public function referrals()
    {
        return $this->hasMany(Referral::class, 'referrer_id');
    }

    /**
     * Get the user's "personal" store.
     *
     * @return \App\Models\Store
     */
    public function personalStore()
    {
        return $this->ownedStores->where('personal_store', true)->first();
    }

    /**
     * Determine if the user owns the given store.
     *
     * @param  mixed  $store
     * @return bool
     */
    public function ownsStore($store)
    {
        if ($store === null) {
            return false;
        }

        return $this->id == $store->{$this->getForeignKey()};
    }

    /**
     * Determine if the user belongs to the given store.
     *
     * @param  mixed  $store
     * @return bool
     */
    public function belongsToStore($store)
    {
        if ($store === null) {
            return false;
        }

        return $this->ownsStore($store) || $this->stores->contains(function ($t) use ($store) {
            return $t->id === $store->id;
        });
    }

    /**
     * Get the role that the user has on the store.
     *
     * @param  mixed  $store
     */
    public function storeRole($store)
    {
        //
    }

    /**
     * Determine if the user has the given role on the given store.
     *
     * @param  mixed  $store
     * @param  string  $role
     * @return bool
     */
    public function hasStoreRole($store, string $role)
    {
        if ($this->ownsStore($store)) {
            return true;
        }

        return $this->belongsToStore($store) &&
            optional($this->storeRole($store))->name === $role;
    }

    /**
     * Get the user's permissions for the given store.
     *
     * @param  mixed  $store
     * @return array
     */
    public function storePermissions($store)
    {
        if ($this->ownsStore($store)) {
            return ['*'];
        }

        if (!$this->belongsToStore($store)) {
            return [];
        }

        return (array) optional($this->storeRole($store))->permissions;
    }

    /**
     * Determine if the user has the given permission on the given store.
     *
     * @param  mixed  $store
     * @param  string  $permission
     * @return bool
     */
    public function hasStorePermission($store, string $permission)
    {
        if ($this->ownsStore($store)) {
            return true;
        }

        if (!$this->belongsToStore($store)) {
            return false;
        }

        return false;

        // if (
        //     in_array(HasApiTokens::class, class_uses_recursive($this)) &&
        //     !$this->tokenCan($permission) &&
        //     $this->currentAccessToken() !== null
        // ) {
        //     return false;
        // }

        // $permissions = $this->storePermissions($store);

        // return in_array($permission, $permissions) ||
        //     in_array('*', $permissions) ||
        //     (Str::endsWith($permission, ':create') && in_array('*:create', $permissions)) ||
        //     (Str::endsWith($permission, ':update') && in_array('*:update', $permissions));
    }
}
