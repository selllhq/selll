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

    public function google()
    {
        $referralCode = request()->get('ref');

        return response()->redirect(
            auth()->client('google')->getAuthorizationUrl([
                'state' => json_encode([
                    'ref' => $referralCode,
                ]),
            ])
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
            $token = auth()->client('google')->getAccessToken('authorization_code', [
                'code' => request()->get('code')
            ]);

            if (!$token) {
                return response()
                    ->withFlash('error', 'Could not sign in with Google.')
                    ->redirect('/auth/register', 303);
            }

            /**
             * @var \League\OAuth2\Client\Provider\GoogleUser $user
             */
            $user = auth()->client('google')->getResourceOwner($token);
            $success = auth()->fromOAuth([
                'token' => $token,
                'user' => [
                    'name' => $user->getName(),
                    'email' => $user->getEmail(),
                    'password' => 'GOOGLE_AUTH_PLACEHOLDER',
                    'email_verified_at' => tick()->format('Y-M-D H:i:s'),
                    'avatar' => $user->getAvatar() ?? null,
                ]
            ]);

            if (!$success) {
                return response()
                    ->withFlash('form', request()->body())
                    ->withFlash('error', auth()->errors())
                    ->redirect('/auth/register', 303);
            }

            $state = json_decode(request()->get('state', false) ?? '{}', true);

            if ($refCode = $state['ref'] ?? null) {
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
                    ->withFlash('error', auth()->errors())
                    ->redirect('/auth/register', 303);
            }

            app()->mixpanel->identify(auth()->id());
            app()->mixpanel->track('User Registered', [
                '$user_id' => auth()->id(),
                'email' => $user->getEmail(),
                'type' => 'google',
                'source' => request()->headers('Referer') ?? 'unknown',
            ]);

            return response()->redirect('/dashboard', 303);
        } catch (\Throwable $th) {
            return response()
                ->withFlash('error', 'Could not sign in with Google.')
                ->redirect('/auth/register', 303);
        }
    }
}
