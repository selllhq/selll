import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from "@/components/shared/dropdown-menu";
import { useMobileNavigation } from "@/utils/use-mobile";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shared/avatar";
import { Link } from "@inertiajs/react";
import { ArrowDownCircle, CreditCard, LogOut, PenBox, Settings } from "lucide-react";
import { getInitials } from "@/utils";

export function UserMenuContent({ user, showEmail = false }) {
    const cleanup = useMobileNavigation();

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">
                            {user.name}
                        </span>
                        {showEmail && (
                            <span className="text-muted-foreground truncate text-xs">
                                {user.email}
                            </span>
                        )}
                    </div>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <a
                        className="block w-full"
                        href="https://selll.canny.io/feature-requests"
                        as="button"
                        target="_blank"
                        onClick={cleanup}
                    >
                        <PenBox className="mr-2" />
                        Leave Feedback
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href="/dashboard/referrals"
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <CreditCard className="mr-2" />
                        Refer & Earn
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href="/payouts"
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <ArrowDownCircle className="mr-2" />
                        Your Payouts
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link
                        className="block w-full"
                        href="/settings/profile"
                        as="button"
                        prefetch
                        onClick={cleanup}
                    >
                        <Settings className="mr-2" />
                        Settings
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link
                    className="block w-full"
                    method="post"
                    href="/auth/logout"
                    as="button"
                    onClick={cleanup}
                >
                    <LogOut className="mr-2" />
                    Log out
                </Link>
            </DropdownMenuItem>
        </>
    );
}
