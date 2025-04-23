<?php

namespace App\Controllers\Auth;

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
            'invite' => 'optional|string',
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

        // update waitlist with registration date
        if (isset($credentials['invite'])) {
            $decodedToken = (array) \Firebase\JWT\JWT::decode(
                $credentials['invite'],
                new \Firebase\JWT\Key(\Leaf\Auth\Config::get('token.secret') . '-waitlist', 'HS256')
            );

            if (isset($decodedToken['user.email'])) {
                if ($decodedToken['user.email'] !== $credentials['email']) {
                    return response()
                        ->withFlash('form', request()->body())
                        ->withFlash('error', ['email' => 'Email does not match the invite token.'])
                        ->redirect("/auth/register?invite={$credentials['invite']}", 303);
                }

                db()
                    ->update('waitlist_emails')
                    ->params([
                        'registered_at' => date('Y-m-d H:i:s'),
                    ])
                    ->where('email', $decodedToken['user.email'])
                    ->execute();

                db()->delete('waitlist_invites')
                    ->where('token', $credentials['invite'])
                    ->execute();
            }

            unset($credentials['invite']);
        }

        $success = auth()->register($credentials);

        if (!$success) {
            return response()
                ->withFlash('form', request()->body())
                ->withFlash('error', auth()->errors())
                ->redirect('/auth/register', 303);
        }

        return response()->redirect('/dashboard', 303);
    }
}
