<?php

namespace App\Mailers;

use App\Models\User;

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

    /**
     * Create mail to follow up with store owners
     * @param mixed $user The store owner
     * @return \Leaf\Mail
     */
    public static function checkIn(User $user)
    {
        return mailer()->create([
            'subject' => "Let's help you get to your first sale",
            'body' => view('mail.store.check-in', [
                'name' => $user->name,
            ]),
            'recipientEmail' => $user->email,
            'recipientName' => $user->name,
            'senderName' => 'Michael from Selll',
            'senderEmail' => 'support@selll.online',
            'replyToEmail' => 'support@selll.online',
            'replyToName' => 'Selll Support',
        ]);
    }

    /**
     * Create mail for store when a new order is placed
     * @param mixed $email The email of the store owner
     * @param mixed $order The order details
     * @return \Leaf\Mail
     */
    public static function wrongOrder()
    {
        return mailer()->create([
            'subject' => "Apology for Incorrect Charge - We've Got It Covered",
            'body' => view('mail.store.wrong-order', [
                'storeOwnerName' => 'Survival King',
                'orderId' => 10,
            ]),
            'recipientEmail' => 'kingvival@gmail.com',
            'recipientName' => 'Survival King',
            'senderName' => 'Selll Receipts',
        ]);
    }
}
