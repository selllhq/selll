<?php

namespace App\Mailers;

class UserMailer
{
    /**
     * Create verification mail for user who registered
     * @param mixed $email
     * @return \Leaf\Mail
     */
    public static function verification($email)
    {
        return mailer()->create([
            'subject' => 'Verify Email Address',
            'body' => view('mail.auth.verify', [
                'token' => auth()->user()->generateVerificationToken(
                    time() + 86400
                ),
            ]),
            'recipientEmail' => $email,
            'recipientName' => $email,
            'senderName' => 'Selll Team',
        ]);
    }

    /**
     * Create mail for user who received a waitlist invite
     * @param mixed $email
     * @param mixed $invite
     * @return \Leaf\Mail
     */
    public static function receivedWaitlistInvite($email, $invite)
    {
        return mailer()->create([
            'subject' => 'Your Selll invite is ready',
            'body' => view('mail.waitlist.invited', [
                'invite' => $invite,
            ]),
            'recipientEmail' => $email,
            'recipientName' => $email,
        ]);
    }
}
