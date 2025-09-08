import { Head, useForm } from "@inertiajs/react";
import { ImagePlus, Package, AlertCircle } from "lucide-react";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { cn } from "@/utils";
import { useState, useEffect } from "react";
import Layout from "@/layouts/app-layout";
import { CURRENCY_LIMITS, CURRENCY_SYMBOLS } from "@/utils/store";
import PreviewImage from "@/components/products/preview-image";
import ProductPreview from "@/components/products/product-preview";
import Select from "@/components/form/creatable-select";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap";
import { PageHeader } from "@/components/layout/header";

const Setup = ({ currentStore, categories }) => {
    const [images, setImages] = useState([]);
    const [priceError, setPriceError] = useState("");
    const { data, setData, post, errors, processing } = useForm({
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

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 8 - images.length;

        if (remainingSlots <= 0) {
            alert("You've reached the maximum of 8 product images.");
            return;
        }

        const newImages = files.slice(0, remainingSlots);

        setImages([...images, ...newImages]);
        setData("images", [...images, ...newImages]);

        if (files.length > remainingSlots) {
            alert(
                `Added ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"}. You can add up to 8 images to showcase your product effectively.`,
            );
        }
    };

    useEffect(() => {
        if (data.price) {
            const price = parseFloat(data.price);
            if (price < currencyLimits.min) {
                setPriceError(
                    `Minimum price is ${currencySymbol}${currencyLimits.min}`,
                );
            } else if (price > currencyLimits.max) {
                setPriceError(
                    `Maximum price is ${currencySymbol}${currencyLimits.max}`,
                );
            } else {
                setPriceError("");
            }
        } else {
            setPriceError("");
        }
    }, [data.price, currencyLimits]);

    const submit = (e) => {
        e.preventDefault();

        const price = parseFloat(data.price);

        if (price < currencyLimits.min || price > currencyLimits.max) {
            return;
        }

        post("/products/new");
    };

    return (
        <Layout
            // breadcrumbs={[
            //     {
            //         title: "Products",
            //         href: "/products",
            //         icon: Package,
            //     },
            //     {
            //         title: "Create Product",
            //         href: "/products/setup",
            //         icon: Package,
            //     },
            // ]}
        >
            <Head title="Create a new product" />

            <div className="flex flex-col md:flex-row">
                <div className="flex-1 min-w-0 flex flex-col order-2 md:order-1">
                    <div className="flex-1 overflow-y-auto md:h-full md:max-h-[calc(100vh-20px)] pb-6">
                        <div className="max-w-2xl mx-auto px-6 pt-6 md:pt-12 pb-20 relative">
                            <PageHeader
                                title="Add Product"
                                description="Add a new product to your store"
                            />

                            <form
                                onSubmit={submit}
                                className="space-y-10 pb-16 md:pb-8 mt-8"
                            >
                                <div className="space-y-3">
                                    <Label htmlFor="images">
                                        Product Images
                                    </Label>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                        {images.map((image, index) => (
                                            <PreviewImage
                                                key={index}
                                                alt={`Product image ${index + 1}`}
                                                image={image}
                                                onRemove={() => {
                                                    const filteredImages =
                                                        images.filter(
                                                            (_, i) =>
                                                                i !== index,
                                                        );

                                                    setImages(filteredImages);

                                                    setData(
                                                        "images",
                                                        filteredImages,
                                                    );
                                                }}
                                            />
                                        ))}

                                        {images.length < 8 && (
                                            <label className="aspect-square rounded-3xl bg-gray-100 dark:bg-[#2C2C2C] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3C3C3C] transition-colors gap-2">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                <ImagePlus className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                                                {images.length >= 4 && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {8 - images.length}{" "}
                                                        remaining
                                                    </span>
                                                )}
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        className="rounded-xl block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        placeholder="e.g. Premium T-Shirt"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="description">
                                        Product Description
                                    </Label>
                                    {/* <Input
                                        id="description"
                                        as="textarea"
                                        className="block w-full min-h-20 bg-gray-100 dark:bg-[#2C2C2C] border-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        required
                                        placeholder="Describe your product..."
                                    /> */}
                                    <MinimalTiptapEditor
                                        id="description"
                                        value={data.description}
                                        onChange={(value) =>
                                            setData("description", value)
                                        }
                                        className="rounded-2xl block w-full min-h-20 bg-gray-100 dark:bg-[#2C2C2C] border-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                        editorContentClassName="p-5"
                                        output="html"
                                        placeholder="Describe your product..."
                                        autofocus={false}
                                        editable={true}
                                        editorClassName="focus:outline-hidden"
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="price">Price</Label>
                                    <div>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <span className="text-gray-500 dark:text-gray-400">
                                                    {Intl.NumberFormat(
                                                        "en-US",
                                                        {
                                                            style: "currency",
                                                            currency:
                                                                currentStore?.currency,
                                                        },
                                                    )
                                                        .format(0)
                                                        .replace("0.00", "")}
                                                </span>
                                            </div>
                                            <Input
                                                id="price"
                                                type="number"
                                                min={currencyLimits.min}
                                                max={currencyLimits.max}
                                                step="0.01"
                                                className={cn(
                                                    "rounded-xl block w-full pl-14 bg-gray-100 dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
                                                    {
                                                        "border-red-500 focus:ring-red-500":
                                                            priceError,
                                                    },
                                                )}
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData(
                                                        "price",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                placeholder="0.00"
                                            />
                                        </div>
                                    </div>
                                    {priceError && (
                                        <div className="flex items-center gap-1 mt-2 text-red-500 text-sm">
                                            <AlertCircle className="h-4 w-4" />
                                            <span>{priceError}</span>
                                        </div>
                                    )}
                                    <InputError
                                        className="mt-2"
                                        message={
                                            errors.price ?? errors.quantity
                                        }
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {currentStore?.currency} price limits:{" "}
                                        {currencySymbol}
                                        {currencyLimits.min} - {currencySymbol}
                                        {currencyLimits.max.toLocaleString()}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="quantity">
                                        Stock Management
                                    </Label>
                                    <div className="flex gap-2">
                                        <Input
                                            as="select"
                                            className={cn(
                                                "block pr-0 bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white",
                                                {
                                                    "w-24":
                                                        data.quantity ===
                                                        "limited",
                                                    "w-full":
                                                        data.quantity ===
                                                        "unlimited",
                                                },
                                            )}
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData(
                                                    "quantity",
                                                    e.target.value,
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
                                        {data.quantity === "limited" && (
                                            <Input
                                                id="quantity_items"
                                                type="number"
                                                min="1"
                                                className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                                value={data.quantity_items}
                                                onChange={(e) =>
                                                    setData(
                                                        "quantity_items",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                                placeholder="Enter stock quantity"
                                            />
                                        )}
                                    </div>
                                    <InputError
                                        className="mt-2"
                                        message={errors.quantity}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="quantity">
                                        Product categories (optional)
                                    </Label>
                                    <Select
                                        isMulti
                                        id="categories"
                                        name="categories"
                                        options={
                                            categories?.map((category) => ({
                                                value: category.title,
                                                label: category.title,
                                            })) || []
                                        }
                                        value={data.categories}
                                        onChange={(selected) => {
                                            setData("categories", selected);
                                        }}
                                        noOptionsMessage={() =>
                                            "No categories found, type in the category name to create a new one."
                                        }
                                        placeholder={(isFocused) =>
                                            isFocused
                                                ? "Start typing to search or create categories..."
                                                : "Select or create categories for this product"
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.quantity}
                                    />
                                </div>

                                <div className="flex gap-4 pt-8">
                                    <Button
                                        type="submit"
                                        className="bg-primary-orange hover:bg-primary-orange/90 min-w-[160px]"
                                        disabled={processing}
                                    >
                                        {processing && (
                                            <Package className="mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Create Product
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ProductPreview
                    product={data}
                    newImages={images}
                    currentStore={currentStore}
                />
            </div>
        </Layout>
    );
};

export default Setup;
