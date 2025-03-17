import { Link, Head, useForm } from "@inertiajs/react";
import { ImagePlus, Package, X } from "lucide-react";
import { slugify } from "@/utils";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { Card, CardContent } from "@/components/shared/card";
import { cn } from "@/utils";
import { useState } from "react";

const Setup = ({ auth }) => {
    const [images, setImages] = useState([]);
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        currency: "USD",
        price: "",
        quantity: "unlimited",
        quantity_items: ""
    });

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const remainingSlots = 8 - images.length;

        if (remainingSlots <= 0) {
            alert("You've reached the maximum of 8 product images. This helps keep your product page clean and focused.");
            return;
        }

        const newImages = files.slice(0, remainingSlots);
        setImages([...images, ...newImages]);

        if (files.length > remainingSlots) {
            alert(`Added ${remainingSlots} more image${remainingSlots === 1 ? '' : 's'}. You can add up to 8 images to showcase your product effectively.`);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post("/products/new");
    };

    return (
        <>
            <Head title="Create a new product" />

            <div className="h-screen w-full bg-[#141414] flex">
                <div className="w-[60%] overflow-y-auto">
                    <div className="max-w-2xl mx-auto px-4 md:px-8 py-20 relative">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">Create New Product</h2>
                                <p className="text-gray-400">Add a new product to your store</p>
                            </div>
                            <Button
                                as={Link}
                                href="/products"
                                variant="outline"
                                className="bg-[#2C2C2C] hover:bg-[#3C3C3C] border-0 rounded-full h-12 w-12"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        <form onSubmit={submit} className="space-y-10 pb-8">
                                <div className="space-y-3">
                                    <Label htmlFor="images">Product Images</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                                        {images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="aspect-square rounded-lg bg-[#2C2C2C] relative overflow-hidden"
                                            >
                                                <img
                                                    src={URL.createObjectURL(image)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setImages(images.filter((_, i) => i !== index))}
                                                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                        {images.length < 8 && (
                                            <label className="aspect-square rounded-lg bg-[#2C2C2C] flex flex-col items-center justify-center cursor-pointer hover:bg-[#3C3C3C] transition-colors gap-2">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                                <ImagePlus className="h-8 w-8 text-gray-400" />
                                                {images.length >= 4 && (
                                                    <span className="text-xs text-gray-400">{8 - images.length} remaining</span>
                                                )}
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input
                                        id="name"
                                        className="block w-full bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
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
                                    <Label htmlFor="description">Product Description</Label>
                                    <Input
                                        id="description"
                                        as="textarea"
                                        className="block w-full min-h-20 bg-[#2C2C2C] border-0"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData("description", e.target.value)
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
                                    <div className="flex gap-2">
                                        <Input
                                            as="select"
                                            className="block w-24 pr-0 bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                            value={data.currency}
                                            onChange={(e) =>
                                                setData("currency", e.target.value)
                                            }
                                        >
                                            <option value="USD">USD ($)</option>
                                            <option value="GHS">GHS (₵)</option>
                                            <option value="NGN">NGN (₦)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                        </Input>
                                        <Input
                                            id="price"
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            className="block w-full bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            required
                                            placeholder="0.00"
                                        />
                                    </div>
                                    <InputError
                                        className="mt-2"
                                        message={errors.price ?? errors.quantity}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="quantity">Stock Management</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            as="select"
                                            className={cn("block pr-0 bg-[#2C2C2C] border-0 focus:ring-primary-orange/20", {
                                                "w-24": data.quantity === "limited",
                                                "w-full": data.quantity === "unlimited",
                                            })}
                                            value={data.quantity}
                                            onChange={(e) =>
                                                setData("quantity", e.target.value)
                                            }
                                        >
                                            <option value="unlimited">Unlimited</option>
                                            <option value="limited">Limited</option>
                                        </Input>
                                        {data.quantity === "limited" && (
                                            <Input
                                                id="quantity_items"
                                                type="number"
                                                min="1"
                                                className="block w-full bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                value={data.quantity_items}
                                                onChange={(e) =>
                                                    setData("quantity_items", e.target.value)
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
                <div className="w-[40%] fixed right-0 top-0 h-screen overflow-y-auto bg-[#1A1A1A] border-l border-[#2C2C2C] p-8">
                    <div className="text-sm font-medium text-gray-400 mb-4">Live Preview</div>
                    <div className="space-y-4">
                        <div className="bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg">
                            {/* Product Preview */}
                            <div className="aspect-[4/3] bg-[#1A1A1A] relative group">
                                {images.length > 0 ? (
                                    <img
                                        src={URL.createObjectURL(images[0])}
                                        alt="Product preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-500">
                                        <Package className="w-12 h-12" />
                                        <p className="text-sm text-center">Add photos to showcase your product</p>
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
                                    <h3 className="text-lg font-medium text-white">
                                        {data.name || "Product Name"}
                                    </h3>
                                    <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                                        {data.description || "Product description will appear here"}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="text-xl font-bold text-white">
                                        {data.currency === "USD" && "$"}
                                        {data.currency === "GHS" && "₵"}
                                        {data.currency === "NGN" && "₦"}
                                        {data.currency === "EUR" && "€"}
                                        {data.currency === "GBP" && "£"}
                                        {data.price || "0.00"}
                                    </div>

                                    <div className="text-sm text-gray-400">
                                        {data.quantity === "limited" ?
                                            `${data.quantity_items || 0} in stock` :
                                            "Unlimited stock"}
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

                        <div className="bg-[#2C2C2C] rounded-lg p-4">
                            <div className="text-sm text-gray-400">
                                This is how your product will appear to customers on your store page.
                                The preview updates in real-time as you make changes to your product details.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
