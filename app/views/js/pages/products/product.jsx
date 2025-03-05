import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import Button from "@/components/form/button";
import EmptyState from "@/components/layout/empty";

export default function Products({ product, currentStore, orders }) {
    return (
        <Layout
            variant="sidebar"
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

            <div className="py-4 px-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-semibold">{product?.name}</h1>
                    <Button
                        as="a"
                        variant="outline"
                        href={`https://${currentStore.identifier}.selll.store/products/${product.id}`}
                        className="btn btn-primary"
                        target="_blank"
                        rel="selll-dashboard"
                    >
                        Preview
                    </Button>
                </div>
                <div className="mt-4 space-y-4">
                    <div className="md:flex">
                        <div></div>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl">Description</h3>
                                <p className="text-muted-foreground">
                                    {product?.description}
                                </p>
                            </div>
                            <div>
                                <h3 className="text-xl">Shareable URL</h3>
                                <a
                                    target="_blank"
                                    rel="selll-dashboard"
                                    href={`https://${currentStore.identifier}.selll.store/products/${product.id}`}
                                    className="text-muted-foreground hover:text-primary-red hover:underline"
                                >{`https://${currentStore.identifier}.selll.store/products/${product.id}`}</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-sidebar p-4 rounded-lg">
                        <h3 className="mb-2 text-xl">Product Details</h3>
                        <div className="flex">
                            <div className="w-full max-w-48 space-y-2">
                                <p>Price</p>
                                <p>In stock</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-muted-foreground">
                                    {Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency: product.currency,
                                    }).format(product.price)}
                                </p>
                                <p className="text-muted-foreground">
                                    {product.quantity === "unlimited"
                                        ? "Unlimited"
                                        : product.quantity_items}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-sidebar p-4 rounded-lg">
                        <h3 className="mb-2 text-xl">Product Orders</h3>
                        {orders?.length === 0 ? (
                            <EmptyState
                                title="Waiting for orders..."
                                description="Your product is ready, share it with your customers to start selling."
                            />
                        ) : (
                            <div>Hello</div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
