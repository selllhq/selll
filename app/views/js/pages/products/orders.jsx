import dayjs from "dayjs";
import { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    Package,
    ShoppingCart,
    Clock,
    CheckCircle,
    XCircle,
    Store,
    ShoppingBag,
    TrendingUp,
    Search,
    Wallet,
} from "lucide-react";
import Layout from "@/layouts/app-layout";
import EmptyState from "@/components/layout/empty";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/shared/table";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import CreatePaylink from "@/components/modals/create-paylink";
import { PageHeader } from "@/components/layout/header";

export default function Orders({ orders = [], currentStore }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const totalRevenue = orders
        .filter(
            (order) => order.status === "paid" || order.status === "completed",
        )
        .reduce((acc, order) => acc + Number(order.total), 0);

    const filteredOrders = orders?.filter((order) => {
        const matchesSearch =
            order.id?.toString().includes(search) ||
            order.customer?.name
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            order.customer?.email
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            order.products?.some((product) =>
                product.name?.toLowerCase().includes(search.toLowerCase()),
            );

        if (!matchesSearch) {
            return false;
        }

        switch (filter) {
            case "paid":
                return order.status === "paid";
            case "completed":
                return order.status === "completed";
            case "pending":
                return order.status === "pending";
            case "cancelled":
            case "abandoned":
                return order.status === "cancelled";
            case "failed":
                return order.status === "failed";
            default:
                return true;
        }
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                    </span>
                );
            case "paid":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Paid
                    </span>
                );
            case "pending":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                    </span>
                );
            case "abandoned":
            case "cancelled":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancelled
                    </span>
                );
            case "failed":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                        <XCircle className="w-3 h-3 mr-1" />
                        Failed
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500">
                        Unknown
                    </span>
                );
        }
    };

    return (
        <Layout className="dark:bg-[#141414] p-4 pt-2">
            <Head title="Orders" />

            <div className="px-4 pt-6 pb-16 lg:pb-8 max-w-[calc(100vw-1rem)] lg:max-w-7xl mx-auto w-full">
                {orders?.length === 0 ? (
                    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                        <EmptyState
                            icon={ShoppingCart}
                            title="Waiting for orders..."
                            description="Your store is ready, share it with your customers to start selling."
                            button={{
                                text: "View Your Store",
                                icon: Store,
                                href: `https://${currentStore?.slug}.selll.store`,
                                className:
                                    "bg-primary-orange hover:bg-primary-orange/90",
                            }}
                        />
                    </div>
                ) : (
                    <div className="space-y-8 py-0 md:py-4 px-0 md:px-4">
                        <PageHeader
                            title="Orders"
                            description="Manage and track your store's orders"
                        />
                        <div className="flex items-center gap-3 mt-2 md:mt-0">
                            <Button
                                as={Link}
                                href="/products"
                                variant="outline"
                                className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C] hover:text-neutral-200 w-full md:w-auto"
                            >
                                <Package className="h-4 w-4" />
                                View Products
                            </Button>
                            <CreatePaylink store={currentStore} />
                            <Button
                                as="a"
                                href={`https://${currentStore?.slug}.selll.store`}
                                className="bg-primary-orange hover:bg-primary-orange/90 w-full md:w-auto hidden sm:flex"
                                target="_blank"
                            >
                                <Store className="h-4 w-4" />
                                View Store
                            </Button>
                        </div>

                        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mt-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Total Orders</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                        <ShoppingCart className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                            {orders.length.toLocaleString()}
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

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Total Revenue</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                        <TrendingUp className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency:
                                                    currentStore?.currency ||
                                                    "USD",
                                            }).format(totalRevenue)}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑{" "}
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency:
                                                            currentStore?.currency ||
                                                            "USD",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(
                                                    orders
                                                        .filter(
                                                            (order) =>
                                                                (order.status ===
                                                                    "paid" ||
                                                                    order.status ===
                                                                        "completed") &&
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

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Completed</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                        <CheckCircle className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                            {orders
                                                .filter(
                                                    (order) =>
                                                        order.status ===
                                                            "paid" ||
                                                        order.status ===
                                                            "completed",
                                                )
                                                .length.toLocaleString()}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                {Math.round(
                                                    (orders.filter(
                                                        (order) =>
                                                            order.status ===
                                                                "paid" ||
                                                            order.status ===
                                                                "completed",
                                                    ).length /
                                                        orders.length) *
                                                        100,
                                                )}
                                                %
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                completion rate
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Average Order</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg hidden sm:block">
                                        <ShoppingBag className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-xl sm:text-2xl md:text-4xl font-bold mb-2">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency:
                                                    currentStore?.currency ||
                                                    "USD",
                                            }).format(
                                                orders.filter(
                                                    (order) =>
                                                        order.status ===
                                                            "paid" ||
                                                        order.status ===
                                                            "completed",
                                                ).length > 0
                                                    ? totalRevenue /
                                                          orders.filter(
                                                              (order) =>
                                                                  order.status ===
                                                                      "paid" ||
                                                                  order.status ===
                                                                      "completed",
                                                          ).length
                                                    : 0,
                                            )}
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑ 4.3%
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

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <Input
                                        type="search"
                                        placeholder="Search orders by ID, customer, or product..."
                                        className="pl-8 h-9 bg-gray-100 dark:bg-[#141414] dark:border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors w-full text-sm dark:placeholder:text-gray-500"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <select
                                className="ml-6 h-9 bg-gray-100 dark:bg-[#141414] dark:border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors text-sm font-medium dark:text-gray-400 px-2.5 appearance-none cursor-pointer max-w-[150px]"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: `right 0.5rem center`,
                                    backgroundRepeat: `no-repeat`,
                                    backgroundSize: `1rem`,
                                    paddingRight: `2rem`,
                                }}
                            >
                                <option
                                    value="all"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    All Orders
                                </option>
                                <option
                                    value="paid"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    Paid Orders
                                </option>
                                <option
                                    value="completed"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    Completed Orders
                                </option>
                                <option
                                    value="pending"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    Pending Orders
                                </option>
                                <option
                                    value="cancelled"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    Cancelled Orders
                                </option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium capitalize">
                                {filter} Orders ({filteredOrders.length})
                            </h3>

                            <div className="text-sm text-gray-400">
                                {search && (
                                    <span>
                                        Found {filteredOrders.length}{" "}
                                        {filteredOrders.length === 1
                                            ? "order"
                                            : "orders"}{" "}
                                        matching "{search}"
                                    </span>
                                )}
                            </div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <EmptyState
                                icon={ShoppingCart}
                                title="No orders found"
                                description={
                                    search
                                        ? `No orders match your search "${search}"`
                                        : "Try adjusting your filters to find what you're looking for."
                                }
                                className="mt-6"
                            />
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-muted-foreground/15">
                                <Table>
                                    <TableHeader className="text-xs uppercase bg-gray-100 dark:bg-[#1A1A1A] dark:text-gray-400 border-b border-muted-foreground/15">
                                        <TableRow>
                                            <TableHead>Order</TableHead>
                                            <TableHead>Customer</TableHead>
                                            <TableHead>Total</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-white text-right">
                                                Order Date
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.map((order) => (
                                            <TableRow
                                                key={order.id}
                                                className="border-b border-muted-foreground/15 hover:bg-gray-100 hover:dark:bg-[#1A1A1A]/50 cursor-pointer"
                                                onClick={() =>
                                                    router.visit(
                                                        `/orders/${order.id}`,
                                                    )
                                                }
                                            >
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <p className="font-medium text">
                                                            Order #{order.id}
                                                        </p>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-sm text-muted-foreground truncate max-w-[150px]">
                                                        {order.customer?.name ||
                                                            "Anonymous Customer"}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-bold">
                                                        {new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    currentStore?.currency ||
                                                                    "USD",
                                                            },
                                                        ).format(order.total)}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        order.status,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="text-sm text-muted-foreground text-nowrap">
                                                        {dayjs(
                                                            order.created_at,
                                                        ).format(
                                                            "MMM D, YYYY",
                                                        )}{" "}
                                                        at{" "}
                                                        {dayjs(
                                                            order.created_at,
                                                        ).format("h:mm A")}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {dayjs(
                                                            order.created_at,
                                                        ).fromNow()}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
