import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import EmptyState from "@/components/layout/empty";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/shared/card";
import {
    Users,
    User,
    Mail,
    ShoppingBag,
    TrendingUp,
    Store,
    Package,
    Search,
    ShoppingCart,
    Calendar,
    MapPin,
    Phone,
    Clock
} from "lucide-react";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import dayjs from "dayjs";

export default function Customers({ auth, customers = [], currentStore, orders = [] }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    // Calculate customer metrics
    const totalSpent = orders
        .filter(order => order.status === "paid")
        .reduce((acc, order) => acc + Number(order.total), 0);

    const averageSpentPerCustomer = customers.length > 0
        ? totalSpent / customers.length
        : 0;

    const filteredCustomers = customers?.filter((customer) => {
        const matchesSearch =
            customer.name?.toLowerCase().includes(search.toLowerCase()) ||
            customer.email?.toLowerCase().includes(search.toLowerCase()) ||
            customer.phone?.includes(search) ||
            customer.address?.toLowerCase().includes(search.toLowerCase());

        if (!matchesSearch) {
            return false;
        }

        // Get customer's orders
        const customerOrders = orders.filter(order => order.customer_id === customer.id);
        const totalOrdersCount = customerOrders.length;
        const completedOrdersCount = customerOrders.filter(order => order.status === "paid").length;

        switch (filter) {
            case "repeat":
                return totalOrdersCount > 1;
            case "single":
                return totalOrdersCount === 1;
            case "no_purchase":
                return totalOrdersCount === 0;
            case "high_value":
                // Customers who have spent more than average
                return customerOrders
                    .filter(order => order.status === "paid")
                    .reduce((acc, order) => acc + Number(order.total), 0) > averageSpentPerCustomer;
            default:
                return true;
        }
    });

    // Get customer's order stats
    const getCustomerStats = (customerId) => {
        const customerOrders = orders.filter(order => order.customer_id === customerId);
        const totalOrdersCount = customerOrders.length;
        const completedOrdersCount = customerOrders.filter(order => order.status === "paid").length;
        const totalSpent = customerOrders
            .filter(order => order.status === "paid")
            .reduce((acc, order) => acc + Number(order.total), 0);
        const lastOrderDate = customerOrders.length > 0
            ? customerOrders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0].created_at
            : null;

        return {
            totalOrdersCount,
            completedOrdersCount,
            totalSpent,
            lastOrderDate
        };
    };

    return (
        <Layout
            variant="header"
            className="p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Customers",
                    href: "/customers",
                },
            ]}
        >
            <Head title="Customers" />

            <div>
                {customers?.length === 0 ? (
                    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                        <EmptyState
                            icon={Users}
                            title="No customers yet"
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
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    Customers
                                </h2>
                                <p className="text-gray-400">
                                    Manage and track your store's customers
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    variant="outline"
                                    className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                    asChild
                                >
                                    <Link
                                        href="/orders"
                                        className="flex items-center gap-2"
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                        View Orders
                                    </Link>
                                </Button>
                                <Button
                                    className="bg-primary-orange hover:bg-primary-orange/90"
                                    asChild
                                >
                                    <Link
                                        href={`https://${currentStore?.slug}.selll.store`}
                                        target="_blank"
                                        className="flex items-center gap-2"
                                    >
                                        <Store className="h-4 w-4" />
                                        View Store
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
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
                                                    currentStore?.currency || "USD",
                                            }).format(totalSpent)}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑{" "}
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency:
                                                            currentStore?.currency || "USD",
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
                                    <CardTitle>Repeat Customers</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <ShoppingBag className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {customers
                                                .filter(customer => {
                                                    const customerOrders = orders.filter(order => order.customer_id === customer.id);
                                                    return customerOrders.length > 1;
                                                })
                                                .length
                                                .toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                {Math.round((customers.filter(customer => {
                                                    const customerOrders = orders.filter(order => order.customer_id === customer.id);
                                                    return customerOrders.length > 1;
                                                }).length / customers.length) * 100)}%
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                of all customers
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Average Spend</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <User className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency:
                                                    currentStore?.currency || "USD",
                                            }).format(averageSpentPerCustomer)}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑ 5.2%
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
                                        placeholder="Search customers by name, email, or address..."
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
                                    All Customers
                                </option>
                                <option
                                    value="repeat"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    Repeat Customers
                                </option>
                                <option
                                    value="single"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    One-time Customers
                                </option>
                                <option
                                    value="high_value"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    High-value Customers
                                </option>
                                <option
                                    value="no_purchase"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    No Purchases
                                </option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-white">
                                {filter === "all"
                                    ? "All Customers"
                                    : filter === "repeat"
                                      ? "Repeat Customers"
                                      : filter === "single"
                                        ? "One-time Customers"
                                        : filter === "high_value"
                                          ? "High-value Customers"
                                          : "Customers with No Purchases"}{" "}
                                ({filteredCustomers.length})
                            </h3>

                            <div className="text-sm text-gray-400">
                                {search && (
                                    <span>
                                        Found {filteredCustomers.length}{" "}
                                        {filteredCustomers.length === 1
                                            ? "customer"
                                            : "customers"}{" "}
                                        matching "{search}"
                                    </span>
                                )}
                            </div>
                        </div>

                        {filteredCustomers.length === 0 ? (
                            <EmptyState
                                icon={Users}
                                title="No customers found"
                                description={
                                    search
                                        ? `No customers match your search "${search}"`
                                        : "Try adjusting your filters to find what you're looking for."
                                }
                                className="mt-6"
                            />
                        ) : (
                            <div className="space-y-4">
                                {filteredCustomers.map((customer) => {
                                    const stats = getCustomerStats(customer.id);

                                    return (
                                        <div
                                            key={customer.id}
                                            className="bg-[#1A1A1A] rounded-lg overflow-hidden cursor-pointer hover:bg-[#1A1A1A]/90 transition-colors"
                                            onClick={() =>
                                                router.visit(
                                                    `/customers/${customer.id}`,
                                                )
                                            }
                                        >
                                            <div className="px-5 py-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-md bg-[#2C2C2C] flex items-center justify-center text-primary-orange font-medium text-lg flex-shrink-0">
                                                            {customer.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <h3 className="text-base font-medium text-white">
                                                                {customer.name}
                                                            </h3>
                                                            <p className="text-xs text-gray-400">
                                                                Customer since {dayjs(customer.created_at).format("MMM D, YYYY")}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-lg font-bold text-primary-orange">
                                                        {new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    currentStore?.currency || "USD",
                                                            },
                                                        ).format(stats.totalSpent)}
                                                    </div>
                                                </div>

                                                <div className="mt-3">
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                                        <span className="text-xs text-gray-400 truncate">
                                                            {customer.email || "No email provided"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center gap-1">
                                                        <div className="flex items-center gap-1">
                                                            <ShoppingCart className="h-4 w-4 text-primary-orange" />
                                                            <span className="text-xs text-white">Orders</span>
                                                        </div>
                                                        <div className="bg-[#2C2C2C] rounded-md px-2 py-0.5 text-xs font-medium text-white">
                                                            {stats.totalOrdersCount}
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4 text-primary-orange" />
                                                        <span className="text-xs text-white">Last Order</span>
                                                        <div className="bg-[#2C2C2C] rounded-md px-2 py-0.5 text-xs font-medium text-white">
                                                            {stats.lastOrderDate
                                                                ? dayjs(stats.lastOrderDate).fromNow()
                                                                : "Never"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
