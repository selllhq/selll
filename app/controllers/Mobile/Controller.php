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

    public function __call($method, $args)
    {
        if (method_exists($this, '__middleware') && !in_array($method, $this->__skipMiddlewareFor() ?? [])) {
            $response = $this->__middleware();

            if ($response === false) {
                return;
            }
        }

        if (method_exists($this, $method)) {
            return call_user_func_array([$this, $method], $args);
        }

        throw new \BadMethodCallException("Method {$method} does not exist on " . static::class);
    }
}
