<?php

namespace App\Controllers\Auth;

use App\Services\LoginService;

class LoginController extends Controller
{
    public function show()
    {
        $form = flash()->display('form') ?? [];

        response()->inertia('auth/login', array_merge($form, [
            'errors' => flash()->display('error') ?? [],
        ]));
    }

    public function store()
    {
        $response = make(LoginService::class)->login();

        if (!$response) {
            return response()
                ->withFlash('form', request()->body())
                ->withFlash('error', request()->errors())
                ->redirect('/auth/login', 303);
        }

        response()->redirect('/dashboard', 303);
    }

    public function logout()
    {
        auth()->logout(function () {
            response()->redirect('/auth/login', 303);
        });
    }
}
