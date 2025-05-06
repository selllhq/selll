<?php

namespace App\Mailers;

class MarketingMailer
{
    /**
     * Create mail for user who joined the waitlist
     * @param mixed $email
     * @return \Leaf\Mail
     */
    public static function joinedWaitlist($email)
    {
        return mailer()->create([
            'subject' => 'You’re in! Welcome to Selll 🚀',
            'body' => view('mail.waitlist.joined'),
            'recipientEmail' => $email,
            'recipientName' => $email,
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
            'subject' => 'You’re in — your Selll invite is ready 🎉',
            'body' => view('mail.waitlist.invited', [
                'invite' => $invite,
            ]),
            'recipientEmail' => $email,
            'recipientName' => $email,
        ]);
    }
}
