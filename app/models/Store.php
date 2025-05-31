<?php

namespace App\Models;

class Store extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'logo',
        'status',
        'email',
        'phone',
        'address',
        'config',
        'currency',
        'estimated_sales_volume',
        'selling_journey_status',
        'product_types',
        'compliance',
        'payout_account_id',
        'customer_source',
    ];

    protected $hidden = [
        'estimated_sales_volume',
        'selling_journey_status',
        'compliance',
        'payout_account_id',
        'customer_source',
    ];

    /**
     * Get the owner of the team.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get all of the team's users including its owner.
     *
     * @return \Illuminate\Support\Collection
     */
    public function allUsers()
    {
        return $this->users->merge([$this->owner]);
    }

    /**
     * Get all of the users that belong to the team.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withTimestamps()
            ->as('membership');
    }

    /**
     * Get all customers of a store.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function customers()
    {
        return $this->hasMany(Customer::class);
    }

    /**
     * Get all categories of a store.
     */
    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    /**
     * Get all products of a store.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * Get all product purchases of a store.
     */
    public function productPurchases()
    {
        return $this->hasMany(ProductPurchase::class);
    }

    /**
     * Get all carts of a store.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function payouts()
    {
        return $this->hasMany(Payout::class);
    }

    public function wallets()
    {
        return $this->hasMany(Wallet::class);
    }
}
