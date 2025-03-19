import Layout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
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
import dayjs from "dayjs";
import EmptyState from "@/components/layout/empty";
import {
    ArrowUpRight,
    Package,
    ShoppingCart,
    Store,
    TrendingUp,
    Users,
    Wallet,
} from "lucide-react";
import Button from "@/components/form/button";
import { BarChart, LineChart } from "@/components/shared/charts";

export default function Dashboard({
    auth,
    products = [],
    stores = [],
    currentStore,
    orders = [],
    revenue = 0,
    customers = [],
    revenueGraph = [],
}) {
    return (
        <Layout
            variant="sidebar"
            className="dark:bg-[#141414] p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Dashboard",
                    href: "/dashboard",
                },
            ]}
        >
            <Head title="Dashboard" />

            <div className="py-4 px-4">
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
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">
                                    Hello, {auth.user.name.split(" ")[0]}
                                </h2>
                                <p className="text-muted-foreground">
                                    Here's everything new with{" "}
                                    {currentStore?.name}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                    asChild
                                >
                                    <Link href="/products/new">
                                        Add Product
                                    </Link>
                                </Button>
                                <Button
                                    className="bg-primary-orange hover:bg-primary-orange/90"
                                    asChild
                                >
                                    <Link
                                        href={`https://${currentStore?.identifier}.selll.store`}
                                        target="_blank"
                                        className="flex items-center gap-2"
                                    >
                                        <Store className="h-4 w-4" />
                                        View Store
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {dayjs(currentStore?.created_at).isAfter(
                            dayjs().subtract(30, "minutes"),
                        ) && (
                            <div className="bg-primary-orange/10 text-primary-orange p-4 rounded-xl mb-4">
                                Your store was created just now. Get started by
                                <Link
                                    href="/products/new"
                                    className="font-medium underline mx-1"
                                >
                                    adding your first product
                                </Link>
                                .
                            </div>
                        )}

                        {currentStore?.config === null && (
                            <div className="bg-primary-orange/10 text-primary-orange p-4 rounded-xl">
                                Your store hasn't been customized yet.
                                <Link
                                    href="/store/customize"
                                    className="font-medium underline mx-1"
                                >
                                    Customize your store
                                </Link>
                                to match your brand.
                            </div>
                        )}

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Total Revenue</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <Wallet className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency:
                                                    currentStore?.currency,
                                            }).format(
                                                orders
                                                    .filter(
                                                        (order) =>
                                                            order.status ===
                                                            "paid",
                                                    )
                                                    .reduce(
                                                        (acc, order) =>
                                                            acc +
                                                            Number(order.total),
                                                        0,
                                                    ),
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
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
                                                                order.status ===
                                                                    "paid" &&
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
                                                            (acc, order) =>
                                                                acc +
                                                                Number(
                                                                    order.total,
                                                                ),
                                                            0,
                                                        ),
                                                )}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Products Sold</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <ShoppingCart className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {orders
                                                .reduce(
                                                    (acc, order) =>
                                                        acc +
                                                        (order.status === "paid"
                                                            ? 1
                                                            : 0),
                                                    0,
                                                )
                                                .toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑{" "}
                                                {orders
                                                    .filter(
                                                        (order) =>
                                                            order.status ===
                                                                "paid" &&
                                                            dayjs(
                                                                order.created_at,
                                                            ).isAfter(
                                                                dayjs().subtract(
                                                                    1,
                                                                    "month",
                                                                ),
                                                            ),
                                                    )
                                                    .reduce((acc) => acc + 1, 0)
                                                    .toLocaleString()}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Active Products</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <Package className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {products.length.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
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
                                            <span className="text-sm text-gray-500">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Total Customers</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <Users className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {customers.length.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑{" "}
                                                {customers
                                                    .filter((customer) =>
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
                                            <span className="text-sm text-gray-500">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-8">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Revenue Over Time</CardTitle>
                                    <CardDescription>
                                        Your store's revenue growth over the
                                        past months
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <LineChart data={revenueGraph} />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Recent Orders</CardTitle>
                                    <CardDescription>
                                        Latest {Math.min(orders.length, 5)}{" "}
                                        orders from your store
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {orders.slice(0, 5).map((order) => (
                                            <div
                                                className="flex items-center"
                                                key={order.id}
                                            >
                                                <Avatar className="h-9 w-9 ring-2 ring-primary-orange/20">
                                                    <AvatarImage
                                                        src={
                                                            order.customer
                                                                ?.avatar
                                                        }
                                                        alt="Avatar"
                                                    />
                                                    <AvatarFallback className="bg-primary-orange/10 text-primary-orange">
                                                        {order.customer.name
                                                            .split(" ")
                                                            .map((n) => n[0])
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4 space-y-1">
                                                    <p className="text-sm font-medium leading-none text-white">
                                                        {order.customer.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {dayjs(
                                                            order.created_at,
                                                        ).fromNow()}
                                                    </p>
                                                </div>
                                                <div className="ml-auto font-medium text-emerald-500">
                                                    +${order.total}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Top Products</CardTitle>
                                    <CardDescription>
                                        Your best selling products this month
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <BarChart
                                        data={products
                                            .slice(0, 5)
                                            .map((product) => ({
                                                name: product.name,
                                                total: product.sales || 0,
                                            }))}
                                    />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Quick Stats</CardTitle>
                                    <CardDescription>
                                        Key metrics from your store
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                                    <Store className="h-5 w-5 text-primary-orange" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        Store Views
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        1,234 views this month
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-emerald-500 text-sm font-medium">
                                                ↑ 12%
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                                    <TrendingUp className="h-5 w-5 text-primary-orange" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        Conversion Rate
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        3.2% this month
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-emerald-500 text-sm font-medium">
                                                ↑ 8%
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                                    <ArrowUpRight className="h-5 w-5 text-primary-orange" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">
                                                        Avg. Order Value
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        $
                                                        {(
                                                            revenue /
                                                                orders.length ||
                                                            0
                                                        ).toFixed(2)}{" "}
                                                        per order
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-emerald-500 text-sm font-medium">
                                                ↑ 15%
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
