<?php

namespace App\Middleware;

use Leaf\Middleware;

class WaitlistMiddleware extends Middleware
{
    public function call()
    {
        $allowedPaths = [
            '/',
            '/pricing',
            '/privacy',
            '/terms',
            '/faqs',
            '/contact',
            '/auth/login',
            '/waitlist',
            '/admin/waitlist/invite',
            '/billing/webhook'
        ];

        $path = request()->getPathInfo();

        if (strpos($path, '/api/') === 0) {
            return;
        }

        if (
            !auth()->user() &&
            (!(
                ($inviteCode = request()->get('invite')) &&
                db()->select('waitlist_invites')->where('token', $inviteCode)->first()
            ) &&
                !in_array($path, $allowedPaths))
        ) {
            response()->redirect('/', 303);
        }
    }
}
