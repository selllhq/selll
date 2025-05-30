import { Head, useForm } from "@inertiajs/react";
import { ImagePlus, Package, AlertCircle } from "lucide-react";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { cn } from "@/utils";
import { useState, useEffect } from "react";
import Layout from "@/layouts/app-layout";
import {
    CURRENCY_LIMITS,
    CURRENCY_SYMBOLS,
    parseProductImages,
} from "@/utils/store";
import PreviewImage from "@/components/products/preview-image";
import ProductPreview from "@/components/products/product-preview";
import Select from "@/components/form/creatable-select";

const EditProduct = ({ currentStore, product }) => {
    const [priceError, setPriceError] = useState("");
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const { data, setData, post, errors, processing } = useForm({
        name: product?.name || "",
        description: product?.description || "",
        price: product?.price || "",
        quantity: product?.quantity || "unlimited",
        quantity_items: product?.quantity_items || "",
        images: [],
        images_to_delete: [],
        categories:
            product?.categories?.map((category) => ({
                value: category.title,
                label: category.title,
            })) || [],
    });

    const currencyLimits =
        CURRENCY_LIMITS[currentStore?.currency] || CURRENCY_LIMITS.USD;
    const currencySymbol = CURRENCY_SYMBOLS[currentStore?.currency || "USD"];

    useEffect(() => {
        setExistingImages(parseProductImages(product.images));
    }, [product]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 8 - (existingImages.length + newImages.length);

        if (remainingSlots <= 0) {
            alert("You've reached the maximum of 8 product images.");
            return;
        }

        const uploadedImages = files.slice(0, remainingSlots);
        setNewImages([...newImages, ...uploadedImages]);
        setData("images", [...newImages, ...uploadedImages]);

        if (files.length > remainingSlots) {
            alert(
                `Added ${remainingSlots} more image${remainingSlots === 1 ? "" : "s"}. You can add up to 8 images to showcase your product effectively.`,
            );
        }
    };

    const handleRemoveExistingImage = (index) => {
        const imageToRemove = existingImages[index];
        const updatedExistingImages = existingImages.filter(
            (_, i) => i !== index,
        );

        setExistingImages(updatedExistingImages);
        setImagesToDelete([...imagesToDelete, imageToRemove]);
        setData("images_to_delete", [...imagesToDelete, imageToRemove]);
    };

    const handleRemoveNewImage = (index) => {
        const updatedNewImages = newImages.filter((_, i) => i !== index);

        setNewImages(updatedNewImages);
        setData("images", updatedNewImages);
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

        post(`/products/${product.id}/edit`);
    };

    return (
        <Layout
            variant="header"
            className="max-h-screen h-full overflow-hidden mt-0"
            breadcrumbs={[
                {
                    title: "Products",
                    href: "/products",
                    icon: Package,
                },
                {
                    title: product?.name,
                    href: `/products/${product.id}`,
                },
                {
                    title: "Edit",
                    href: `/products/${product.id}/edit`,
                    icon: Package,
                },
            ]}
        >
            <Head title={`Edit Product: ${product?.name}`} />

            <div className="flex flex-col md:flex-row h-full w-full overflow-y-auto lg:overflow-hidden pt-28">
                <div className="flex-1 min-w-0 flex flex-col order-2 md:order-1">
                    <div className="flex-1 overflow-y-auto pb-6">
                        <div className="max-w-2xl px-6 py-20 relative">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">
                                        Edit Product
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Update your product details
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-10 pb-8">
                                <div className="space-y-3">
                                    <Label htmlFor="images">
                                        Product Images
                                    </Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                        {existingImages.map((image, index) => (
                                            <PreviewImage
                                                key={`existing-${index}`}
                                                alt={`Product image ${index + 1}`}
                                                image={image}
                                                onRemove={() =>
                                                    handleRemoveExistingImage(
                                                        index,
                                                    )
                                                }
                                            />
                                        ))}

                                        {newImages.map((image, index) => (
                                            <PreviewImage
                                                key={`new-${index}`}
                                                alt={`New image ${index + 1}`}
                                                image={image}
                                                onRemove={() =>
                                                    handleRemoveNewImage(index)
                                                }
                                            />
                                        ))}

                                        {existingImages.length +
                                            newImages.length <
                                            8 && (
                                            <label className="aspect-square rounded-lg bg-gray-100 dark:bg-[#2C2C2C] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3C3C3C] transition-colors gap-2">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                <ImagePlus className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                                                {existingImages.length +
                                                    newImages.length >=
                                                    4 && (
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {8 -
                                                            (existingImages.length +
                                                                newImages.length)}{" "}
                                                        remaining
                                                    </span>
                                                )}
                                            </label>
                                        )}
                                    </div>
                                    <InputError
                                        className="mt-2"
                                        message={errors.upload}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        className="block w-full bg-gray-100 dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                                    <Input
                                        id="description"
                                        as="textarea"
                                        className="block w-full min-h-20 bg-gray-100 dark:bg-[#2C2C2C] dark:border-0 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        required
                                        placeholder="Describe your product..."
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
                                                    "block w-full pl-14 bg-gray-100 dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400",
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
                                                "block pr-0 bg-gray-100 dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white",
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
                                                className="block w-full bg-gray-100 dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                                        Product categories
                                    </Label>
                                    <Select
                                        isMulti
                                        id="categories"
                                        name="categories"
                                        options={product.categories.map(
                                            (category) => ({
                                                value: category.title,
                                                label: category.title,
                                            }),
                                        )}
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
                                        Update Product
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <ProductPreview
                    product={data}
                    newImages={newImages}
                    existingImages={existingImages}
                    currentStore={currentStore}
                />
            </div>
        </Layout>
    );
};

export default EditProduct;
