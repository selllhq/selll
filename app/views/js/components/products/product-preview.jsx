import { Package } from "lucide-react";
import Button from "../form/button";

const ProductPreview = ({ product, currentStore, newImages = {}, existingImages = {} }) => {
    return (
        <div className="hidden lg:block w-full md:w-[40%] lg:w-[35%] xl:w-[600px] h-auto max-h-[50vh] md:max-h-screen overflow-y-auto bg-gray-50 dark:bg-[#1A1A1A] border-t md:border-t-0 md:border-l border-gray-100 dark:border-[#2C2C2C] p-4 md:p-8 order-1 md:order-2 flex-shrink-0 sticky top-0">
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                Live Preview
            </div>
            <div className="space-y-4">
                <div className="bg-white dark:bg-[#2C2C2C] rounded-lg overflow-hidden shadow-lg border border-gray-100 dark:border-[#2C2C2C]">
                    <div className="aspect-[4/3] bg-gray-100 dark:bg-[#1A1A1A] relative group">
                        {existingImages.length > 0 || newImages.length > 0 ? (
                            <img
                                src={
                                    newImages.length > 0
                                        ? URL.createObjectURL(newImages[0])
                                        : existingImages[0]
                                }
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

                        {existingImages.length + newImages.length > 1 && (
                            <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                +{existingImages.length + newImages.length - 1}{" "}
                                more
                            </div>
                        )}
                    </div>

                    <div className="p-4 space-y-4">
                        <div>
                            <h3 className="text-lg font-medium">
                                {product.name || "Product Name"}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                                {product.description ||
                                    "Product description will appear here"}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-xl font-bold">
                                {Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: currentStore?.currency,
                                }).format(product.price || 0)}
                            </div>

                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {product.quantity === "limited"
                                    ? `${product.quantity_items || 0} in stock`
                                    : "Unlimited stock"}
                            </div>
                        </div>

                        <Button
                            type="button"
                            className="w-full bg-primary-orange hover:bg-primary-orange/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            disabled
                        >
                            Buy Now
                        </Button>
                    </div>
                </div>

                <div className="bg-white dark:bg-[#2C2C2C] rounded-lg p-4 border border-gray-100 dark:border-[#2C2C2C]">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        This is how your product will appear to customers on
                        your store page. The preview updates in real-time as you
                        make changes to your product details.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPreview;
