import dayjs from "dayjs";
import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    ArrowUpRight,
    MousePointerClick,
    Package,
    Plus,
    ShoppingBasket,
    ShoppingCart,
    Store,
    TrendingUp,
    Users,
    Wallet,
    WalletCards,
} from "lucide-react";
import Layout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/shared/avatar";
import { cn } from "@/utils";
import Button from "@/components/form/button";
import EmptyState from "@/components/layout/empty";
import { BarChart, LineChart } from "@/components/shared/charts";
import CreatePaylink from "@/components/modals/create-paylink";
import UserProfile from "@/components/shared/user-profile";
import ShareStore from "@/components/modals/share-store";
import { PageHeader } from "@/components/layout/header";

export default function Dashboard({
    auth,
    products = [],
    productsSold = 0,
    stores = [],
    currentStore,
    orders = [],
    customers = [],
    paidOrders = [],
    revenueGraph = [],
    lowStockProducts = [],
    analytics,
    wallets,
}) {
    const [linkShared, setLinkShared] = useState(
        window.localStorage.getItem("store.linkShared") === "true",
    );

    const technicallyNewStore =
        products.length === 0 &&
        productsSold === 0 &&
        orders.length === 0 &&
        customers.length === 0;

    return (
        <Layout className="p-4 pt-2" breadcrumbs={[]}>
            <Head title="Dashboard" />

            <div className="py-2 px-4 md:py-4 md:px-8">
                {stores?.length === 0 ? (
                    <EmptyState
                        title="Welcome to Selll"
                        description="Create your first store and start selling in 2 minutes"
                        button={{
                            href: "/store/new",
                            text: "Create Store",
                        }}
                    />
                ) : (
                    <div className="space-y-6 pt-4">
                        <PageHeader
                            title={`Hello, ${auth.user.name.split(" ")[0]}`}
                            description={
                                technicallyNewStore
                                    ? "Welcome to your new shop on Selll"
                                    : "Let's make some sales today 🚀"
                            }
                        />
                        {technicallyNewStore ? (
                            <div className="flex flex-col justify-center items-center max-w-5xl w-full mx-auto text-center py-24">
                                <img
                                    src="/assets/img/dashboard/new.svg"
                                    alt=""
                                />
                                <h2 className="text-3xl mt-4 mb-2">
                                    <span className="hidden lg:inline">
                                        Hooray!
                                    </span>{" "}
                                    Your shop is live 🎉{" "}
                                </h2>
                                <p className="text-muted-foreground max-w-md">
                                    Your store is live, but the shelves are
                                    empty. Stock up now and you’ll be on your
                                    way to doubling your sales.
                                </p>
                                <div className="grid lg:grid-cols-3 gap-8 mt-10 text-left w-full">
                                    <Card
                                        className={cn(
                                            "rounded-3xl",
                                            wallets &&
                                                wallets.length > 0 &&
                                                "opacity-30 pointer-events-none !bg-[#2FB37C] [&_p,h3]:!text-white line-through hidden lg:block",
                                        )}
                                    >
                                        <CardContent>
                                            <div className="rounded-full size-10 bg-white flex items-center justify-center">
                                                <WalletCards className="size-6 text-primary-orange" />
                                            </div>
                                            <h3 className="mt-4 mb-2">
                                                Setup your <br /> payout wallet
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Add your payout wallet so we can
                                                send your earnings to you
                                                automatically
                                            </p>
                                            <Button
                                                as={Link}
                                                href="/settings/payouts"
                                                className="mt-4 bg-white/5 text-white hover:!text-black"
                                            >
                                                Setup Payouts{" "}
                                                <ArrowRight size={16} />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                    <Card
                                        className={cn(
                                            "rounded-3xl",
                                            linkShared &&
                                                "opacity-30 pointer-events-none !bg-[#2FB37C] [&>div>div]:bg-white [&_p,h3]:!text-white line-through hidden lg:block",
                                        )}
                                    >
                                        <CardContent>
                                            <div className="rounded-full size-10 bg-[#25BCAC]/10 flex items-center justify-center">
                                                <MousePointerClick className="size-6 text-[#2FB37C]" />
                                            </div>
                                            <h3 className="mt-4 mb-2">
                                                Share your <br /> store’s unique
                                                link
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Share your store’s link with
                                                your <br /> customers and get
                                                your first orders
                                            </p>
                                            <ShareStore
                                                store={currentStore}
                                                onShare={() => {
                                                    setLinkShared(true);
                                                    window.localStorage.setItem(
                                                        "store.linkShared",
                                                        "true",
                                                    );
                                                }}
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-3xl">
                                        <CardContent>
                                            <div className="rounded-full size-10 bg-[#5E74DF]/10 flex items-center justify-center">
                                                <ShoppingBasket className="size-6 text-[#5E74DF]" />
                                            </div>
                                            <h3 className="mt-4 mb-2">
                                                Stock up <br /> your first
                                                products
                                            </h3>
                                            <p className="text-sm text-muted-foreground">
                                                Empty shelves don’t sell. Upload
                                                your <br /> products now to
                                                start getting orders
                                            </p>
                                            <Button
                                                as={Link}
                                                href="/products/new"
                                                className="mt-4 bg-white/5 text-white hover:!text-black"
                                            >
                                                Stock up{" "}
                                                <ArrowRight size={16} />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-3 mt-2 lg:mt-12">
                                    <div className="flex items-center gap-2 flex-1 w-full">
                                        <Button
                                            as={Link}
                                            variant="outline"
                                            href="/products/new"
                                            className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C] hover:text-neutral-200 w-full md:w-auto"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Add Product
                                        </Button>
                                        <CreatePaylink store={currentStore} />
                                        <Button
                                            as="a"
                                            href={`https://${currentStore?.slug}.selll.store`}
                                            className="bg-primary-orange hover:bg-primary-orange/90 w-full md:w-auto hidden lg:flex"
                                            target="_blank"
                                        >
                                            <Store className="h-4 w-4" />
                                            View Store
                                        </Button>
                                    </div>

                                    <Button
                                        as="a"
                                        variant="link"
                                        className="w-auto p-0 md:w-auto gap-2 underline"
                                        href={`https://${currentStore?.slug}.selll.store`}
                                        target="_blank"
                                    >
                                        <Store className="h-4 w-4" />
                                        https://{currentStore?.slug}.selll.store
                                    </Button>
                                </div>

                                {(paidOrders.length > 0 ||
                                    lowStockProducts.length > 0) && (
                                    <div className="grid lg:grid-cols-2 gap-6 md:gap-4">
                                        {paidOrders.length > 0 && (
                                            <Card className="text-sm rounded-3xl border border-primary-orange/10">
                                                <CardHeader className="mb-4">
                                                    <CardTitle>
                                                        You have{" "}
                                                        {paidOrders.length}{" "}
                                                        {paidOrders.length === 1
                                                            ? "order"
                                                            : "orders"}{" "}
                                                        to process
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    {paidOrders.map((order) => (
                                                        <div
                                                            key={order.id}
                                                            className="flex gap-2 mt-2"
                                                        >
                                                            <Avatar className="h-8 w-8">
                                                                <AvatarImage
                                                                    src={
                                                                        order
                                                                            .customer
                                                                            ?.avatar
                                                                    }
                                                                    alt="Avatar"
                                                                />
                                                                <AvatarFallback className="bg-primary-orange/10 text-primary-orange">
                                                                    {order.customer.name
                                                                        .split(
                                                                            " ",
                                                                        )
                                                                        .map(
                                                                            (
                                                                                n,
                                                                            ) =>
                                                                                n[0],
                                                                        )
                                                                        .join(
                                                                            "",
                                                                        )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1">
                                                                <h4>
                                                                    {
                                                                        order
                                                                            .customer
                                                                            .name
                                                                    }
                                                                </h4>
                                                                <div className="font-medium text-emerald-500">
                                                                    {new Intl.NumberFormat(
                                                                        "en-US",
                                                                        {
                                                                            style: "currency",
                                                                            currency:
                                                                                currentStore?.currency,
                                                                        },
                                                                    ).format(
                                                                        order.total,
                                                                    )}
                                                                </div>
                                                                <span className="text-xs text-gray-500">
                                                                    {dayjs(
                                                                        order.created_at,
                                                                    ).fromNow()}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <Button
                                                                    as={Link}
                                                                    href={`/orders/${order.id}`}
                                                                    variant="outline"
                                                                    className="text-xs dark:bg-[#2C2C2C]"
                                                                >
                                                                    View Order
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                        )}

                                        {lowStockProducts.length > 0 && (
                                            <Card className="text-sm rounded-3xl border border-primary-red/10">
                                                <CardHeader className="mb-4">
                                                    <CardTitle>
                                                        {
                                                            lowStockProducts.length
                                                        }{" "}
                                                        {lowStockProducts.length ===
                                                        1
                                                            ? "product"
                                                            : "products"}{" "}
                                                        need restocking.
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    {lowStockProducts.map(
                                                        (product) => {
                                                            const image =
                                                                JSON.parse(
                                                                    product.images ||
                                                                        "[]",
                                                                )[0];

                                                            return (
                                                                <div
                                                                    key={
                                                                        product.id
                                                                    }
                                                                    className="flex items-center gap-2 mt-2"
                                                                >
                                                                    <Avatar className="h-8 w-8">
                                                                        <AvatarImage
                                                                            src={
                                                                                image
                                                                            }
                                                                            alt={
                                                                                product.name
                                                                            }
                                                                        />
                                                                        <AvatarFallback>
                                                                            {product.name[0].toUpperCase()}
                                                                        </AvatarFallback>
                                                                    </Avatar>
                                                                    <div className="flex-1">
                                                                        <h4>
                                                                            {
                                                                                product.name
                                                                            }
                                                                        </h4>
                                                                        <span className="text-xs text-gray-500">
                                                                            {
                                                                                product.quantity_items
                                                                            }{" "}
                                                                            items
                                                                            left
                                                                        </span>
                                                                    </div>
                                                                    <Button
                                                                        as={
                                                                            Link
                                                                        }
                                                                        href={`/products/${product.id}`}
                                                                        variant="outline"
                                                                        className="text-xs dark:bg-[#2C2C2C]"
                                                                    >
                                                                        Restock
                                                                    </Button>
                                                                </div>
                                                            );
                                                        },
                                                    )}
                                                </CardContent>
                                            </Card>
                                        )}
                                    </div>
                                )}

                                {dayjs(currentStore?.created_at).isAfter(
                                    dayjs().subtract(30, "minutes"),
                                ) &&
                                    products?.length === 0 && (
                                        <div className="bg-primary-orange/10 text-primary-orange p-4 rounded-xl mb-4">
                                            Your store’s all set up — now let’s{" "}
                                            <Link
                                                href="/products/new"
                                                className="font-medium underline mx-1"
                                            >
                                                add your first product
                                            </Link>{" "}
                                            and start selling!
                                        </div>
                                    )}

                                {currentStore?.config === null && (
                                    <div className="bg-primary-orange/10 text-primary-orange p-4 rounded-xl">
                                        Your store isn’t customized yet.{" "}
                                        <Link
                                            href="/store/customize"
                                            className="font-medium underline mx-1"
                                        >
                                            Make it yours
                                        </Link>
                                        by adding your branding and style.
                                    </div>
                                )}

                                <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
                                    <Card className="rounded-3xl">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                            <CardTitle>Your Sales</CardTitle>
                                            <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                                <Wallet className="h-5 w-5 text-primary-orange" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div>
                                                <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                                    {new Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "currency",
                                                            currency:
                                                                currentStore?.currency,
                                                        },
                                                    ).format(
                                                        orders.reduce(
                                                            (acc, order) =>
                                                                acc +
                                                                Number(
                                                                    order.total,
                                                                ),
                                                            0,
                                                        ),
                                                    )}
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-emerald-500">
                                                    <span className="text-sm">
                                                        ↑{" "}
                                                        {new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    currentStore?.currency,
                                                                minimumFractionDigits: 0,
                                                            },
                                                        ).format(
                                                            orders
                                                                .filter(
                                                                    (order) =>
                                                                        dayjs(
                                                                            order.created_at,
                                                                        ).isAfter(
                                                                            dayjs().subtract(
                                                                                1,
                                                                                "month",
                                                                            ),
                                                                        ),
                                                                )
                                                                .reduce(
                                                                    (
                                                                        acc,
                                                                        order,
                                                                    ) =>
                                                                        acc +
                                                                        Number(
                                                                            order.total,
                                                                        ),
                                                                    0,
                                                                ),
                                                        )}
                                                    </span>
                                                    <span className="text-sm text-gray-500 hidden sm:inline-block">
                                                        from last month
                                                    </span>
                                                    <span className="text-sm text-gray-500 sm:hidden">
                                                        this month
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-3xl">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                            <CardTitle>Products Sold</CardTitle>
                                            <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                                <ShoppingCart className="h-5 w-5 text-primary-orange" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div>
                                                <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                                    {productsSold.toLocaleString()}
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-emerald-500">
                                                    <span className="text-sm">
                                                        ↑{" "}
                                                        {orders
                                                            .filter((order) =>
                                                                dayjs(
                                                                    order.created_at,
                                                                ).isAfter(
                                                                    dayjs().subtract(
                                                                        1,
                                                                        "month",
                                                                    ),
                                                                ),
                                                            )
                                                            .reduce(
                                                                (acc) =>
                                                                    acc + 1,
                                                                0,
                                                            )
                                                            .toLocaleString()}
                                                    </span>
                                                    <span className="text-sm text-gray-500 hidden sm:inline-block">
                                                        from last month
                                                    </span>
                                                    <span className="text-sm text-gray-500 sm:hidden">
                                                        this month
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-3xl">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                            <CardTitle>
                                                Active Products
                                            </CardTitle>
                                            <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                                <Package className="h-5 w-5 text-primary-orange" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div>
                                                <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                                    {products.length.toLocaleString()}
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-emerald-500">
                                                    <span className="text-sm">
                                                        ↑{" "}
                                                        {products
                                                            .filter((product) =>
                                                                dayjs(
                                                                    product.created_at,
                                                                ).isAfter(
                                                                    dayjs().subtract(
                                                                        1,
                                                                        "month",
                                                                    ),
                                                                ),
                                                            )
                                                            .length.toLocaleString()}
                                                    </span>
                                                    <span className="text-sm text-gray-500 hidden sm:inline-block">
                                                        from last month
                                                    </span>
                                                    <span className="text-sm text-gray-500 sm:hidden">
                                                        this month
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-3xl">
                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                            <CardTitle>Customers</CardTitle>
                                            <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                                <Users className="h-5 w-5 text-primary-orange" />
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <div>
                                                <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                                    {customers.length.toLocaleString()}
                                                </div>
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-emerald-500">
                                                    <span className="text-sm">
                                                        ↑{" "}
                                                        {customers
                                                            .filter(
                                                                (customer) =>
                                                                    dayjs(
                                                                        customer.created_at,
                                                                    ).isAfter(
                                                                        dayjs().subtract(
                                                                            1,
                                                                            "month",
                                                                        ),
                                                                    ),
                                                            )
                                                            .length.toLocaleString()}
                                                    </span>
                                                    <span className="text-sm text-gray-500 hidden sm:inline-block">
                                                        from last month
                                                    </span>
                                                    <span className="text-sm text-gray-500 sm:hidden">
                                                        this month
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
                                    <Card
                                        className={cn(
                                            "rounded-3xl",
                                            paidOrders.length > 0
                                                ? "col-span-full"
                                                : "col-span-4",
                                        )}
                                    >
                                        <CardHeader>
                                            <CardTitle>
                                                Revenue Over Time
                                            </CardTitle>
                                            <CardDescription>
                                                Your store's revenue growth over
                                                the past months
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <LineChart
                                                currentStore={currentStore}
                                                data={revenueGraph}
                                            />
                                        </CardContent>
                                    </Card>

                                    {paidOrders.length === 0 && (
                                        <Card className="rounded-3xl col-span-4 md:col-span-3">
                                            <CardHeader>
                                                <CardTitle>
                                                    Recent Orders
                                                </CardTitle>
                                                <CardDescription>
                                                    Latest{" "}
                                                    {Math.min(orders.length, 5)}{" "}
                                                    orders from your store
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-6">
                                                    {orders
                                                        .slice(0, 5)
                                                        .map((order) => (
                                                            <div
                                                                className="flex items-center"
                                                                key={order.id}
                                                            >
                                                                <Avatar className="h-9 w-9 ring-2 ring-primary-orange/20">
                                                                    <AvatarImage
                                                                        src={
                                                                            order
                                                                                .customer
                                                                                ?.avatar
                                                                        }
                                                                        alt="Avatar"
                                                                    />
                                                                    <AvatarFallback className="bg-primary-orange/10 text-primary-orange">
                                                                        {order.customer.name
                                                                            .split(
                                                                                " ",
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    n,
                                                                                ) =>
                                                                                    n[0],
                                                                            )
                                                                            .join(
                                                                                "",
                                                                            )}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div className="ml-4 space-y-1">
                                                                    <p className="text-sm font-medium leading-none">
                                                                        {
                                                                            order
                                                                                .customer
                                                                                .name
                                                                        }
                                                                    </p>
                                                                    <p className="text-sm text-gray-500">
                                                                        {dayjs(
                                                                            order.created_at,
                                                                        ).fromNow()}
                                                                    </p>
                                                                </div>
                                                                <div className="ml-auto font-medium text-emerald-500">
                                                                    +
                                                                    {Intl.NumberFormat(
                                                                        "en-US",
                                                                        {
                                                                            style: "currency",
                                                                            currency:
                                                                                currentStore?.currency,
                                                                        },
                                                                    ).format(
                                                                        order.total,
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>

                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                                    <Card className="rounded-3xl col-span-4">
                                        <CardHeader>
                                            <CardTitle>Top Products</CardTitle>
                                            <CardDescription>
                                                Your best selling products this
                                                month
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <BarChart
                                                currentStore={currentStore}
                                                data={products
                                                    .slice(0, 5)
                                                    .map((product) => ({
                                                        name: product.name,
                                                        total:
                                                            product.purchases_count ||
                                                            0,
                                                    }))}
                                            />
                                        </CardContent>
                                    </Card>
                                    <Card className="rounded-3xl col-span-4 md:col-span-3">
                                        <CardHeader>
                                            <CardTitle>Quick Stats</CardTitle>
                                            <CardDescription>
                                                Key metrics from your store
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            {analytics ? (
                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                                                <Store className="h-5 w-5 text-primary-orange" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium dark:text-white">
                                                                    Store Views
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    <span className="text-primary font-bold">
                                                                        {analytics.views.toLocaleString()}
                                                                    </span>{" "}
                                                                    views this
                                                                    month
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {analytics.growth
                                                            .views && (
                                                            <>
                                                                {analytics
                                                                    .growth
                                                                    .views >
                                                                0 ? (
                                                                    <div className="text-emerald-500 text-sm font-medium">
                                                                        ↑{" "}
                                                                        {
                                                                            analytics
                                                                                .growth
                                                                                .views
                                                                        }
                                                                        %
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-red-500 text-sm font-medium">
                                                                        ↓{" "}
                                                                        {Math.abs(
                                                                            analytics
                                                                                .growth
                                                                                .views,
                                                                        )}
                                                                        %
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                                                <TrendingUp className="h-5 w-5 text-primary-orange" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium dark:text-white">
                                                                    Conversion
                                                                    Rate
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    <span className="text-primary font-bold">
                                                                        {analytics.conversionRate.toFixed(
                                                                            2,
                                                                        )}
                                                                        %
                                                                    </span>{" "}
                                                                    this month
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {analytics.growth
                                                            .conversionRate && (
                                                            <>
                                                                {analytics
                                                                    .growth
                                                                    .conversionRate >
                                                                0 ? (
                                                                    <div className="text-emerald-500 text-sm font-medium">
                                                                        ↑{" "}
                                                                        {
                                                                            analytics
                                                                                .growth
                                                                                .conversionRate
                                                                        }
                                                                        %
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-red-500 text-sm font-medium">
                                                                        ↓{" "}
                                                                        {Math.abs(
                                                                            analytics
                                                                                .growth
                                                                                .conversionRate,
                                                                        )}
                                                                        %
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                                                <ArrowUpRight className="h-5 w-5 text-primary-orange" />
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium dark:text-white">
                                                                    Avg. Order
                                                                    Value
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    <span className="text-primary font-bold">
                                                                        {new Intl.NumberFormat(
                                                                            "en-US",
                                                                            {
                                                                                style: "currency",
                                                                                currency:
                                                                                    currentStore?.currency,
                                                                            },
                                                                        ).format(
                                                                            analytics.averageOrderValue ??
                                                                                0,
                                                                        )}
                                                                    </span>{" "}
                                                                    per order
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {analytics.growth
                                                            .averageOrderValue && (
                                                            <>
                                                                {analytics
                                                                    .growth
                                                                    .averageOrderValue >
                                                                0 ? (
                                                                    <div className="text-emerald-500 text-sm font-medium">
                                                                        ↑{" "}
                                                                        {
                                                                            analytics
                                                                                .growth
                                                                                .averageOrderValue
                                                                        }
                                                                        %
                                                                    </div>
                                                                ) : (
                                                                    <div className="text-red-500 text-sm font-medium">
                                                                        ↓{" "}
                                                                        {Math.abs(
                                                                            analytics
                                                                                .growth
                                                                                .averageOrderValue,
                                                                        )}
                                                                        %
                                                                    </div>
                                                                )}
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    Could not load analytics
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
