import Layout from "@/layouts/app-layout";
import { Head, router, Link } from "@inertiajs/react";
import { useState } from "react";
import EmptyState from "@/components/layout/empty";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import {
    ShoppingBag,
    TrendingUp,
    Store,
    Package,
    Search,
    Trash2,
    X,
    Share,
    MoreHorizontal,
    Edit,
} from "lucide-react";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import dayjs from "dayjs";
import { parseProductImages } from "@/utils/store";
import { toast } from "sonner";
import { useDialog } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shared/dropdown-menu";

export default function Products({ orders = [], products, currentStore }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const confirmModal = useDialog("confirmAction");

    const filteredProducts = products?.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description?.toLowerCase().includes(search.toLowerCase());

        if (!matchesSearch) {
            return false;
        }

        switch (filter) {
            case "in_stock":
                return (
                    product.quantity === "unlimited" ||
                    parseInt(product.quantity_items) > 0
                );
            case "out_of_stock":
                return (
                    product.quantity !== "unlimited" &&
                    parseInt(product.quantity_items) === 0
                );
            default:
                return true;
        }
    });

    return (
        <Layout
            variant="header"
            className="dark:bg-[#141414] p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Products",
                    href: "/products",
                },
            ]}
        >
            <Head title="Products" />

            <div>
                {products?.length === 0 ? (
                    <div className="h-[calc(100vh-8rem)] flex items-center justify-center">
                        <EmptyState
                            icon={ShoppingBag}
                            title="Let's get you sellling fast"
                            description="Create your first product to start selling online, it takes less than a minute."
                            button={{
                                text: "Add Your First Product",
                                icon: Package,
                                href: "/products/new",
                                className:
                                    "bg-primary-orange hover:bg-primary-orange/90",
                            }}
                        />
                    </div>
                ) : (
                    <div className="space-y-8 py-0 md:py-4 px-0 md:px-4">
                        <div className="md:flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl md:text-4xl font-bold md:mb-2">
                                    Products
                                </h2>
                                <p className="text-muted-foreground text-sm md:text-base">
                                    Manage and track your store's inventory
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-2 md:mt-0">
                                <Button
                                    variant="outline"
                                    className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C] w-full md:w-auto gap-2"
                                    href={`https://${currentStore?.slug}.selll.store`}
                                    target="_blank"
                                    as="a"
                                >
                                    <Store className="h-4 w-4" />
                                    View Store
                                </Button>
                                <Button
                                    as={Link}
                                    href="/products/new"
                                    className="bg-primary-orange hover:bg-primary-orange/90 text-white w-full md:w-auto gap-2"
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                    Add Product
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                    <CardTitle>Total Products</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <ShoppingBag className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {products.length.toLocaleString()}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑{" "}
                                                {products
                                                    .filter((product) =>
                                                        dayjs(
                                                            product.created_at,
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
                                    <CardTitle>Total Sales</CardTitle>
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
                                                    currentStore?.currency,
                                            }).format(
                                                orders
                                                    .filter(
                                                        (order) =>
                                                            order.status ===
                                                            "paid",
                                                    )
                                                    .reduce(
                                                        (acc, order) =>
                                                            acc +
                                                            Number(order.total),
                                                        0,
                                                    ),
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">
                                                ↑{" "}
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency:
                                                            currentStore?.currency,
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
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <div className="flex-1 max-w-md">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 dark:text-gray-500" />
                                    <Input
                                        type="search"
                                        placeholder="Search products..."
                                        className="pl-8 h-9 bg-gray-100 dark:bg-[#141414] dark:border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors w-full text-sm dark:placeholder:text-gray-500"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <Input
                                as="select"
                                className="ml-6 h-9 bg-gray-100 dark:bg-[#141414] dark:border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors text-sm font-medium dark:text-gray-400 px-2.5 appearance-none cursor-pointer max-w-[150px]"
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
                                    All Products
                                </option>
                                <option
                                    value="in_stock"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    In Stock
                                </option>
                                <option
                                    value="out_of_stock"
                                    className="bg-[#141414] text-gray-400"
                                >
                                    Out of Stock
                                </option>
                            </Input>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium">
                                {filter === "all"
                                    ? "All Products"
                                    : filter === "in_stock"
                                      ? "In Stock Products"
                                      : "Out of Stock Products"}{" "}
                                ({filteredProducts.length})
                            </h3>

                            <div className="text-sm text-gray-400">
                                {search && (
                                    <span>
                                        Found {filteredProducts.length}{" "}
                                        {filteredProducts.length === 1
                                            ? "product"
                                            : "products"}{" "}
                                        matching "{search}"
                                    </span>
                                )}
                            </div>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <EmptyState
                                icon={Package}
                                title="No products found"
                                description={
                                    search
                                        ? `No products match your search "${search}"`
                                        : "Try adjusting your filters to find what you're looking for."
                                }
                                className="mt-6"
                            />
                        ) : (
                            <div className="overflow-x-auto rounded-lg border border-muted-foreground/15">
                                <table className="w-full text-sm text-left">
                                    <thead className="text-xs uppercase bg-gray-100 dark:bg-[#1A1A1A] dark:text-gray-400 border-b border-muted-foreground/15">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Name
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Status
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Total Sales
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3"
                                            >
                                                Total Revenue
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-4 py-3 text-right"
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map((product) => {
                                            const parsedImages =
                                                parseProductImages(
                                                    product.images,
                                                );
                                            const totalRevenue =
                                                (product.sales || 0) *
                                                parseFloat(product.price);
                                            const stockStatus =
                                                product.quantity ===
                                                    "unlimited" ||
                                                parseInt(
                                                    product.quantity_items,
                                                ) > 0
                                                    ? "Published"
                                                    : "Out of Stock";

                                            return (
                                                <tr
                                                    key={product.id}
                                                    className="border-b border-muted-foreground/15 hover:bg-gray-100 hover:dark:bg-[#1A1A1A]/50 cursor-pointer"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/products/${product.id}`,
                                                        )
                                                    }
                                                >
                                                    <td className="px-4 py-3">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="h-10 w-10 flex-shrink-0 rounded bg-[#2C2C2C] overflow-hidden">
                                                                {parsedImages.length >
                                                                0 ? (
                                                                    <img
                                                                        src={
                                                                            parsedImages[0]
                                                                        }
                                                                        alt={
                                                                            product.name
                                                                        }
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="h-full w-full flex items-center justify-center">
                                                                        <Package className="h-5 w-5 text-gray-500" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">
                                                                    {
                                                                        product.name
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 font-medium">
                                                        {new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    currentStore?.currency,
                                                            },
                                                        ).format(product.price)}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${stockStatus === "Published" ? "bg-emerald-500/10 text-emerald-500" : "bg-primary-orange/10 text-primary-orange"}`}
                                                        >
                                                            {stockStatus}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {product.sales || 0}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        {new Intl.NumberFormat(
                                                            "en-US",
                                                            {
                                                                style: "currency",
                                                                currency:
                                                                    currentStore?.currency,
                                                            },
                                                        ).format(totalRevenue)}
                                                    </td>
                                                    <td className="px-4 py-3 text-right">
                                                        <div className="flex items-center justify-end space-x-2 relative">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger
                                                                    asChild
                                                                    stopPropagation
                                                                >
                                                                    <Button variant="ghost" className="hover:bg-muted-foreground/10">
                                                                        <MoreHorizontal className="h-4 w-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent
                                                                    className="w-56"
                                                                    align="end"
                                                                >
                                                                    <DropdownMenuItem
                                                                        asChild
                                                                    >
                                                                        <Link
                                                                            className="block w-full h-10"
                                                                            href={`/products/${product.id}/edit`}
                                                                            as="button"
                                                                            prefetch
                                                                            onClick={(
                                                                                e,
                                                                            ) =>
                                                                                e.stopPropagation()
                                                                            }
                                                                        >
                                                                            <Edit className="h-4 w-4 mr-2" />
                                                                            Edit
                                                                        </Link>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            className="w-full justify-start focus-visible:ring-0"
                                                                            onClick={(
                                                                                e,
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                navigator.clipboard.writeText(
                                                                                    `https://${currentStore?.slug}.selll.store/products/${product.id}`,
                                                                                );
                                                                                toast(
                                                                                    "Product link copied to clipboard.",
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Share className="h-4 w-4 mr-2" />
                                                                            Share
                                                                        </Button>
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuItem
                                                                        asChild
                                                                    >
                                                                        <Button
                                                                            variant="ghost"
                                                                            className="w-full justify-start focus-visible:ring-0"
                                                                            onClick={(
                                                                                e,
                                                                            ) => {
                                                                                e.stopPropagation();
                                                                                confirmModal.openDialog(
                                                                                    {
                                                                                        title: "Delete Product",
                                                                                        description: `Are you sure you want to delete the product "${product.name}"? This action cannot be undone.`,
                                                                                        cancelText:
                                                                                            "Cancel",
                                                                                        confirmText:
                                                                                            "Delete",
                                                                                        onConfirm:
                                                                                            () => {
                                                                                                toast(
                                                                                                    "Product deleted successfully.",
                                                                                                );
                                                                                            },
                                                                                    },
                                                                                );
                                                                            }}
                                                                        >
                                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                                            Delete
                                                                        </Button>
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="bg-gray-100 dark:bg-[#1A1A1A] px-4 py-3 text-xs text-gray-400">
                                    <div>
                                        {Intl.NumberFormat("en-US", {
                                            style: "decimal",
                                        }).format(filteredProducts.length)}{" "}
                                        {filteredProducts.length === 1
                                            ? "product"
                                            : "products"}{" "}
                                        found
                                        {search && (
                                            <span> matching "{search}"</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
