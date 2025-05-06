<?php

namespace App\Mailers;

class MarketingMailer
{
    /**
     * Create mail for user who joined the waitlist
     * @param mixed $user
     * @return \Leaf\Mail
     */
    public static function joinedWaitlist($email)
    {
        return mailer()->create([
            'subject' => 'MarketingMailer Test',
            'body' => view('mail.waitlist.joined'),
            'recipientEmail' => $email,
            'recipientName' => $email,
            'senderName' => _env('MAIL_SENDER_NAME'),
            'senderEmail' => _env('MAIL_SENDER_EMAIL'),
        ]);
    }

    /**
     * Create mail for user who received a waitlist invite
     * @param mixed $user
     * @param mixed $invite
     * @return \Leaf\Mail
     */
    public static function receivedWaitlistInvite($user, $invite)
    {
        return mailer()->create([
            'subject' => 'MarketingMailer Test',
            'body' => view('mail.waitlist.invited', [
                'name' => $user->name,
                'invite' => $invite,
            ]),
            'recipientEmail' => $user->email,
            'recipientName' => $user->name,
            'senderName' => _env('MAIL_SENDER_NAME'),
            'senderEmail' => _env('MAIL_SENDER_EMAIL'),
        ]);
    }
}
