import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import Button from "@/components/form/button";
import EmptyState from "@/components/layout/empty";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/shared/table";
import { Package, Store, TrendingUp, Image as ImageIcon, ShoppingCart, User, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Eye } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

dayjs.extend(relativeTime);

export default function Products({ product, currentStore, orders }) {
    // Helper function to parse JSON images
    const parseProductImages = (imageData) => {
        let parsedImages = [];
        try {
            if (typeof imageData === 'string') {
                parsedImages = JSON.parse(imageData);
            } else if (Array.isArray(imageData)) {
                parsedImages = imageData;
            }
        } catch (e) {
            console.error('Error parsing product images:', e);
        }
        return parsedImages;
    };
    
    // Get order status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case "completed":
            case "paid":
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-200 dark:border-emerald-900/30">
                        <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                );
            case "pending":
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-200 dark:border-amber-900/30">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        Pending
                    </div>
                );
            case "cancelled":
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-500 border border-red-200 dark:border-red-900/30">
                        <XCircle className="w-3.5 h-3.5 mr-1.5" />
                        Cancelled
                    </div>
                );
            default:
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-500/10 text-gray-500 border border-gray-200 dark:border-gray-700">
                        <AlertCircle className="w-3.5 h-3.5 mr-1.5" />
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </div>
                );
        }
    };

    const productImages = parseProductImages(product.images);
    const [activeImage, setActiveImage] = useState(productImages.length > 0 ? 0 : null);
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
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{product?.name}</h1>
                        <p className="text-gray-600 dark:text-gray-400">{product?.description || 'No description provided'}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outline" className="bg-gray-100 dark:bg-[#2C2C2C] border-0 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-[#3C3C3C] transition-colors" asChild>
                            <a href={`https://${currentStore?.slug}.selll.store/products/${product.id}`} target="_blank" className="flex items-center gap-2">
                                <Store className="h-4 w-4" />
                                View in Store
                            </a>
                        </Button>
                        <Button className="bg-primary-orange hover:bg-primary-orange/90 transition-all shadow-md hover:shadow-lg" asChild>
                            <Link href={`/products/${product.id}/edit`} className="flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Edit Product
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Product Image Gallery */}
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
                                    <p className="text-gray-600 dark:text-gray-400 text-center">No product images available</p>
                                </div>
                            )}
                        </div>

                        {productImages.length > 1 && (
                            <div className="flex mt-4 gap-3 overflow-x-auto pb-2">
                                {productImages.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border ${index === activeImage ? 'ring-2 ring-primary-orange border-primary-orange' : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100'} transition-all`}
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
                                <CardTitle className="dark:text-white">Price</CardTitle>
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
                                            {product.sales || 0} sales
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow transition-all">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="dark:text-white">Stock Status</CardTitle>
                                <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-lg">
                                    <Package className="h-5 w-5 text-primary-orange" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div>
                                    <div className="text-4xl font-bold mb-2 dark:text-white">
                                        {product.quantity === "unlimited" ? "∞" : product.quantity_items}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            className="px-3 py-1 text-xs font-medium rounded-full shadow-sm"
                                            variant={product.quantity === "unlimited" || parseInt(product.quantity_items) > 10 ? "success" : parseInt(product.quantity_items) > 0 ? "warning" : "default"}
                                        >
                                            {product.quantity === "unlimited" ? "Unlimited" : parseInt(product.quantity_items) > 0 ? `${product.quantity_items} in stock` : "Out of Stock"}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full hidden">
                    <Card className="border border-gray-100 dark:border-gray-800 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="dark:text-white">Price</CardTitle>
                            <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2 dark:text-white">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: currentStore?.currency,
                                    }).format(product.price)}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {product.sales || 0} sales
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-gray-100 dark:border-gray-800 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="dark:text-white">Stock Status</CardTitle>
                            <div className="bg-gray-100 dark:bg-[#2C2C2C] p-2 rounded-lg">
                                <Package className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2 dark:text-white">
                                    {product.quantity === "unlimited" ? "∞" : product.quantity_items}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        className="px-3 py-1 text-xs font-medium rounded-full shadow-sm"
                                        variant={product.quantity === "unlimited" || parseInt(product.quantity_items) > 10 ? "success" : parseInt(product.quantity_items) > 0 ? "warning" : "default"}
                                    >
                                        {product.quantity === "unlimited" ? "Unlimited" : parseInt(product.quantity_items) > 0 ? `${product.quantity_items} in stock` : "Out of Stock"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="w-full">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary-orange/10 p-3 rounded-full">
                                <ShoppingCart className="h-5 w-5 text-primary-orange" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Orders</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Latest orders for this product</p>
                            </div>
                        </div>
                        
                        {orders?.length > 0 && (
                            <Button 
                                variant="outline" 
                                className="bg-white dark:bg-[#2C2C2C] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3C3C3C] transition-all"
                                asChild
                            >
                                <Link href="/orders" className="flex items-center gap-2">
                                    <ShoppingCart className="h-4 w-4" />
                                    View All Orders
                                </Link>
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
                        <div className="bg-white dark:bg-[#2C2C2C] rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-gray-50 dark:bg-[#1A1A1A] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                                <div className="w-[30%]">Customer</div>
                                <div className="w-[25%]">Date</div>
                                <div className="w-[20%]">Status</div>
                                <div className="w-[15%] text-right">Amount</div>
                                <div className="w-[10%] text-center">Action</div>
                            </div>
                            
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {orders.map((order, index) => (
                                    <div 
                                        key={order.id}
                                        className={`px-6 py-4 flex items-center hover:bg-gray-50 dark:hover:bg-[#222222] transition-colors cursor-pointer ${index === orders.length - 1 ? 'rounded-b-xl' : ''}`}
                                        onClick={() => router.visit(`/orders/${order.id}`)}
                                    >
                                        <div className="w-[30%]">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-[#3C3C3C] flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {order.customer_name || "Anonymous Customer"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="w-[25%]">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {dayjs(order.created_at).format("MMM D, YYYY")}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {dayjs(order.created_at).fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="w-[20%]">
                                            {getStatusBadge(order.status)}
                                        </div>
                                        
                                        <div className="w-[15%] text-right">
                                            <span className="font-bold text-primary-orange">
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: currentStore?.currency || "USD",
                                                }).format(order.amount)}
                                            </span>
                                        </div>
                                        
                                        <div className="w-[10%] flex justify-center">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-8 w-8 p-0 rounded-full bg-gray-100 dark:bg-[#3C3C3C] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#4C4C4C]"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.visit(`/orders/${order.id}`);
                                                }}
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
