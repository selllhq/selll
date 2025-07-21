<?php

namespace App\Controllers\Auth;

use App\Mailers\UserMailer;
use App\Models\Referral;
use App\Services\LoginService;

class RegisterController extends Controller
{
    public function show()
    {
        $form = flash()->display('form') ?? [];

        response()->inertia('auth/register', array_merge($form, [
            'errors' => flash()->display('error') ?? [],
        ]));
    }

    public function google()
    {
        $data = [];

        if ($referralCode = request()->get('ref')) {
            $data = [
                'state' => json_encode([
                    'ref' => $referralCode,
                ]),
            ];
        }

        return response()->redirect(
            auth()->client('google')->getAuthorizationUrl($data)
        );
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

        if (!$success) {
            return response()
                ->withFlash('form', request()->body())
                ->withFlash('error', auth()->errors())
                ->redirect('/auth/register', 303);
        }

        if ($refCode = request()->get('ref')) {
            $referrer = auth()->verifyToken($refCode, 'referral');

            if ($referrer) {
                Referral::create([
                    'user_id' => auth()->id(),
                    'referrer_id' => $referrer->id(),
                ]);
            }
        }

        try {
            UserMailer::verification($credentials['email'])
                ->send();
        } catch (\Throwable $th) {
            throw $th;
        }

        app()->mixpanel->identify(auth()->id());
        app()->mixpanel->track('User Registered', [
            '$user_id' => auth()->id(),
            'email' => $credentials['email'],
            'type' => 'email',
            'source' => request()->headers('Referer') ?? 'unknown',
        ]);

        return response()->redirect('/dashboard', 303);
    }

    public function storeOAuth()
    {
        try {
            $response = make(LoginService::class)->handleGoogleOAuth();

            if (!$response['success']) {
                return response()
                    ->withFlash('error', $response['error'])
                    ->redirect('/auth/register', 303);
            }

            return response()->redirect('/dashboard', 303);
        } catch (\Throwable $th) {
            return response()
                ->withFlash('error', 'Could not sign in with Google.')
                ->redirect('/auth/register', 303);
        }
    }
}
