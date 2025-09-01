import { getInitials } from "@/utils";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../layout/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "./dropdown-menu";
import { ChevronsUpDown, ShieldCheck } from "lucide-react";
import { UserMenuContent } from "../layout/user-menu-content";

const UserProfile = ({ auth }) => {
    return (
        <>
            {auth?.user && (
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group rounded-3xl h-14 md:h-16 p-0 md:p-2"
                                >
                                    <Avatar className="h-12 w-12 overflow-hidden rounded-full">
                                        <AvatarImage
                                            src={
                                                auth.user.avatar ||
                                                "https://api.dicebear.com/9.x/avataaars/svg?radius=50&backgroundColor=372115"
                                            }
                                            alt={auth.user.name}
                                        />
                                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                            {getInitials(auth.user.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="hidden lg:grid flex-1 text-left text-sm md:text-base leading-tight">
                                        <span className="truncate font-medium">
                                            {auth.user.name}
                                            <ChevronsUpDown className="ml-1 size-4 inline" />
                                        </span>
                                        <span className="text-primary-orange truncate text-sm flex items-center gap-1">
                                            <ShieldCheck className="size-4" />
                                            <span>Beginner</span>
                                        </span>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                align="end"
                                side="bottom"
                            >
                                <UserMenuContent user={auth?.user} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            )}
        </>
    );
};

export default UserProfile;
