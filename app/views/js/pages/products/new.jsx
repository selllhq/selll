import Layout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shared/card";
import { Input } from "@/components/form/input";
import { Textarea } from "@/components/form/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/form/select";
import Button from "@/components/form/button";
import { ImagePlus, Loader2 } from "lucide-react";

export default function NewProduct({ currentStore }) {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        currency: "USD",
        quantity: "unlimited",
        quantity_items: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        images.forEach((image) => {
            formData.append("images[]", image);
        });

        router.post("/products", formData, {
            onFinish: () => setLoading(false),
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setImages([...images, ...files]);
    };

    return (
        <Layout
            variant="sidebar"
            breadcrumbs={[
                {
                    title: "Products",
                    href: "/products",
                },
                {
                    title: "New Product",
                    href: "/products/new",
                },
            ]}
        >
            <Head title={`New Product - ${currentStore?.name}`} />

            <div className="py-4 px-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Product</CardTitle>
                        <CardDescription>Add a new product to your store</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Product Images
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
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
                                            </div>
                                        ))}
                                        <label className="aspect-square rounded-lg bg-[#2C2C2C] flex items-center justify-center cursor-pointer hover:bg-[#3C3C3C] transition-colors">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={handleImageUpload}
                                                className="hidden"
                                            />
                                            <ImagePlus className="h-8 w-8 text-gray-400" />
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Product Name
                                    </label>
                                    <Input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData({ ...data, name: e.target.value })
                                        }
                                        placeholder="e.g. Premium T-Shirt"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Description
                                    </label>
                                    <Textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData({ ...data, description: e.target.value })
                                        }
                                        placeholder="Describe your product..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Price
                                        </label>
                                        <Input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData({ ...data, price: e.target.value })
                                            }
                                            placeholder="0.00"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Currency
                                        </label>
                                        <Select
                                            value={data.currency}
                                            onValueChange={(value) =>
                                                setData({ ...data, currency: value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select currency" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USD">USD ($)</SelectItem>
                                                <SelectItem value="EUR">EUR (€)</SelectItem>
                                                <SelectItem value="GBP">GBP (£)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Stock Management
                                    </label>
                                    <Select
                                        value={data.quantity}
                                        onValueChange={(value) => {
                                            setData({
                                                ...data,
                                                quantity: value,
                                                quantity_items: value === "limited" ? "1" : "",
                                            });
                                        }}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select stock type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unlimited">Unlimited</SelectItem>
                                            <SelectItem value="limited">Limited Stock</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {data.quantity === "limited" && (
                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Number of Items in Stock
                                        </label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={data.quantity_items}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    quantity_items: e.target.value,
                                                })
                                            }
                                            placeholder="Enter stock quantity"
                                            required
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.get("/products")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-primary-orange hover:bg-primary-orange/90"
                                    disabled={loading}
                                >
                                    {loading && (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Create Product
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
}
