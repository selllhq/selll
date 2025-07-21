<?php

namespace App\Services;

use App\Models\Referral;

class LoginService
{
    /**
     * Login with the given credentials.
     * @param bool $session
     * @return bool
     */
    public function login(bool $session = true): bool
    {
        $data = request()->validate([
            'email' => 'email',
            'password' => 'min:8',
        ]);

        if (!$data) {
            return false;
        }

        if (!$session) {
            auth()->config('session', false);
        }

        return auth()->login($data);
    }

    /**
     * Login with Google.
     * @return array
     */
    public function handleGoogleOAuth(bool $session = true): array
    {
        $token = auth()->client('google')->getAccessToken('authorization_code', [
            'code' => request()->get('code')
        ]);

        if (!$token) {
            return [
                'success' => false,
                'error' => 'Could not sign in with Google.',
            ];
        }

        if (!$session) {
            auth()->config('session', false);
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
            return [
                'success' => false,
                'error' => auth()->errors(),
            ];
        }

        if (tick(auth()->user()->created_at)->fromNow() === 'less than a minute ago') {
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

            app()->mixpanel->identify(auth()->id());
            app()->mixpanel->track('User Registered', [
                '$user_id' => auth()->id(),
                'email' => $user->getEmail(),
                'type' => 'google',
                'source' => request()->headers('Referer') ?? 'unknown',
            ]);
        }

        return ['success' => true];
    }
}
