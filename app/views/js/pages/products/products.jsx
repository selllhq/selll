import Layout from "@/layouts/app-layout";
import { Head, router, Link } from "@inertiajs/react";
import { useState } from "react";
import EmptyState from "@/components/layout/empty";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/shared/card";
import { ShoppingBag, TrendingUp, Store, Package, Search } from "lucide-react";
import Button from "@/components/form/button";
import Input from "@/components/form/input";

export default function Products({ auth, products, currentStore }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filteredProducts = products?.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description?.toLowerCase().includes(search.toLowerCase());

        if (!matchesSearch) return false;

        switch (filter) {
            case "in_stock":
                return product.quantity === "unlimited" || parseInt(product.quantity_items) > 0;
            case "out_of_stock":
                return product.quantity !== "unlimited" && parseInt(product.quantity_items) === 0;
            default:
                return true;
        }
    });

    return (
        <Layout
            variant="sidebar"
            className="bg-[#141414] -m-4 p-4"
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
                    <div className="space-y-8 py-4 px-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">Products</h2>
                                <p className="text-gray-400">Create your first product to start selling online</p>
                            </div>

                            <Button className="bg-primary-orange hover:bg-primary-orange/90" asChild>
                                <Link href="/products/new" className="flex items-center gap-2">
                                    <ShoppingBag className="h-4 w-4" />
                                    Add Product
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>Total Products</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <ShoppingBag className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">0</div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <span className="text-sm">No products yet</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>Total Sales</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">$0.00</div>
                                        <div className="flex items-center gap-1 text-gray-400">
                                            <span className="text-sm">No sales yet</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg">
                            <div className="aspect-[4/3] bg-[#1A1A1A] relative">
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                                    <Package className="w-12 h-12" />
                                    <p className="text-sm text-center">Add photos to showcase your products</p>
                                </div>
                            </div>

                            <div className="p-4 space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-white">Start selling on {currentStore.name}</h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                                        Create your first product to start selling online. You can add product details, images, and set your pricing.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="w-full bg-primary-orange hover:bg-primary-orange/90 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                                    onClick={() => router.visit('/products/new')}
                                >
                                    <ShoppingBag className="h-4 w-4" />
                                    Add Your First Product
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8 py-4 px-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">Products</h2>
                                <p className="text-gray-400">Manage and track your store's inventory</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]" asChild>
                                    <Link href={`https://${currentStore?.identifier}.selll.store`} target="_blank" className="flex items-center gap-2">
                                        <Store className="h-4 w-4" />
                                        View Store
                                    </Link>
                                </Button>
                                <Button className="bg-primary-orange hover:bg-primary-orange/90" asChild>
                                    <Link href="/products/new" className="flex items-center gap-2">
                                        <ShoppingBag className="h-4 w-4" />
                                        Add Product
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>Total Products</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <ShoppingBag className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            {products?.length}
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">↑ 4.3%</span>
                                            <span className="text-sm text-gray-500">from last month</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle>Total Sales</CardTitle>
                                    <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                        <TrendingUp className="h-5 w-5 text-primary-orange" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div>
                                        <div className="text-4xl font-bold mb-2">
                                            $2,500.00
                                        </div>
                                        <div className="flex items-center gap-1 text-emerald-500">
                                            <span className="text-sm">↑ 12.5%</span>
                                            <span className="text-sm text-gray-500">from last month</span>
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
                                        placeholder="Search products..."
                                        className="pl-8 h-9 bg-[#141414] border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors w-full text-sm placeholder:text-gray-500"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <select
                                className="ml-6 h-9 bg-[#141414] border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors text-sm font-medium text-gray-400 px-2.5 appearance-none cursor-pointer min-w-[140px]"
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: `right 0.5rem center`, backgroundRepeat: `no-repeat`, backgroundSize: `1rem`, paddingRight: `2rem` }}
                            >
                                <option value="all" className="bg-[#141414] text-gray-400">All Products</option>
                                <option value="in_stock" className="bg-[#141414] text-gray-400">In Stock</option>
                                <option value="out_of_stock" className="bg-[#141414] text-gray-400">Out of Stock</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium text-white">
                                {filter === "all" ? "All Products" :
                                filter === "in_stock" ? "In Stock Products" :
                                "Out of Stock Products"} ({filteredProducts.length})
                            </h3>

                            <div className="text-sm text-gray-400">
                                {search && (
                                    <span>Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} matching "{search}"</span>
                                )}
                            </div>
                        </div>

                        {filteredProducts.length === 0 ? (
                            <EmptyState
                                icon={Package}
                                title="No products found"
                                description={search ? `No products match your search "${search}"` : "Try adjusting your filters to find what you're looking for."}
                                className="mt-6"
                            />
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg cursor-pointer hover:bg-[#2C2C2C]/90 transition-colors"
                                    onClick={() => router.visit(`/products/${product.id}`)}
                                >
                                    <div className="aspect-[4/3] bg-[#1A1A1A] relative group">
                                        {product.images?.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                                                <Package className="w-12 h-12" />
                                                <p className="text-sm text-center">Add photos to showcase your product</p>
                                            </div>
                                        )}

                                        {product.images?.length > 1 && (
                                            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                                +{product.images.length - 1} more
                                            </div>
                                        )}

                                        <div className="absolute top-2 right-2">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${product.quantity === "unlimited" ? 'bg-emerald-500/10 text-emerald-500' : parseInt(product.quantity_items) > 10 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-primary-orange/10 text-primary-orange'} backdrop-blur-sm`}>
                                                {product.quantity === "unlimited" ? "∞ Unlimited" : `${product.quantity_items} in stock`}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-4 space-y-4">
                                        <div>
                                            <h3 className="text-lg font-medium text-white">{product.name}</h3>
                                            <p className="text-sm text-gray-400 line-clamp-2 mt-1">{product.description || 'No description provided'}</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="text-xl font-bold text-white">
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: product.currency || "USD",
                                                }).format(product.price)}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {product.sales || 0} sales
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            className="w-full bg-primary-orange hover:bg-primary-orange/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(`https://${currentStore?.identifier}.selll.store/products/${product.id}`, '_blank');
                                            }}
                                        >
                                            View in Store
                                        </button>
                                    </div>
                                </div>
                            ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
