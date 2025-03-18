import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import Button from "@/components/form/button";
import EmptyState from "@/components/layout/empty";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/card";
import { Package, Store, TrendingUp } from "lucide-react";
import { Badge } from "@/components/shared/badge";
import dayjs from "dayjs";

export default function Products({ product, currentStore, orders }) {
    return (
        <Layout
            variant="sidebar"
            className="bg-[#141414] -m-4 p-4"
            breadcrumbs={[
                {
                    title: "Products",
                    href: "/products",
                },
                {
                    title: "Products",
                    href: `/products/${product.id}`,
                },
            ]}
        >
            <Head title={`${product?.name} from ${currentStore?.name}`} />

            <div className="py-4 px-4 space-y-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2">{product?.name}</h1>
                        <p className="text-gray-400">{product?.description || 'No description provided'}</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]" asChild>
                            <Link href={`https://${currentStore?.identifier}.selll.store/products/${product.id}`} target="_blank" className="flex items-center gap-2">
                                <Store className="h-4 w-4" />
                                View in Store
                            </Link>
                        </Button>
                        <Button className="bg-primary-orange hover:bg-primary-orange/90" asChild>
                            <Link href={`/products/${product.id}/edit`} className="flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                Edit Product
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Price</CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <TrendingUp className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: currentStore?.currency,
                                    }).format(product.price)}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {product.sales || 0} sales
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Stock Status</CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <Package className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2">
                                    {product.quantity === "unlimited" ? "∞" : product.quantity_items}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={product.quantity === "unlimited" || parseInt(product.quantity_items) > 10 ? "success" : parseInt(product.quantity_items) > 0 ? "warning" : "default"}
                                    >
                                        {product.quantity === "unlimited" ? "Unlimited" : parseInt(product.quantity_items) > 0 ? `${product.quantity_items} in stock` : "Out of Stock"}
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>Latest orders for this product</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {orders?.length === 0 ? (
                            <EmptyState
                                icon={Package}
                                title="No orders yet"
                                description="Share your product with customers to start receiving orders."
                            />
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="flex items-center justify-between p-4 bg-[#2C2C2C] rounded-lg">
                                        <div>
                                            <div className="font-medium">{order.customer_name}</div>
                                            <div className="text-sm text-gray-400">{dayjs(order.created_at).format("MMM D, YYYY")}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium">
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: currentStore?.currency,
                                                }).format(order.amount)}
                                            </div>
                                            <Badge
                                                variant={order.status === "completed" ? "success" : order.status === "pending" ? "warning" : "default"}
                                            >
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
