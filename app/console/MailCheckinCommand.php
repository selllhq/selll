<?php

namespace App\Console;

use Aloe\Command;

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
        $usersToMail = [
            55,
            50,
            69,
            58,
            57,
            81,
            51,
        ];

        foreach ($usersToMail as $userId) {
            $user = \App\Models\User::find($userId);

            if (!$user) {
                $this->error("User with ID $userId not found.");
                continue;
            }

            \App\Mailers\StoreMailer::checkIn($user)->send();

            $this->info("Check-in email sent to {$user->email}");

            sleep(1);
        }

        return 0;
    }
}
