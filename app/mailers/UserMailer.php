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
     * Create verification mail for user who registered
     * @param mixed $email
     * @return \Leaf\Mail
     */
    public static function shippingUpdate($order, $store, $message, $expectedDeliveryDate)
    {
        return mailer()->create([
            'subject' => "Update to your order on {$store->name}",
            'body' => view('mail.customer.shipping-update', [
                'order' => $order,
                'store' => $store,
                'message' => $message,
                'expectedDeliveryDate' => $expectedDeliveryDate,
            ]),
            'recipientEmail' => $order->customer->email,
            'recipientName' => $order->customer->name,
            'senderName' => $store->name,
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
