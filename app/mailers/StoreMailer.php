<?php

namespace App\Mailers;

class StoreMailer
{
    /**
     * Create mail for store when a new order is placed
     * @param mixed $email The email of the store owner
     * @param mixed $order The order details
     * @return \Leaf\Mail
     */
    public static function newOrder($email, $order)
    {
        return mailer()->create([
            'subject' => 'Welcome to Selll',
            'body' => view('mail.store.new-order', [
                'order' => $order,
            ]),
            'recipientEmail' => $email,
            'recipientName' => $email,
        ]);
    }
}
