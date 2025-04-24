import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/shared/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/shared/table";
import {
    ShoppingBag,
    ShoppingCart,
    ArrowLeft,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Package,
    CreditCard,
    Download,
    Printer,
} from "lucide-react";
import Button from "@/components/form/button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function Order({ auth, order, currentStore }) {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currentStore?.currency || "USD",
        }).format(amount);
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case "paid":
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/10 text-emerald-500">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Paid
                    </div>
                );
            case "pending":
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-500/10 text-amber-500">
                        <Clock className="w-4 h-4 mr-2" />
                        Pending
                    </div>
                );
            case "cancelled":
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-500/10 text-red-500">
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancelled
                    </div>
                );
            default:
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-500/10 text-gray-500">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Unknown
                    </div>
                );
        }
    };

    // Calculate order summary
    const orderItems = order?.items || [];
    const subtotal = orderItems.reduce((acc, item) => {
        const price = item.product?.price || 0;
        const quantity = item.quantity || 1;
        return acc + price * quantity;
    }, 0);

    // Get customer initials for avatar
    const getInitials = (name = "?") => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .toUpperCase()
            .substring(0, 2);
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
                {
                    title: `Order #${order?.id}`,
                    href: `/orders/${order?.id}`,
                },
            ]}
        >
            <Head title={`Order #${order?.id} - Order Details`} />

            <div className="md:mt-20">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#1A1A1A] p-3 rounded-lg">
                                <ShoppingCart className="h-6 w-6 text-primary-orange" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">
                                    Order #{order?.id}
                                </h1>
                                <p className="text-sm text-gray-400">
                                    Placed on{" "}
                                    {dayjs(order?.created_at).format(
                                        "MMMM D, YYYY [at] h:mm A",
                                    )}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                            {getStatusBadge(order?.status)}

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                >
                                    <Printer className="h-4 w-4 mr-2" />
                                    Print
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                >
                                    <Download className="h-4 w-4 mr-2" />
                                    Export
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Package className="h-5 w-5 text-primary-orange" />
                                        Order Items
                                    </CardTitle>
                                    <CardDescription>
                                        {orderItems.length}{" "}
                                        {orderItems.length === 1
                                            ? "item"
                                            : "items"}{" "}
                                        in this order
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="rounded-md border border-[#2C2C2C] overflow-hidden">
                                        <Table>
                                            <TableHeader className="bg-[#1A1A1A]">
                                                <TableRow className="hover:bg-[#1A1A1A] border-[#2C2C2C]">
                                                    <TableHead className="text-white">
                                                        Product
                                                    </TableHead>
                                                    <TableHead className="text-white text-right">
                                                        Price
                                                    </TableHead>
                                                    <TableHead className="text-white text-center">
                                                        Quantity
                                                    </TableHead>
                                                    <TableHead className="text-white text-right">
                                                        Total
                                                    </TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {orderItems.map(
                                                    (item, index) => {
                                                        const product =
                                                            item.product || {};
                                                        const price =
                                                            product.price || 0;
                                                        const quantity =
                                                            item.quantity || 1;
                                                        const total =
                                                            price * quantity;

                                                        return (
                                                            <TableRow
                                                                key={index}
                                                                className="hover:bg-[#1A1A1A] border-[#2C2C2C]"
                                                            >
                                                                <TableCell>
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="h-12 w-12 rounded-md bg-[#2C2C2C] flex items-center justify-center overflow-hidden">
                                                                            {product.images &&
                                                                            product
                                                                                .images
                                                                                .length >
                                                                                0 ? (
                                                                                <img
                                                                                    src={
                                                                                        product
                                                                                            .images[0]
                                                                                    }
                                                                                    alt={
                                                                                        product.name
                                                                                    }
                                                                                    className="h-full w-full object-cover"
                                                                                />
                                                                            ) : (
                                                                                <Package className="h-6 w-6 text-gray-500" />
                                                                            )}
                                                                        </div>
                                                                        <div>
                                                                            <p className="font-medium text-white">
                                                                                {
                                                                                    product.name
                                                                                }
                                                                            </p>
                                                                            {product.description && (
                                                                                <p className="text-xs text-gray-400 line-clamp-1">
                                                                                    {
                                                                                        product.description
                                                                                    }
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </TableCell>
                                                                <TableCell className="text-right">
                                                                    {formatCurrency(
                                                                        price,
                                                                    )}
                                                                </TableCell>
                                                                <TableCell className="text-center">
                                                                    {quantity}
                                                                </TableCell>
                                                                <TableCell className="text-right font-medium">
                                                                    {formatCurrency(
                                                                        total,
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    },
                                                )}
                                            </TableBody>
                                            <TableFooter className="bg-[#1A1A1A]">
                                                <TableRow className="border-[#2C2C2C]">
                                                    <TableCell
                                                        colSpan={3}
                                                        className="text-right font-medium"
                                                    >
                                                        Subtotal
                                                    </TableCell>
                                                    <TableCell className="text-right font-medium">
                                                        {formatCurrency(
                                                            subtotal,
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className="border-[#2C2C2C]">
                                                    <TableCell
                                                        colSpan={3}
                                                        className="text-right font-medium"
                                                    >
                                                        Total
                                                    </TableCell>
                                                    <TableCell className="text-right font-bold text-primary-orange">
                                                        {formatCurrency(
                                                            order?.total || 0,
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            </TableFooter>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Customer information */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="h-5 w-5 text-primary-orange" />
                                        Customer
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {order?.customer ? (
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-12 w-12 rounded-full bg-[#2C2C2C] flex items-center justify-center text-lg font-medium text-white">
                                                    {getInitials(
                                                        order.customer.name,
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-medium">
                                                        {order.customer.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-400">
                                                        Customer since{" "}
                                                        {dayjs(
                                                            order.customer
                                                                .created_at,
                                                        ).format("MMM D, YYYY")}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2 pt-2">
                                                {order.customer.email && (
                                                    <div className="flex items-center gap-2">
                                                        <Mail className="h-4 w-4 text-gray-500" />
                                                        <span className="text-sm text-gray-300">
                                                            {
                                                                order.customer
                                                                    .email
                                                            }
                                                        </span>
                                                    </div>
                                                )}

                                                {order.customer.phone && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-4 w-4 text-gray-500" />
                                                        <span className="text-sm text-gray-300">
                                                            {
                                                                order.customer
                                                                    .phone
                                                            }
                                                        </span>
                                                    </div>
                                                )}

                                                {order.customer.address && (
                                                    <div className="flex items-start gap-2">
                                                        <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                                        <span className="text-sm text-gray-300">
                                                            {
                                                                order.customer
                                                                    .address
                                                            }
                                                        </span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="pt-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-full bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/customers/${order.customer.id}`,
                                                        )
                                                    }
                                                >
                                                    View Customer Profile
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4">
                                            <User className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                                            <h3 className="font-medium mb-1">
                                                Anonymous Customer
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                This order was placed without a
                                                customer account.
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Order timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-primary-orange" />
                                        Order Timeline
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="relative pl-6 pb-4 border-l border-[#2C2C2C]">
                                            <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-primary-orange"></div>
                                            <h3 className="font-medium">
                                                Order Placed
                                            </h3>
                                            <p className="text-sm text-gray-400">
                                                {dayjs(
                                                    order?.created_at,
                                                ).format(
                                                    "MMM D, YYYY [at] h:mm A",
                                                )}
                                            </p>
                                        </div>

                                        {order?.status === "paid" && (
                                            <div className="relative pl-6 pb-4 border-l border-[#2C2C2C]">
                                                <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-green-500"></div>
                                                <h3 className="font-medium">
                                                    Payment Completed
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {dayjs(
                                                        order?.updated_at,
                                                    ).format(
                                                        "MMM D, YYYY [at] h:mm A",
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {order?.status === "cancelled" && (
                                            <div className="relative pl-6 border-l border-[#2C2C2C]">
                                                <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-red-500"></div>
                                                <h3 className="font-medium">
                                                    Order Cancelled
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    {dayjs(
                                                        order?.updated_at,
                                                    ).format(
                                                        "MMM D, YYYY [at] h:mm A",
                                                    )}
                                                </p>
                                            </div>
                                        )}

                                        {order?.status === "pending" && (
                                            <div className="relative pl-6 border-l border-[#2C2C2C]">
                                                <div className="absolute left-0 top-0 -translate-x-1/2 h-4 w-4 rounded-full bg-yellow-500"></div>
                                                <h3 className="font-medium">
                                                    Awaiting Payment
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    Payment pending since{" "}
                                                    {dayjs(
                                                        order?.created_at,
                                                    ).fromNow()}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
