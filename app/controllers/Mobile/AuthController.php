<?php

namespace App\Controllers\Mobile;

use App\Helpers\StoreHelper;
use App\Services\LoginService;

class AuthController extends Controller
{
    public function __middleware()
    {
        return true;
    }

    public function index()
    {
        $response = make(LoginService::class)->login(false);

        if (!$response) {
            return response()->json([
                'success' => false,
                'form' => request()->body(),
                'errors' => request()->errors(),
            ], 400);
        }

        response()->json(array_merge((array) auth()->data(), [
            'store' => StoreHelper::find(),
            'success' => true,
        ]), 200);
    }
}
