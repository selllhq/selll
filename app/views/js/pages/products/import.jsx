import Layout from "@/layouts/app-layout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import InputError from "@/components/form/input-error";
import Label from "@/components/form/label";
import Select from "@/components/form/creatable-select";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import {
    Instagram,
    Loader2,
    Package,
    Plus,
    Search,
    Trash,
    X,
} from "lucide-react";
import { useState } from "react";
import { CURRENCY_LIMITS, CURRENCY_SYMBOLS } from "@/utils/store";
import { cn } from "@/utils";
import { toast } from "sonner";

export default function ImportProducts({ currentStore, categories, auth }) {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [selectedPost, setSelectedPost] = useState(null);

    const { data, setData, post, errors, processing, reset } = useForm({
        name: "",
        description: "",
        price: "",
        quantity: "unlimited",
        quantity_items: "",
        images: [],
        categories: [],
    });

    const currencyLimits =
        CURRENCY_LIMITS[currentStore?.currency] || CURRENCY_LIMITS.USD;
    const currencySymbol = CURRENCY_SYMBOLS[currentStore?.currency || "USD"];

    const [instagramPosts, setInstagramPosts] = useState([]);
    const [instagramPostSettings, setInstagramPostSettings] = useState({});

    const [maxSelection] = useState(10);
    const selectedCount = instagramPosts.filter((post) => post.selected).length;

    const handleFetchPosts = (id = null) => {
        if (instagramPosts.length > 0) {
            return;
        }

        fetch(
            `/products/import/instagram/${id ?? instagramPostSettings.import_id}`,
        )
            .then((response) => response.json())
            .then((data) => {
                console.log("Posts", data);

                if (data?.length > 0) {
                    setInstagramPosts(data);
                    setLoading(false);
                } else {
                    setTimeout(() => {
                        handleFetchPosts(id ?? instagramPostSettings.import_id);
                    }, 10000);
                }
            })
            .catch((error) => {
                console.error("Error fetching Instagram posts:", error);
                setLoading(false);
            });
    };

    const handleImport = (e) => {
        e.preventDefault();

        setLoading(true);

        fetch(`/products/import/instagram?username=${username}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Instagram", data);
                setInstagramPostSettings(data);
                setLoading(false);

                setTimeout(() => {
                    handleFetchPosts(data?.import_id);
                }, 5000);
            })
            .catch((error) => {
                console.error("Error importing Instagram posts:", error);
                setLoading(false);
            });
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
        const categories = post.hashtags.map((tag) => ({
            value: tag,
            label: tag,
        }));

        setData({
            name: "",
            description: post.caption,
            price: "",
            quantity: "unlimited",
            quantity_items: "",
            images: post.type === "Sidecar" ? post.images : [post.displayUrl],
            categories: categories,
        });
    };

    const closeModal = () => {
        setSelectedPost(null);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const price = parseFloat(data.price);

        if (price < currencyLimits.min || price > currencyLimits.max) {
            return;
        }

        post("/products/new/import", {
            onSuccess: () => {
                toast.success(
                    "Product imported successfully!",
                );

                setInstagramPosts((posts) =>
                    posts.filter((p) => p.id !== selectedPost?.id),
                );

                closeModal();
            },
        });
    };

    console.log("selectedPost", selectedPost);

    return (
        <Layout
            variant="header"
            className="p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Products",
                    href: "/products",
                },
                {
                    title: "Import from Instagram",
                    href: "/products/import",
                },
            ]}
        >
            <Head title="Import from Instagram" />

            <div className="mt-16 md:py-4 md:px-4">
                <div className="mb-6">
                    <h2 className="text-2xl md:text-4xl font-bold md:mb-2">
                        Hello, {auth.user.name.split(" ")[0]}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base sm:max-w-md">
                        Import posts from Instagram to showcase on your store.
                    </p>
                </div>
                <div className="space-y-8">
                    {!instagramPosts.length && (
                        <Card className="flex flex-col gap-5 justify-center items-center p-6 sm:p-12 md:p-24">
                            {!instagramPostSettings.id ? (
                                <>
                                    <div className="flex justify-center items-center h-16 w-16 text-white bg-primary-orange p-4 rounded-full">
                                        <Instagram className="w-full h-full" />
                                    </div>
                                    <div className="text-center">
                                        <h2 className="sm:text-xl">
                                            Import Instagram Posts
                                        </h2>
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            Enter your Instagram handle to
                                            import and analyze your posts
                                        </p>
                                    </div>

                                    <form
                                        onSubmit={handleImport}
                                        className="w-full sm:max-w-md mx-auto"
                                    >
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                                <span className="text-accent-foreground text-sm sm:text-lg font-medium">
                                                    @
                                                </span>
                                            </div>
                                            <Input
                                                type="text"
                                                placeholder="instagram_handle"
                                                className="w-full pl-10 pr-12 py-6 bg-accent focus-visible:bg-background text-sm sm:text-lg border-0 rounded-lg focus:outline-none focus-visible:ring-primary-orange transition-colors border-gray-200 focus:border-none"
                                                value={username}
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                            />
                                            <Button
                                                type="submit"
                                                disabled={loading || !username}
                                                className={`absolute inset-y-0 top-1 right-1 p-3 bg-primary-orange hover:bg-primary-orange/90 text-white rounded-xl ${loading || !username ? "bg-transparent" : ""}`}
                                            >
                                                {loading ? (
                                                    <Loader2 className="size-4 animate-spin" />
                                                ) : (
                                                    <Search className="size-4" />
                                                )}
                                            </Button>
                                        </div>
                                        <div className="mt-2 text-center hidden sm:block">
                                            <p className="text-xs text-muted-foreground">
                                                We'll display your public posts,
                                                you can select what you want to
                                                import
                                            </p>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center items-center h-16 w-16 text-white bg-primary-orange p-4 rounded-full animate-pulse">
                                        <Instagram className="w-full h-full" />
                                    </div>
                                    <div className="text-center">
                                        <h2 className="sm:text-xl">
                                            Importing Posts from @{username}
                                        </h2>
                                        <p className="text-xs sm:text-sm text-muted-foreground">
                                            Please wait while we fetch your
                                            Instagram content...
                                        </p>
                                    </div>
                                    <div className="mt-4 w-64 mx-auto bg-gray-200 rounded-full h-2">
                                        <div className="bg-primary-orange h-2 rounded-full animate-pulse w-3/4"></div>
                                    </div>
                                </>
                            )}
                        </Card>
                    )}

                    {instagramPosts.length > 0 && (
                        <Card>
                            <CardHeader>
                                <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div>
                                        <CardTitle>
                                            Select items from Instagram
                                        </CardTitle>
                                        <CardDescription>
                                            Click on posts to create products
                                            from them
                                        </CardDescription>
                                    </div>
                                    <div className="text-right w-full mt-2">
                                        <Button
                                            as={Link}
                                            href="/products"
                                            variant="outline"
                                            className="text-sm w-full sm:w-auto"
                                        >
                                            View All Products
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 md:gap-2">
                                    {instagramPosts.map((post) => (
                                        <div
                                            key={post.id}
                                            className="group relative aspect-square cursor-pointer"
                                            onClick={() =>
                                                handlePostClick(post)
                                            }
                                        >
                                            <img
                                                src={post.displayUrl}
                                                alt={
                                                    post.alt || "Instagram post"
                                                }
                                                className="w-full h-full object-cover"
                                            />
                                            {post.type === "Sidecar" &&
                                                post.images.length > 1 && (
                                                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                                                        +
                                                        {post.images.length - 1}
                                                    </div>
                                                )}
                                            {post.type === "Video" && (
                                                <div className="absolute top-2 right-2">
                                                    <svg
                                                        className="w-6 h-6 text-white"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 transition-all bg-black/0 group-hover:bg-black/20">
                                                <div className="absolute inset-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between">
                                                    <div className="text-sm line-clamp-3">
                                                        {post.caption}
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-sm">
                                                            {new Date(
                                                                post.timestamp,
                                                            ).toLocaleDateString()}
                                                        </div>
                                                        <div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center">
                                                            <Plus className="h-5 w-5 text-white" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Dialog
                                    open={!!selectedPost}
                                    onOpenChange={() =>
                                        selectedPost && closeModal()
                                    }
                                >
                                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle className="text-lg md:text-2xl flex items-center gap-2">
                                                <Package className="h-6 w-6" />
                                                Create Product
                                            </DialogTitle>
                                            <div className="mt-4 flex flex-col items-start gap-4">
                                                <small className="text-sm text-gray-500">
                                                    Posted on{" "}
                                                    {new Date(
                                                        selectedPost?.timestamp,
                                                    ).toLocaleDateString()}
                                                </small>
                                                <div className="w-24 h-24 rounded-lg overflow-hidden">
                                                    {selectedPost?.images
                                                        ?.length > 1 ? (
                                                        <div className="grid grid-cols-2">
                                                            {selectedPost.images.map(
                                                                (
                                                                    image,
                                                                    index,
                                                                ) => (
                                                                    <img
                                                                        key={
                                                                            index
                                                                        }
                                                                        src={
                                                                            image
                                                                        }
                                                                        alt={
                                                                            selectedPost?.alt
                                                                        }
                                                                        className="w-full h-full object-cover"
                                                                    />
                                                                ),
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={
                                                                selectedPost?.displayUrl
                                                            }
                                                            alt={
                                                                selectedPost?.alt
                                                            }
                                                            className="w-full h-full object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </DialogHeader>

                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-6 py-4"
                                        >
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="name">
                                                        Product name
                                                    </Label>
                                                    <Input
                                                        id="name"
                                                        type="text"
                                                        value={data.name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "name",
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.name}
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="description">
                                                        Description
                                                    </Label>
                                                    <MinimalTiptapEditor
                                                        content={
                                                            data.description
                                                        }
                                                        onChange={(content) =>
                                                            setData(
                                                                "description",
                                                                content,
                                                            )
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <Label htmlFor="price">
                                                        Price (
                                                        {currentStore?.currency}
                                                        )
                                                    </Label>
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        step="0.01"
                                                        min={currencyLimits.min}
                                                        max={currencyLimits.max}
                                                        value={data.price}
                                                        onChange={(e) =>
                                                            setData(
                                                                "price",
                                                                e.target.value,
                                                            )
                                                        }
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.price}
                                                    />
                                                </div>

                                                <div
                                                    className={`grid gap-4 ${data.quantity === "limited" ? "grid-cols-2" : "grid-cols-1"}`}
                                                >
                                                    <div>
                                                        <Label htmlFor="quantity">
                                                            Stock quantity
                                                        </Label>
                                                        <Input
                                                            as="select"
                                                            className={
                                                                "block pr-0 bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white w-full"
                                                            }
                                                            value={
                                                                data.quantity
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "quantity",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        >
                                                            <option
                                                                className="text-gray-900 dark:text-white"
                                                                value="unlimited"
                                                            >
                                                                Unlimited
                                                            </option>
                                                            <option
                                                                className="text-gray-900 dark:text-white"
                                                                value="limited"
                                                            >
                                                                Limited
                                                            </option>
                                                        </Input>
                                                    </div>

                                                    {data.quantity ===
                                                        "limited" && (
                                                        <div>
                                                            <Label htmlFor="quantity_items">
                                                                Quantity in
                                                                stock
                                                            </Label>
                                                            <Input
                                                                id="quantity_items"
                                                                type="number"
                                                                min="1"
                                                                className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                                                value={
                                                                    data.quantity_items
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "quantity_items",
                                                                        e.target
                                                                            .value,
                                                                    )
                                                                }
                                                                required
                                                                placeholder="Enter stock quantity"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.quantity
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <Label>
                                                        Product categories
                                                        (optional)
                                                    </Label>
                                                    <Select
                                                        isMulti
                                                        id="categories"
                                                        name="categories"
                                                        options={
                                                            categories?.map(
                                                                (category) => ({
                                                                    value: category.title,
                                                                    label: category.title,
                                                                }),
                                                            ) || []
                                                        }
                                                        value={data.categories}
                                                        onChange={(
                                                            selected,
                                                        ) => {
                                                            setData(
                                                                "categories",
                                                                selected,
                                                            );
                                                        }}
                                                        noOptionsMessage={() =>
                                                            "No categories found, type in the category name to create a new one."
                                                        }
                                                        placeholder="Select or create categories for this product"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.categories
                                                        }
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex justify-end gap-3 pt-4">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={closeModal}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    className="bg-primary-orange hover:bg-primary-orange/90"
                                                    disabled={processing}
                                                >
                                                    {processing ? (
                                                        <Package className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        "Create Product"
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </Layout>
    );
}
