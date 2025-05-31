<?php

namespace App\Mailers;

class StoreMailer
{
    /**
     * Create welcome mail for store when they sign up
     */
    public static function welcome($user, $store)
    {
        return mailer()->create([
            'subject' => "Welcome to Selll, {$store->name}!",
            'body' => view('mail.store.welcome', [
                'name' => $user->name,
                'storeName' => $store->name,
            ]),
            'recipientEmail' => $user->email,
            'recipientName' => $store->name,
            'senderName' => 'Ashley from Selll',
        ]);
    }

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
