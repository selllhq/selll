import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Icon } from "@/components/shared/icon";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shared/avatar";
import Button from "@/components/form/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/layout/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/layout/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/shared/tooltip";
import { UserMenuContent } from "./user-menu-content";
import { cn, getInitials } from "@/utils";
import { useIsMobile } from "@/utils/use-mobile";
import { Link, usePage } from "@inertiajs/react";
import {
    AlertTriangle,
    BookOpen,
    ChevronsUpDown,
    HelpCircle,
    LayoutGrid,
    Menu,
    MessagesSquare,
    Paintbrush,
    ShoppingBasket,
    ShoppingCart,
    Users,
} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
    SidebarGroupContent,
} from "./sidebar";

const mainNavItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutGrid,
    },
    {
        title: "Products",
        url: "/products",
        icon: ShoppingBasket,
    },
    {
        title: "Orders",
        url: "/orders",
        icon: ShoppingCart,
    },
    {
        title: "Customers",
        url: "/customers",
        icon: Users,
    },
    // {
    //     title: "Invoices",
    //     url: "/invoices",
    //     icon: Mail,
    // },
    {
        title: "Customize Store",
        url: "/store/customize",
        icon: Paintbrush,
    },
];

const rightNavItems = [
    {
        title: "Feedback",
        url: "https://selll.canny.io/feature-requests",
        icon: MessagesSquare,
    },
    {
        title: "Help",
        url: "javascript:void(Tawk_API.toggle())",
        icon: HelpCircle,
        onClick: (e) => {
            e.preventDefault();
            window.Tawk_API?.toggle();
        },
    },
    {
        title: "Selll Docs",
        url: "https://selll.tawk.help",
        icon: BookOpen,
    },
];

const activeItemStyles =
    "text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100";

export function AppHeader({ breadcrumbs = [], variant = "header" }) {
    const page = usePage();

    const { auth, currentStore } = page.props;

    if (variant === "sidebar") {
        return <AppSidebar />;
    }

    const showPaymentSetupBanner = currentStore?.status === "sandbox";

    return (
        <>
            <div className="fixed top-0 z-50 w-full border-sidebar-border/80 border-b bg-background">
                <div className="mx-auto flex h-16 md:justify-between items-center px-4">
                    {/* Mobile Menu */}
                    <div className="lg:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mr-2 h-[34px] w-[34px]"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex h-full w-64 flex-col items-stretch justify-between bg-background"
                            >
                                <SheetTitle className="sr-only">
                                    Navigation Menu
                                </SheetTitle>
                                <SheetHeader className="flex justify-start text-left">
                                    <span className="flex items-center gap-2">
                                        <img
                                            src="https://zero.leafphp.dev/assets/img/logo.png"
                                            className="size-6 mr-4"
                                            alt=""
                                        />
                                        <span className="font-semibold">
                                            Selll
                                        </span>
                                        <small className="italic pr-2">
                                            by Leaf PHP
                                        </small>
                                    </span>
                                </SheetHeader>

                                <div className="mt-6 flex h-full flex-1 flex-col space-y-4">
                                    <div className="flex h-full flex-col justify-between text-sm">
                                        <div className="flex flex-col space-y-4">
                                            {mainNavItems.map((item) => (
                                                <Link
                                                    key={item.title}
                                                    href={item.url}
                                                    className="flex items-center space-x-2 font-medium"
                                                    prefetch
                                                >
                                                    {item.icon && (
                                                        <Icon
                                                            name={item.icon}
                                                            className="h-5 w-5"
                                                        />
                                                    )}
                                                    <span>{item.title}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="flex flex-col space-y-4">
                                            {rightNavItems.map((item) => (
                                                <a
                                                    key={item.title}
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center space-x-2 font-medium"
                                                    onClick={(e) => {
                                                        if (item.onClick) {
                                                            item.onClick(e);
                                                        }
                                                    }}
                                                >
                                                    {item.icon && (
                                                        <Icon
                                                            name={item.icon}
                                                            className="h-5 w-5"
                                                        />
                                                    )}
                                                    <span>{item.title}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                    <Link
                        href="/dashboard"
                        prefetch
                        className="flex items-center space-x-2"
                    >
                        <div className="dark:text-sidebar-primary-foreground flex items-center justify-center rounded-md">
                            <span className="flex items-center gap-2">
                                <img
                                    src="https://zero.leafphp.dev/assets/img/logo.png"
                                    className="size-6 mr-0"
                                    alt=""
                                />
                                <span className="font-semibold text-xl">
                                    Selll
                                </span>
                                <small className="italic pr-2">
                                    by Leaf PHP
                                </small>
                            </span>
                        </div>
                    </Link>

                    <div className="ml-6 hidden h-full items-center space-x-6 lg:flex">
                        <NavigationMenu className="flex h-full items-stretch">
                            <NavigationMenuList className="flex h-full items-stretch space-x-2">
                                {mainNavItems.map((item, index) => (
                                    <NavigationMenuItem
                                        key={index}
                                        className="relative flex h-full items-center"
                                    >
                                        {auth?.user?.current_store_id ||
                                        index == 0 ? (
                                            <Link
                                                href={item.url}
                                                className={cn(
                                                    navigationMenuTriggerStyle(),
                                                    page.url === item.url &&
                                                        activeItemStyles,
                                                    "h-9 cursor-pointer px-3",
                                                )}
                                            >
                                                {item.icon && (
                                                    <Icon
                                                        name={item.icon}
                                                        className="mr-2 h-4 w-4"
                                                    />
                                                )}
                                                {item.title}
                                            </Link>
                                        ) : (
                                            <span className="flex h-full items-center py-2 px-3 text-muted-foreground cursor-not-allowed">
                                                {item.icon && (
                                                    <Icon
                                                        name={item.icon}
                                                        className="mr-2 h-4 w-4"
                                                    />
                                                )}
                                                {item.title}
                                            </span>
                                        )}

                                        {page.url === item.url && (
                                            <div className="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                        )}
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center space-x-2 ml-auto md:ml-0">
                        <div className="relative flex items-center space-x-1">
                            {/* <Button
                                variant="ghost"
                                size="icon"
                                className="group h-9 w-9 cursor-pointer"
                            >
                                <Search className="!size-5 opacity-80 group-hover:opacity-100" />
                            </Button> */}
                            <div className="hidden lg:flex">
                                {rightNavItems.map((item) => (
                                    <TooltipProvider
                                        key={item.title}
                                        delayDuration={0}
                                    >
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group text-accent-foreground ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent p-0 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                                    onClick={(e) => {
                                                        if (item.onClick) {
                                                            item.onClick(e);
                                                        }
                                                    }}
                                                >
                                                    <span className="sr-only">
                                                        {item.title}
                                                    </span>
                                                    {item.icon && (
                                                        <Icon
                                                            name={item.icon}
                                                            className="size-5 opacity-80 group-hover:opacity-100"
                                                        />
                                                    )}
                                                </a>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{item.title}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))}
                            </div>
                        </div>

                        {auth?.user && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="size-10 rounded-full p-1"
                                    >
                                        <Avatar className="size-8 overflow-hidden rounded-full">
                                            <AvatarImage
                                                src={auth.user.avatar}
                                                alt={auth.user.name}
                                            />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-56"
                                    align="end"
                                >
                                    <UserMenuContent user={auth.user} />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>

                {breadcrumbs.length > 1 && (
                    <div className="border-t border-sidebar-border/70 flex w-full border-b">
                        <div className="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                            <Breadcrumbs breadcrumbs={breadcrumbs} />
                        </div>
                    </div>
                )}
            </div>

            {showPaymentSetupBanner && (
                <div
                    className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 fixed top-16 left-0 right-0 z-40 flex items-center justify-center space-x-2 shadow-md"
                    role="alert"
                >
                    <AlertTriangle className="h-3 w-3 text-yellow-600 flex-shrink-0" />
                    <p className="text-xs">
                        You need to add an account to receive your sales before
                        you start selling.{" "}
                        <Link
                            href="/payouts/setup"
                            className="font-bold underline hover:text-yellow-800"
                            prefetch
                        >
                            Set up payments now
                        </Link>
                    </p>
                </div>
            )}
        </>
    );
}

export function AppSidebar({ showEmail }) {
    const page = usePage();
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size="lg"
                            as={Link}
                            href="/dashboard"
                            prefetch
                        >
                            <span className="flex items-center gap-2">
                                <img
                                    src="https://zero.leafphp.dev/assets/img/logo.png"
                                    className="size-6"
                                    alt=""
                                />
                                <span className="font-semibold text-xl">
                                    Selll
                                </span>
                                <small className="italic pr-2">
                                    by Leaf PHP
                                </small>
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarGroup className="px-2 py-0">
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {mainNavItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    as={Link}
                                    href={item.url}
                                    isActive={item.url === page.url}
                                    prefetch
                                >
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
                <SidebarGroup
                    className={`group-data-[collapsible=icon]:p-0 mt-auto`}
                >
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {rightNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        as="a"
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100"
                                        onClick={(e) => {
                                            if (item.onClick) {
                                                item.onClick(e);
                                            }
                                        }}
                                    >
                                        {item.icon && (
                                            <Icon
                                                name={item.icon}
                                                className="h-5 w-5"
                                            />
                                        )}
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {page.props.auth?.user && (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="text-sidebar-accent-foreground data-[state=open]:bg-sidebar-accent group"
                                    >
                                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                            <AvatarImage
                                                src={
                                                    page.props.auth.user.avatar
                                                }
                                                alt={page.props.auth.user.name}
                                            />
                                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                                {getInitials(
                                                    page.props.auth.user.name,
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">
                                                {page.props.auth.user.name}
                                            </span>
                                            {showEmail && (
                                                <span className="text-muted-foreground truncate text-xs">
                                                    {page.props.auth.user.email}
                                                </span>
                                            )}
                                        </div>
                                        <ChevronsUpDown className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    align="end"
                                    side={
                                        isMobile
                                            ? "bottom"
                                            : state === "collapsed"
                                              ? "left"
                                              : "bottom"
                                    }
                                >
                                    <UserMenuContent
                                        user={page.props.auth?.user}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
