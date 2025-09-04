<?php

namespace App\Controllers\Mobile;

/**
 * This is a base controller for the auth namespace
 */
class Controller extends \App\Controllers\Controller
{
    public function __middleware()
    {
        auth()->config('session', false);

        if (!auth()->user()) {
            response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);

            return false;
        }

        return true;
    }
}
