<?php

namespace App\Models;

class ProductImport extends Model
{
    protected $connection = 'imports';

    protected $fillable = [
        'import_id',
        'username',
        'data',
        'imported',
        'transformed',
    ];
}
