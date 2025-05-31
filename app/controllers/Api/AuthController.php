<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;
use App\Mailers\UserMailer;

class AuthController extends Controller
{
    public function verify()
    {
        $email = request()->get('email');

        UserMailer::verification($email)
            ->send();

        return response()->json(['message' => 'Verification email sent']);
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Logout successful']);
    }
}
