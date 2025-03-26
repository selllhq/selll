import { Link, Head, useForm } from "@inertiajs/react";
import { ImagePlus, Package, X, Store, AlertCircle } from "lucide-react";
import { slugify } from "@/utils";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { Card, CardContent } from "@/components/shared/card";
import { cn } from "@/utils";
import { useState, useEffect } from "react";
import Layout from "@/layouts/app-layout";

// Currency-specific price limits
const CURRENCY_LIMITS = {
    NGN: { min: 50, max: 10000000 },
    KES: { min: 1, max: 150000 }, // For M-Pesa customer wallets
    GHS: { min: 1, max: 100000 },
    USD: { min: 0.5, max: 999999.99 }, // Stripe default
    EUR: { min: 0.5, max: 999999.99 }, // Stripe default
    GBP: { min: 0.5, max: 999999.99 }, // Stripe default
    ZAR: { min: 0.5, max: 999999.99 }, // Stripe default
    CAD: { min: 0.5, max: 999999.99 }, // Stripe default
};

const Setup = ({ auth, currentStore }) => {
    const [images, setImages] = useState([]);
    const [priceError, setPriceError] = useState('');
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        description: '',
        price: '',
        quantity: 'unlimited',
        quantity_items: '',
        images: [],
    });

    // Get currency limits based on store's currency
    const currencyLimits = CURRENCY_LIMITS[currentStore?.currency] || CURRENCY_LIMITS.USD;
    const currencySymbol = {
        USD: '$',
        GHS: '₵',
        NGN: '₦',
        EUR: '€',
        GBP: '£',
        KES: 'KSh',
        ZAR: 'R',
        CAD: 'C$'
    }[currentStore?.currency || 'USD'];

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 8 - images.length;

        if (remainingSlots <= 0) {
            alert('You\'ve reached the maximum of 8 product images.');
            return;
        }

        const newImages = files.slice(0, remainingSlots);
        setImages([...images, ...newImages]);

        setData('images', [...images, ...newImages]);

        if (files.length > remainingSlots) {
            alert(
                `Added ${remainingSlots} more image${remainingSlots === 1 ? '' : 's'}. You can add up to 8 images to showcase your product effectively.`,
            );
        }
    };

    useEffect(() => {
        if (data.price) {
            const price = parseFloat(data.price);
            if (price < currencyLimits.min) {
                setPriceError(`Minimum price is ${currencySymbol}${currencyLimits.min}`);
            } else if (price > currencyLimits.max) {
                setPriceError(`Maximum price is ${currencySymbol}${currencyLimits.max}`);
            } else {
                setPriceError('');
            }
        } else {
            setPriceError('');
        }
    }, [data.price, currencyLimits]);

    const submit = (e) => {
        e.preventDefault();

        const price = parseFloat(data.price);

        if (price < currencyLimits.min || price > currencyLimits.max) {
            return;
        }

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('quantity', data.quantity);

        if (data.quantity === 'limited') {
            formData.append('quantity_items', data.quantity_items);
        }

        images.forEach((image, index) => {
            formData.append('images[]', image);
        });

        post('/products/new', formData);
    };

    return (
        <div className="flex flex-col md:flex-row h-screen w-full">
            <div className="flex-1 min-w-0 flex flex-col overflow-hidden order-2 md:order-1">
                <Layout
                    variant="sidebar"
                    className="dark:bg-[#141414] flex-1 flex flex-col"
                    breadcrumbs={[
                        {
                            title: "Products",
                            href: "/products",
                            icon: Package,
                        },
                        {
                            title: "Create Product",
                            href: "/products/setup",
                            icon: Package,
                        },
                    ]}
                >
                    <Head title="Create a new product" />

                    <div className="flex-1 overflow-y-auto bg-white dark:bg-[#141414]">
                        <div className="max-w-2xl px-6 py-6 relative">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-4xl font-bold mb-2">
                                        Create New Product
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        Add a new product to your store
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={submit} className="space-y-10 pb-8">
                                <div className="space-y-3">
                                    <Label htmlFor="images">
                                        Product Images
                                    </Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                        {images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="aspect-square rounded-lg bg-gray-100 dark:bg-[#2C2C2C] relative overflow-hidden"
                                            >
                                                <img
                                                    src={URL.createObjectURL(
                                                        image,
                                                    )}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const filteredImages = images.filter(
                                                            (_, i) => i !== index
                                                        );
                                                        setImages(filteredImages);
                                                        // Also update the form data
                                                        setData('images', filteredImages);
                                                    }}
                                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {images.length < 8 && (
                                            <label className="aspect-square rounded-lg bg-gray-100 dark:bg-[#2C2C2C] flex flex-col items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3C3C3C] transition-colors gap-2">
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
                                        className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
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
                                                <span className="text-gray-500 dark:text-gray-400">{currencySymbol}</span>
                                            </div>
                                            <Input
                                                id="price"
                                                type="number"
                                                min={currencyLimits.min}
                                                max={currencyLimits.max}
                                                step="0.01"
                                                className={cn("block w-full pl-8 bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400", {
                                                    "border-red-500 focus:ring-red-500": priceError
                                                })}
                                                value={data.price}
                                                onChange={(e) =>
                                                    setData("price", e.target.value)
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
                                        {currentStore?.currency} price limits: {currencySymbol}{currencyLimits.min} - {currencySymbol}{currencyLimits.max.toLocaleString()}
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

                                <div className="flex justify-end gap-4 pt-8">
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
                </Layout>
            </div>
            <div className="w-full md:w-[40%] lg:w-[35%] xl:w-[600px] h-[50vh] md:h-screen overflow-y-auto bg-gray-50 dark:bg-[#1A1A1A] border-t md:border-t-0 md:border-l border-gray-100 dark:border-[#2C2C2C] p-4 md:p-8 order-1 md:order-2 flex-shrink-0">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                    Live Preview
                </div>
                <div className="space-y-4">
                    <div className="bg-white dark:bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg border border-gray-100 dark:border-[#2C2C2C]">
                        {/* Product Preview */}
                        <div className="aspect-[4/3] bg-gray-100 dark:bg-[#1A1A1A] relative group">
                            {images.length > 0 ? (
                                <img
                                    src={URL.createObjectURL(images[0])}
                                    alt="Product preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                                    <Package className="w-12 h-12" />
                                    <p className="text-sm text-center">
                                        Add photos to showcase your product
                                    </p>
                                </div>
                            )}

                            {/* Image count badge */}
                            {images.length > 1 && (
                                <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                    +{images.length - 1} more
                                </div>
                            )}
                        </div>

                        <div className="p-4 space-y-4">
                            <div>
                                <h3 className="text-lg font-medium">
                                    {data.name || "Product Name"}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                    {data.description ||
                                        "Product description will appear here"}
                                </p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="text-xl font-bold">
                                    {currencySymbol}{data.price || "0.00"}
                                </div>

                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {data.quantity === "limited"
                                        ? `${data.quantity_items || 0} in stock`
                                        : "Unlimited stock"}
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full bg-primary-orange hover:bg-primary-orange/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                disabled
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-4 border border-gray-100 dark:border-[#2C2C2C]">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            This is how your product will appear to customers on
                            your store page. The preview updates in real-time as
                            you make changes to your product details.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Setup;
