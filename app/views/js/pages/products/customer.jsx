import Layout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/shared/card";
import {
    User,
    Mail,
    ShoppingCart,
    Calendar,
    MapPin,
    Phone,
    CheckCircle,
    XCircle,
    AlertCircle,
    CreditCard,
    Package,
    ShoppingBag,
    TrendingUp,
} from "lucide-react";
import dayjs from "dayjs";
import { formatCurrency } from "@/utils/store";
import { getInitials } from "@/utils";

export default function CustomerDetail({
    customer,
    currentStore,
    orders = [],
}) {
    const totalOrdersCount = orders.length;
    const totalSpent = orders
        .filter(
            (order) => order.status === "paid" || order.status === "completed",
        )
        .reduce((acc, order) => acc + Number(order.total), 0);

    const completedOrdersCount = orders.filter(
        (order) => order.status === "paid" || order.status === "completed",
    ).length;

    const lastOrderDate =
        orders.length > 0
            ? orders.sort(
                  (a, b) => new Date(b.created_at) - new Date(a.created_at),
              )[0].created_at
            : null;

    const averageOrderValue =
        completedOrdersCount > 0 ? totalSpent / completedOrdersCount : 0;

    const getOrderStatusIcon = (status) => {
        switch (status) {
            case "paid":
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "pending":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            case "cancelled":
                return <XCircle className="h-4 w-4 text-red-500" />;
            default:
                return <AlertCircle className="h-4 w-4 text-gray-500" />;
        }
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
                {
                    title: customer?.name || "Customer Details",
                    href: `/customers/${customer?.id}`,
                },
            ]}
        >
            <Head
                title={`${customer?.name || "Customer"} - Customer Details`}
            />

            <div className="md:mt-20">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="h-20 w-20 rounded-full bg-[#2C2C2C] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                            {getInitials(customer?.name)}
                        </div>

                        <div className="flex flex-col gap-2">
                            <h1 className="text-2xl font-bold">
                                {customer?.name || "Customer"}
                            </h1>
                            <div className="flex flex-col md:flex-row gap-4 text-sm">
                                {customer?.email && (
                                    <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-400">
                                            {customer.email}
                                        </span>
                                    </div>
                                )}

                                {customer?.phone && (
                                    <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-400">
                                            {customer.phone}
                                        </span>
                                    </div>
                                )}

                                {customer?.address && (
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-gray-500" />
                                        <span className="text-gray-400">
                                            {customer.address}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-primary-orange" />
                                <span className="text-gray-400">
                                    Customer since{" "}
                                    {dayjs(customer?.created_at).format(
                                        "MMM D, YYYY",
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-400">
                                            Total Spent
                                        </span>
                                        <span className="text-2xl font-bold text-primary-orange">
                                            {formatCurrency(
                                                totalSpent,
                                                currentStore?.currency,
                                            )}
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                                        <CreditCard className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-400">
                                            Total Orders
                                        </span>
                                        <span className="text-2xl font-bold">
                                            {totalOrdersCount}
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                                        <ShoppingBag className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-400">
                                            Completed Orders
                                        </span>
                                        <span className="text-2xl font-bold">
                                            {completedOrdersCount}
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm text-gray-400">
                                            Average Order
                                        </span>
                                        <span className="text-2xl font-bold">
                                            {formatCurrency(
                                                averageOrderValue,
                                                currentStore?.currency,
                                            )}
                                        </span>
                                    </div>
                                    <div className="h-10 w-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                                        <TrendingUp className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Customer orders */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingCart className="h-5 w-5 text-primary-orange" />
                                Order History
                            </CardTitle>
                            <CardDescription>
                                {orders.length === 0
                                    ? "This customer hasn't placed any orders yet."
                                    : `${orders.length} order${orders.length !== 1 ? "s" : ""} placed by this customer.`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {orders.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <ShoppingCart className="h-12 w-12 text-gray-600 mb-4" />
                                    <h3 className="text-lg font-medium mb-2">
                                        No Orders Yet
                                    </h3>
                                    <p className="text-sm text-gray-400 max-w-md">
                                        This customer hasn't placed any orders
                                        yet. When they do, they'll appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {orders
                                        .sort(
                                            (a, b) =>
                                                new Date(b.created_at) -
                                                new Date(a.created_at),
                                        )
                                        .map((order) => (
                                            <div
                                                key={order.id}
                                                className="border border-[#2C2C2C] bg-[#141414] text-white rounded-lg p-4"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                                                            <Package className="h-5 w-5 text-primary-orange" />
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h3 className="font-medium">
                                                                    Order #
                                                                    {order.id}
                                                                </h3>
                                                                <div className="flex items-center gap-1 bg-[#2C2C2C] px-2 py-0.5 rounded text-xs">
                                                                    {getOrderStatusIcon(
                                                                        order.status,
                                                                    )}
                                                                    <span className="capitalize">
                                                                        {
                                                                            order.status
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <p className="text-xs text-gray-400">
                                                                {dayjs(
                                                                    order.created_at,
                                                                ).format(
                                                                    "MMM D, YYYY [at] h:mm A",
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <div className="text-right">
                                                            <p className="text-sm text-gray-400">
                                                                Total
                                                            </p>
                                                            <p className="font-bold text-primary-orange">
                                                                {formatCurrency(
                                                                    order.total,
                                                                    currentStore?.currency,
                                                                )}
                                                            </p>
                                                        </div>

                                                        <Link
                                                            href={`/orders/${order.id}`}
                                                            className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white text-sm px-3 py-1.5 rounded transition-colors"
                                                        >
                                                            View Details
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary-orange" />
                                Contact Information
                            </CardTitle>
                            <CardDescription>
                                Detailed information about this customer.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                                        Personal Information
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Full Name
                                            </p>
                                            <p className="font-medium">
                                                {customer?.name ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Email Address
                                            </p>
                                            <p className="font-medium">
                                                {customer?.email ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Phone Number
                                            </p>
                                            <p className="font-medium">
                                                {customer?.phone ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                                        Shipping Address
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Address
                                            </p>
                                            <p className="font-medium">
                                                {customer?.address ||
                                                    "Not provided"}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Customer Since
                                            </p>
                                            <p className="font-medium">
                                                {dayjs(
                                                    customer?.created_at,
                                                ).format("MMMM D, YYYY")}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Last Order
                                            </p>
                                            <p className="font-medium">
                                                {lastOrderDate
                                                    ? `${dayjs(lastOrderDate).format("MMM D, YYYY")} (${dayjs(lastOrderDate).fromNow()})`
                                                    : "Never ordered"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
}
