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
    
    const handlePrint = () => {
        // Create a new window for printing
        const printWindow = window.open('', '_blank');
        
        // Generate the print content
        const printContent = `
            <html>
            <head>
                <title>Order #${order?.id} - ${currentStore?.name}</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 20px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 20px;
                    }
                    .store-name {
                        font-size: 24px;
                        font-weight: bold;
                        margin: 0;
                    }
                    .order-info {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 20px;
                    }
                    .order-id {
                        font-size: 18px;
                        font-weight: bold;
                    }
                    .order-date, .order-status {
                        color: #666;
                    }
                    .section {
                        margin-bottom: 30px;
                    }
                    .section-title {
                        font-size: 18px;
                        margin-bottom: 10px;
                        border-bottom: 1px solid #eee;
                        padding-bottom: 5px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    th, td {
                        padding: 10px;
                        text-align: left;
                        border-bottom: 1px solid #eee;
                    }
                    th {
                        background-color: #f9f9f9;
                    }
                    .text-right {
                        text-align: right;
                    }
                    .customer-info {
                        display: flex;
                        justify-content: space-between;
                    }
                    .customer-info div {
                        flex: 1;
                    }
                    .total-row {
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 40px;
                        text-align: center;
                        font-size: 12px;
                        color: #999;
                    }
                    @media print {
                        body {
                            padding: 0;
                            margin: 0;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <p class="store-name">${currentStore?.name}</p>
                </div>
                
                <div class="order-info">
                    <div>
                        <p class="order-id">Order #${order?.id}</p>
                        <p class="order-date">Placed on ${dayjs(order?.created_at).format('MMMM D, YYYY [at] h:mm A')}</p>
                    </div>
                    <div>
                        <p class="order-status">Status: ${order?.status.charAt(0).toUpperCase() + order?.status.slice(1)}</p>
                    </div>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Order Items</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th class="text-right">Price</th>
                                <th class="text-right">Quantity</th>
                                <th class="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${order?.items?.map(item => {
                                const product = item.product || {};
                                const price = product.price || 0;
                                const quantity = item.quantity || 1;
                                const total = price * quantity;
                                
                                return `
                                    <tr>
                                        <td>${product.name}</td>
                                        <td class="text-right">${formatCurrency(price)}</td>
                                        <td class="text-right">${quantity}</td>
                                        <td class="text-right">${formatCurrency(total)}</td>
                                    </tr>
                                `;
                            }).join('')}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-right">Subtotal</td>
                                <td class="text-right">${formatCurrency(order?.items?.reduce((acc, item) => {
                                    const price = item.product?.price || 0;
                                    const quantity = item.quantity || 1;
                                    return acc + (price * quantity);
                                }, 0) || 0)}</td>
                            </tr>
                            <tr class="total-row">
                                <td colspan="3" class="text-right">Total</td>
                                <td class="text-right">${formatCurrency(order?.total || 0)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                
                <div class="section">
                    <h2 class="section-title">Customer Information</h2>
                    <div class="customer-info">
                        <div>
                            <p><strong>Name:</strong> ${order?.customer?.name || 'N/A'}</p>
                            <p><strong>Email:</strong> ${order?.customer?.email || 'N/A'}</p>
                            <p><strong>Phone:</strong> ${order?.customer?.phone || 'N/A'}</p>
                        </div>
                        <div>
                            <p><strong>Address:</strong> ${order?.customer?.address || 'N/A'}</p>
                            <p><strong>Customer since:</strong> ${order?.customer?.created_at ? dayjs(order.customer.created_at).format('MMMM D, YYYY') : 'N/A'}</p>
                        </div>
                    </div>
                </div>
                
                <div class="footer">
                    <p>Thank you for your business!</p>
                    <p>Printed on ${dayjs().format('MMMM D, YYYY [at] h:mm A')}</p>
                    <p>Powered by Selll</p>
                </div>
            </body>
            </html>
        `;
        
        // Write the content to the new window
        printWindow.document.write(printContent);
        printWindow.document.close();
        
        // Wait for content to load before printing
        printWindow.onload = function() {
            printWindow.print();
            // Close the window after printing (optional)
            // printWindow.onafterprint = function() {
            //     printWindow.close();
            // };
        };
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
                                    onClick={handlePrint}
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
                        <div className="md:col-span-2 h-full flex flex-col">
                            <Card className="flex-1 flex flex-col h-full">
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
                                <CardContent className="flex-1 flex flex-col h-full">
                                    {orderItems.length === 0 ? (
                                        <div className="flex-1 flex flex-col items-center justify-center border border-[#2C2C2C] rounded-md bg-[#1A1A1A] p-8">
                                            <Package className="h-12 w-12 text-gray-500 mb-4" />
                                            <p className="text-gray-400 text-lg">No items in this order</p>
                                        </div>
                                    ) : (
                                        <div className="rounded-md border border-[#2C2C2C] overflow-hidden h-full flex flex-col">
                                            <div className="grid grid-cols-4 bg-[#1A1A1A] p-4 border-b border-[#2C2C2C]">
                                                <div className="col-span-1 font-medium text-white">Product</div>
                                                <div className="col-span-1 font-medium text-white text-right">Price</div>
                                                <div className="col-span-1 font-medium text-white text-center">Quantity</div>
                                                <div className="col-span-1 font-medium text-white text-right">Total</div>
                                            </div>
                                            
                                            <div className="flex-1 flex flex-col">
                                                {orderItems.map((item, index) => {
                                                    const product = item.product || {};
                                                    const price = product.price || 0;
                                                    const quantity = item.quantity || 1;
                                                    const total = price * quantity;
                                                    
                                                    return (
                                                        <div 
                                                            key={index}
                                                            className="grid grid-cols-4 p-4 border-b border-[#2C2C2C] hover:bg-[#1A1A1A] transition-colors"
                                                        >
                                                            <div className="col-span-1">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="h-12 w-12 rounded-md bg-[#2C2C2C] flex items-center justify-center overflow-hidden">
                                                                        {product.images && product.images.length > 0 ? (
                                                                            <img
                                                                                src={product.images[0]}
                                                                                alt={product.name}
                                                                                className="h-full w-full object-cover"
                                                                            />
                                                                        ) : (
                                                                            <Package className="h-6 w-6 text-gray-500" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-medium text-white">
                                                                            {product.name}
                                                                        </p>
                                                                        {product.description && (
                                                                            <p className="text-xs text-gray-400 line-clamp-1">
                                                                                {product.description}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-span-1 text-right self-center">
                                                                {formatCurrency(price)}
                                                            </div>
                                                            <div className="col-span-1 text-center self-center">
                                                                {quantity}
                                                            </div>
                                                            <div className="col-span-1 text-right font-medium self-center">
                                                                {formatCurrency(total)}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                                
                                                {/* Spacer to push the footer down when few items */}
                                                {orderItems.length < 3 && (
                                                    <div className="flex-1"></div>
                                                )}
                                            </div>
                                            
                                            <div className="mt-auto bg-[#1A1A1A] border-t border-[#2C2C2C]">
                                                <div className="grid grid-cols-4 p-4 border-b border-[#2C2C2C]">
                                                    <div className="col-span-3 text-right font-medium">Subtotal</div>
                                                    <div className="col-span-1 text-right font-medium">
                                                        {formatCurrency(subtotal)}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-4 p-4">
                                                    <div className="col-span-3 text-right font-medium">Total</div>
                                                    <div className="col-span-1 text-right font-bold text-primary-orange">
                                                        {formatCurrency(order?.total || 0)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        <div className="space-y-6 h-full flex flex-col">
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
