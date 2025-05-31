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
            'subject' => "Selll - New Order from {$order->customer->name}",
            'body' => view('mail.store.order', [
                'order' => $order,
                'isFirstOrder' => $order->store->carts()->count() === 1,
            ]),
            'recipientEmail' => $email,
            'recipientName' => $email,
            'senderName' => 'Selll Receipts',
        ]);
    }
}
