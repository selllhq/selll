import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
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
import {
    Package,
    ShoppingCart,
    Clock,
    CheckCircle,
    XCircle,
    User,
    Eye,
    Store,
    ShoppingBag,
    TrendingUp,
    Search,
} from "lucide-react";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import dayjs from "dayjs";

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
                return order.status === "cancelled";
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
            case "cancelled":
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-500">
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancelled
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
        <Layout
            variant="header"
            className="p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Orders",
                    href: "/orders",
                },
            ]}
        >
            <Head title="Orders" />

            <div>
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
                    <div className="space-y-8 py-4 px-4">
                        <div className="md:flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    Orders
                                </h2>
                                <p className="text-gray-400">
                                    Manage and track your store's orders
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    as={Link}
                                    href="/products"
                                    variant="outline"
                                    className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                >
                                    <Package className="h-4 w-4" />
                                    View Products
                                </Button>
                                <Button
                                    as={Link}
                                    href={`https://${currentStore?.slug}.selll.store`}
                                    className="bg-primary-orange hover:bg-primary-orange/90"
                                    target="_blank"
                                >
                                    <Store className="h-4 w-4" />
                                    View Store
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Total Orders</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <ShoppingCart className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {orders.length.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
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
                                            <span className="text-sm text-gray-500">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Total Revenue</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency:
                                                    currentStore?.currency ||
                                                    "USD",
                                            }).format(totalRevenue)}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
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
                                            <span className="text-sm text-gray-500">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Completed Orders</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <CheckCircle className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
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
                                        <div className="flex items-center gap-1 text-emerald-500">
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
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <ShoppingBag className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
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
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑ 4.3%
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                from last month
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
                                        className="pl-8 h-9 bg-[#141414] border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors w-full text-sm placeholder:text-gray-500"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <select
                                className="ml-6 h-9 bg-[#141414] border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors text-sm font-medium text-gray-400 px-2.5 appearance-none cursor-pointer min-w-[140px]"
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
                            <h3 className="text-lg font-medium text-white">
                                {filter === "all"
                                    ? "All Orders"
                                    : filter === "paid"
                                      ? "Paid Orders"
                                      : filter === "completed"
                                        ? "Completed Orders"
                                        : filter === "pending"
                                          ? "Pending Orders"
                                          : "Cancelled Orders"}{" "}
                                ({filteredOrders.length})
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
                            <div className="rounded-md border border-[#2C2C2C] overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-[#1A1A1A]">
                                        <TableRow className="hover:bg-[#1A1A1A] border-[#2C2C2C]">
                                            <TableHead className="text-white">
                                                Order
                                            </TableHead>
                                            <TableHead className="text-white">
                                                Customer
                                            </TableHead>
                                            <TableHead className="text-white">
                                                Products
                                            </TableHead>
                                            <TableHead className="text-white">
                                                Date
                                            </TableHead>
                                            <TableHead className="text-white">
                                                Status
                                            </TableHead>
                                            <TableHead className="text-white text-right">
                                                Total
                                            </TableHead>
                                            <TableHead className="text-white w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredOrders.map((order) => (
                                            <TableRow
                                                key={order.id}
                                                className="hover:bg-[#2C2C2C] border-[#2C2C2C] cursor-pointer"
                                                onClick={() =>
                                                    router.visit(
                                                        `/orders/${order.id}`,
                                                    )
                                                }
                                            >
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <div className="bg-[#1A1A1A] p-2 rounded-lg">
                                                            <ShoppingCart className="h-5 w-5 text-primary-orange" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-white">
                                                                Order #
                                                                {order.id}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4 text-gray-400" />
                                                        <span className="text-sm text-gray-300 truncate max-w-[150px]">
                                                            {order.customer
                                                                ?.name ||
                                                                "Anonymous Customer"}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                        {order.products
                                                            ?.slice(0, 2)
                                                            .map(
                                                                (
                                                                    product,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="bg-[#1A1A1A] rounded-md px-2 py-0.5 text-xs text-gray-300 truncate max-w-[100px]"
                                                                    >
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </div>
                                                                ),
                                                            )}
                                                        {order.products
                                                            ?.length > 2 && (
                                                            <div className="bg-[#1A1A1A] rounded-md px-2 py-0.5 text-xs text-gray-300">
                                                                +
                                                                {order.products
                                                                    .length -
                                                                    2}{" "}
                                                                more
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-400 mt-1">
                                                        {order.products
                                                            ?.length || 0}{" "}
                                                        {order.products
                                                            ?.length === 1
                                                            ? "product"
                                                            : "products"}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="text-sm text-gray-300">
                                                        {dayjs(
                                                            order.created_at,
                                                        ).format("MMM D, YYYY")}
                                                    </div>
                                                    <div className="text-xs text-gray-400">
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
                                                <TableCell>
                                                    {getStatusBadge(
                                                        order.status,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="font-bold text-white">
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
                                                    <div className="flex justify-center">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-gray-400 hover:text-white"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                router.visit(
                                                                    `/orders/${order.id}`,
                                                                );
                                                            }}
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
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
