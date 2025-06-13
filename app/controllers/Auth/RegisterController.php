<?php

namespace App\Controllers\Auth;

use App\Mailers\UserMailer;
use App\Models\Referral;

class RegisterController extends Controller
{
    public function show()
    {
        $form = flash()->display('form') ?? [];

        response()->inertia('auth/register', array_merge($form, [
            'errors' => flash()->display('error') ?? [],
        ]));
    }

    public function store()
    {
        $credentials = request()->validate([
            'name' => 'string',
            'email' => 'email',
            'password' => 'min:8',
            'confirmPassword*' => 'matchesValueOf:password',
        ]);

        if (!$credentials) {
            return response()
                ->withFlash('form', request()->body())
                ->withFlash('error', request()->errors())
                ->redirect('/auth/register', 303);
        }

        $success = auth()->register($credentials);

        if ($refCode = request()->get('ref')) {
            $referrer = auth()->verifyToken($refCode, 'referral');

            if ($referrer) {
                Referral::create([
                    'user_id' => auth()->id(),
                    'referrer_id' => $referrer->id(),
                ]);
            }
        }

        if (!$success) {
            return response()
                ->withFlash('form', request()->body())
                ->withFlash('error', auth()->errors())
                ->redirect('/auth/register', 303);
        }

        try {
            UserMailer::verification($credentials['email'])
                ->send();
        } catch (\Throwable $th) {
            throw $th;
        }

        return response()->redirect('/dashboard', 303);
    }
}
