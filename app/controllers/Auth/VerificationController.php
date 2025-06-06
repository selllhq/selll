<?php

namespace App\Controllers\Auth;

class VerificationController extends Controller
{
    public function show()
    {
        $currentUser = auth()->user();
        $token = request()->get('token');

        if (!$currentUser && !$token) {
            return response()->redirect('/auth/login', 303);
        }

        if ($currentUser?->isVerified()) {
            return response()->redirect('/dashboard', 303);
        }

        if ($token && ($currentUser = auth()->verifyToken($token))) {
            $currentUser?->verifyEmail();
            return response()->redirect('/dashboard', 303);
        }

        return response()->inertia('auth/verify', [
            'user' => $currentUser,
            'token' => $token,
        ]);
    }
}
