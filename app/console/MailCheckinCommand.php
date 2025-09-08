<?php

namespace App\Console;

use Aloe\Command;
use App\Helpers\SMSHelper;

class MailCheckinCommand extends Command
{
    protected static $defaultName = 'mail:checkin';
    public $description = 'mail:checkin command\'s description';
    public $help = 'mail:checkin command\'s help';

    /**
     * Main body for your command
     */
    protected function handle()
    {
        // foreach ($this->usersWithUnverifiedEmail() as $user) {
        //     \App\Mailers\StoreMailer::checkInForUnverifiedUsers($user)->send();
        //     $this->info("Check-in email sent to {$user->email}");

        //     // if ($store->email) {
        //     //     \App\Mailers\StoreMailer::checkInForNoProduct($store)->send();
        //     //     $this->info("Check-in email sent to {$store->email}");
        //     // }

        //     // if ($store->phone) {
        //     //     SMSHelper::write([
        //     //         'recipient' => $store->phone,
        //     //         'senderId' => 'Selll Team',
        //     //         'message' => "Hey {$store->name}! Your Selll store is ready but you haven't added any products yet. Other stores are already making sales - add yours now and start getting paid: selll.online/products/new",
        //     //     ])
        //     //         ->withArkesel()
        //     //         ->send();

        //     //     $this->info("Check-in SMS sent to {$store->phone}");
        //     // }

        //     sleep(1);
        // }
        dispatch(new \App\Jobs\StoreReportJob());

        $this->info('Check-in emails sent successfully!');

        return 0;
    }

    protected function usersWithUnverifiedEmail()
    {
        return \App\Models\User::where('email_verified_at', null)->get();
    }

    protected function storesWithoutProducts()
    {
        return \App\Models\Store::where('status', 'live')
            ->whereDoesntHave('products')
            ->get();
    }
}
