import Layout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import EmptyState from "@/components/layout/empty";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shared/table";
import { ShoppingBag } from "lucide-react";

export default function Products({ auth, products, currentStore }) {
    console.log(products, currentStore);

    return (
        <Layout
            variant="sidebar"
            breadcrumbs={[
                {
                    title: "Products",
                    href: "/products",
                },
            ]}
        >
            <Head title="Products" />

            <div className="py-4 px-4">
                {products?.length === 0 ? (
                    <EmptyState
                        title={`Welcome to ${currentStore.name}`}
                        description="Create your first product to start selling online."
                        button={{
                            href: "/products/new",
                            text: "Create Product",
                        }}
                    />
                ) : (
                    <div>
                        <div className="grid md:grid-cols-3 mb-6">
                            <div class="rounded-xl border bg-card text-card-foreground shadow">
                                <div class="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div class="tracking-tight text-sm font-medium">
                                        Products
                                    </div>
                                    <ShoppingBag size={20} />
                                </div>
                                <div class="p-6 pt-0">
                                    <div class="text-2xl font-bold">{products?.length}</div>
                                    <p class="text-xs text-muted-foreground">
                                        {products?.length} from last month
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Table>
                            <TableCaption>
                                All products in your store
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product Name</TableHead>
                                    <TableHead className="w-36">
                                        Price
                                    </TableHead>
                                    <TableHead className="w-36">
                                        In Stock
                                    </TableHead>
                                    <TableHead className="text-right w-36">
                                        Sold
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow
                                        key={product.id}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            router.visit(
                                                `/products/${product.id}`,
                                            )
                                        }
                                    >
                                        <TableCell className="font-medium">
                                            {product.name}
                                        </TableCell>
                                        <TableCell>
                                            {Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: product.currency,
                                            }).format(product.price)}
                                        </TableCell>
                                        <TableCell>
                                            {product.quantity === "unlimited"
                                                ? "Unlimited"
                                                : product.quantity_items}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            0
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">
                                        $2,500.00
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                )}
            </div>
        </Layout>
    );
}
