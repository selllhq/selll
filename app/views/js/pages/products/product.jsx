import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import Button from "@/components/form/button";
import EmptyState from "@/components/layout/empty";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import { Package, User, Store, TrendingUp, ShoppingCart } from "lucide-react";
import dayjs from "dayjs";
import { useState } from "react";
import { parseProductImages } from "@/utils/store";
import { Badge, StatusBadge } from "@/components/shared/badge";
import { Wallet } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shared/table";
import { cn } from "@/utils";

export default function Products({ product, currentStore, orders }) {
    const productImages = parseProductImages(product.images);
    const [activeImage, setActiveImage] = useState(
        productImages.length > 0 ? 0 : null,
    );

    console.log(orders, " orders");

    return (
        <Layout
            variant="header"
            className="my-4 py-0"
            breadcrumbs={[
                {
                    title: "Products",
                    href: "/products",
                },
                {
                    title: product?.name,
                    href: `/products/${product.id}`,
                },
            ]}
        >
            <Head title={`${product?.name} from ${currentStore?.name}`} />

            <div className="py-6 px-4 mt-28 space-y-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 w-full">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {product?.name}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {product?.description || "No description provided"}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            as="a"
                            variant="outline"
                            className="bg-gray-100 dark:bg-[#2C2C2C] border-0 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#3C3C3C] transition-colors gap-2"
                            href={`https://${currentStore?.slug}.selll.store/products/${product.id}`}
                            target="_blank"
                        >
                            <Store className="h-4 w-4" />
                            View in Store
                        </Button>
                        <Button
                            as={Link}
                            href={`/products/${product.id}/edit`}
                            className="bg-primary-orange hover:bg-primary-orange/90 transition-all shadow-md hover:shadow-lg gap-2"
                        >
                            <Package className="h-4 w-4" />
                            Edit Product
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 w-full">
                    <div className="md:col-span-1 lg:col-span-2">
                        <div className="aspect-square w-full h-[400px] relative">
                            {productImages.length > 0 ? (
                                <div className="bg-white dark:bg-[#2C2C2C] rounded-xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all h-full w-full">
                                    <img
                                        src={productImages[activeImage]}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4"
                                    />
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-[#2C2C2C] rounded-xl overflow-hidden flex flex-col items-center justify-center p-8 h-full w-full border border-gray-100 dark:border-gray-800 shadow-sm">
                                    <ImageIcon className="h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" />
                                    <p className="text-gray-600 dark:text-gray-400 text-center">
                                        No product images available
                                    </p>
                                </div>
                            )}
                        </div>

                        {productImages.length > 1 && (
                            <div className="flex mt-4 gap-3 overflow-x-auto pb-2">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border ${index === activeImage ? "ring-2 ring-primary-orange border-primary-orange" : "border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100"} transition-all`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="dark:text-white">
                                    Price
                                </CardTitle>
                                <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-primary-orange" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <div className="text-4xl font-bold mb-2 text-primary-orange">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: currentStore?.currency,
                                        }).format(product.price)}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                        <span className="inline-flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full text-xs">
                                            {orders.filter(
                                                (order) =>
                                                    order.status === "paid",
                                            ).length || 0}{" "}
                                            sales
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="dark:text-white">
                                    Stock Status
                                </CardTitle>
                                <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-lg">
                                    <Package className="h-5 w-5 text-primary-orange" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <div className="text-4xl font-bold mb-2 dark:text-white">
                                        {product.quantity === "unlimited"
                                            ? "∞"
                                            : product.quantity_items}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className="px-3 py-1 text-xs font-medium rounded-full shadow-sm"
                                            variant={
                                                product.quantity ===
                                                    "unlimited" ||
                                                parseInt(
                                                    product.quantity_items,
                                                ) > 10
                                                    ? "success"
                                                    : parseInt(
                                                            product.quantity_items,
                                                        ) > 0
                                                      ? "warning"
                                                      : "default"
                                            }
                                        >
                                            {product.quantity === "unlimited"
                                                ? "Unlimited"
                                                : parseInt(
                                                        product.quantity_items,
                                                    ) > 0
                                                  ? `${product.quantity_items} in stock`
                                                  : "Out of Stock"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full">
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
                                        currency: currentStore?.currency,
                                    }).format(
                                        orders
                                            .filter(
                                                (order) =>
                                                    order.status === "paid",
                                            )
                                            .reduce(
                                                (acc, order) =>
                                                    acc + Number(order.total),
                                                0,
                                            ),
                                    )}
                                </div>
                                <div className="flex items-center gap-1 text-emerald-500">
                                    <span className="text-sm">
                                        ↑{" "}
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: currentStore?.currency,
                                            minimumFractionDigits: 0,
                                        }).format(
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
                                                        Number(order.total),
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
                            <CardTitle>Total Sales</CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <Wallet className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2">
                                    {orders.filter(
                                        (order) => order.status === "paid",
                                    ).length || 0}{" "}
                                    sold
                                </div>
                                <div className="flex items-center gap-1 text-emerald-500">
                                    <span className="text-sm">
                                        ↑{" "}
                                        {orders.filter(
                                            (order) => order.status === "paid",
                                        ).length || 0}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        from last month
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {orders.length > 0 && (
                        <>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Cart abandonment rate</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <Wallet className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "percent",
                                                minimumFractionDigits: 0,
                                            }).format(
                                                orders.filter(
                                                    (order) =>
                                                        order.status ===
                                                        "abandoned",
                                                ).length || 0,
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "flex items-center gap-1",
                                                orders.filter(
                                                    (order) =>
                                                        order.status ===
                                                        "abandoned",
                                                ).length > 0
                                                    ? "text-red-500"
                                                    : "text-emerald-500",
                                            )}
                                        >
                                            <span className="text-sm">
                                                ↑{" "}
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "percent",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(
                                                    orders.filter(
                                                        (order) =>
                                                            order.status ===
                                                            "abandoned",
                                                    ).length || 0,
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
                                    <CardTitle>Repeat purchase rate</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <Wallet className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "percent",
                                                minimumFractionDigits: 0,
                                            }).format(
                                                orders.filter(
                                                    (order) =>
                                                        order.status ===
                                                            "abandoned" &&
                                                        order.customer_id,
                                                ).length || 0,
                                            )}
                                            {((orders.filter(
                                                (order) =>
                                                    order.status === "paid" &&
                                                    order.customer_id,
                                            ).length || 0) /
                                                orders.length) *
                                                100}
                                            %
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑{" "}
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "percent",
                                                        minimumFractionDigits: 0,
                                                    },
                                                ).format(
                                                    (orders.filter(
                                                        (order) =>
                                                            order.status ===
                                                                "paid" &&
                                                            order.customer_id,
                                                    ).length || 0) /
                                                        orders.length,
                                                )}
                                            </span>
                                            <span className="text-sm text-gray-500">
                                                from last month
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>

                <div className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-orange/10 p-3 rounded-full">
                                <ShoppingCart className="h-5 w-5 text-primary-orange" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    Recent Orders
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Latest orders for this product
                                </p>
                            </div>
                        </div>

                        {orders?.length > 0 && (
                            <Button
                                as={Link}
                                href="/orders"
                                variant="outline"
                                className="bg-white dark:bg-[#2C2C2C] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3C3C3C] transition-all gap-2"
                                prefetch
                            >
                                <ShoppingCart className="h-4 w-4" />
                                View All Orders
                            </Button>
                        )}
                    </div>

                    {orders?.length === 0 ? (
                        <div className="bg-white dark:bg-[#2C2C2C] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm p-8">
                            <EmptyState
                                icon={Package}
                                title="No orders yet"
                                description="Share your product with customers to start receiving orders."
                            />
                        </div>
                    ) : (
                        <div className="overflow-x-auto rounded-lg border border-muted-foreground/15">
                            <Table className="w-full text-sm text-left">
                                <TableHeader className="text-xs uppercase bg-gray-100 dark:bg-[#1A1A1A] dark:text-gray-400 border-b border-muted-foreground/15">
                                    <TableRow>
                                        <TableHead
                                            scope="col"
                                            className="px-4 py-3"
                                        >
                                            Customer
                                        </TableHead>
                                        <TableHead
                                            scope="col"
                                            className="px-4 py-3"
                                        >
                                            Date
                                        </TableHead>
                                        <TableHead
                                            scope="col"
                                            className="px-4 py-3"
                                        >
                                            Amount
                                        </TableHead>
                                        <TableHead
                                            scope="col"
                                            className="px-4 py-3"
                                        >
                                            Status
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => {
                                        return (
                                            <TableRow
                                                key={order.id}
                                                className="border-b border-muted-foreground/15 hover:bg-gray-100 hover:dark:bg-[#1A1A1A]/50 cursor-pointer"
                                                onClick={() =>
                                                    router.visit(
                                                        `/orders/${order.id}`,
                                                    )
                                                }
                                            >
                                                <TableCell className="px-4 py-3">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-[#3C3C3C] flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                            <User className="h-4 w-4" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {order.customer
                                                                    ?.name ||
                                                                    "Anonymous Customer"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3 font-medium">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {dayjs(
                                                                order.created_at,
                                                            ).format(
                                                                "MMM D, YYYY",
                                                            )}
                                                        </span>
                                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                                            {dayjs(
                                                                order.created_at,
                                                            ).fromNow()}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    {new Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "currency",
                                                            currency:
                                                                currentStore?.currency ||
                                                                "USD",
                                                        },
                                                    ).format(order.total)}
                                                </TableCell>
                                                <TableCell className="px-4 py-3">
                                                    <StatusBadge
                                                        status={order.status}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                            <div className="bg-gray-100 dark:bg-[#1A1A1A] px-4 py-3 text-xs text-gray-400">
                                <div>
                                    {Intl.NumberFormat("en-US", {
                                        style: "decimal",
                                    }).format(orders.length)}{" "}
                                    {orders.length === 1 ? "order" : "orders"}{" "}
                                    found
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
