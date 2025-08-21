import { useState } from "react";
import { Wallet } from "lucide-react";

import Button from "../form/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../layout/sheet";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useForm, usePage } from "@inertiajs/react";
import Label from "../form/label";
import Input from "../form/input";
import InputError from "../form/input-error";
import { CURRENCY_LIMITS } from "@/utils/store";

const CreatePaylink = ({ store }) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button
                variant="outline"
                className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C] hover:text-neutral-200 w-full md:w-auto"
                onClick={() => setShow(true)}
            >
                <Wallet className="h-4 w-4" />
                Payment Link
            </Button>

            {window.innerWidth > 580 ? (
                <Dialog open={show} onOpenChange={() => setShow(false)}>
                    <DialogContent className="sm:max-w-[425px] hidden sm:block rounded-3xl p-8">
                        <DialogHeader>
                            <DialogTitle>Create Selll Link</DialogTitle>
                            <DialogDescription>
                                Create a link for a custom order.
                            </DialogDescription>
                        </DialogHeader>
                        <PaylinkForm store={store} />
                    </DialogContent>
                </Dialog>
            ) : (
                <Sheet open={show} onOpenChange={() => setShow(false)}>
                    <SheetContent
                        side="bottom"
                        className="w-screen sm:hidden min-h-[90vh] rounded-t-3xl"
                    >
                        <SheetHeader>
                            <SheetTitle>Create Selll Link</SheetTitle>
                            <SheetDescription>
                                Create a link for a custom order.
                            </SheetDescription>
                        </SheetHeader>
                        <PaylinkForm store={store} />
                    </SheetContent>
                </Sheet>
            )}
        </>
    );
};

const PaylinkForm = ({ store }) => {
    const { customers, products } = usePage().props;
    const { data, setData, post, errors, processing } = useForm({
        customer: "",
        customer_id: "",
        use_amount: false,
        amount: "",
        products: [],
    });

    const currencyLimits =
        CURRENCY_LIMITS[store?.currency] || CURRENCY_LIMITS.USD;

    const submit = (e) => {
        e.preventDefault();

        const price = parseFloat(data.amount);

        if (price < currencyLimits.min || price > currencyLimits.max) {
            return;
        }

        if (!data.customer_id && !data.customer) {
            alert(
                "Please select a customer or provide an email to create a paylink.",
            );
            return;
        }

        if (!data.use_amount && data.products.length === 0) {
            alert("Please select at least one product or use a custom amount.");
            return;
        }

        if (data.use_amount && !data.amount) {
            alert("Please enter a valid amount.");
            return;
        }

        post("/paylinks/new");
    };

    return (
        <form onSubmit={submit} className="mt-4 space-y-4">
            <div className="space-y-3">
                <Label htmlFor="customer_id">Customer</Label>
                <Select
                    onValueChange={(value) => {
                        setData("customer_id", value);
                    }}
                >
                    <SelectTrigger className="w-full rounded-xl">
                        <SelectValue
                            placeholder="Select Customer"
                            value={data.customer_id}
                        />
                    </SelectTrigger>
                    <SelectContent>
                        {customers.map((customer) => (
                            <SelectItem
                                key={customer.id}
                                value={`${customer.id}`}
                            >
                                {customer.name} ({customer.email})
                            </SelectItem>
                        ))}
                        <SelectItem value="custom">
                            Add a new customer
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {data.customer_id === "custom" && (
                <div className="space-y-3">
                    <Label htmlFor="customer">Customer Email</Label>
                    <Input
                        id="customer"
                        className="rounded-xl block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        value={data.customer}
                        onChange={(e) => setData("customer", e.target.value)}
                        required
                        placeholder="e.g. user@mail.com"
                    />
                    {errors.customer ? (
                        <InputError
                            className="mt-2"
                            message={errors.customer}
                        />
                    ) : (
                        <small className="text-muted-foreground">
                            You can add other details later.
                        </small>
                    )}
                </div>
            )}

            <div className="inline-flex items-center justify-center w-full p-1 bg-gray-100 dark:bg-neutral-800 rounded-xl mb-4">
                <button
                    type="button"
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                        !data.use_amount
                            ? "bg-white dark:bg-neutral-700 shadow-sm text-gray-900 dark:text-white"
                            : "text-gray-500 dark:text-gray-400 hover:text-neutral-700 dark:hover:text-gray-200"
                    }`}
                    onClick={() => setData("use_amount", false)}
                >
                    Products
                </button>
                <button
                    type="button"
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
                        data.use_amount
                            ? "bg-white dark:bg-neutral-700 shadow-sm text-gray-900 dark:text-white"
                            : "text-gray-500 dark:text-gray-400 hover:text-neutral-700 dark:hover:text-gray-200"
                    }`}
                    onClick={() => setData("use_amount", true)}
                >
                    Custom Amount
                </button>
            </div>

            {products?.length === 0 || data.use_amount ? (
                <div className="space-y-3">
                    <Label htmlFor="amount">Amount</Label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-gray-500 dark:text-gray-400">
                                $
                            </span>
                        </div>
                        <Input
                            id="amount"
                            type="number"
                            className="rounded-xl block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 pl-8"
                            placeholder="0.00"
                            value={data.amount}
                            onChange={(e) => setData("amount", e.target.value)}
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>
                    {errors.amount && (
                        <InputError className="mt-2" message={errors.amount} />
                    )}
                </div>
            ) : (
                <div className="space-y-3">
                    <Label>Select Products</Label>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {products && products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-3 rounded-3xl border border-gray-200 dark:border-neutral-700"
                                >
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            id={`product-${product.id}`}
                                            className="h-4 w-4 rounded border-gray-300 text-primary-orange focus:ring-primary-orange"
                                            onChange={(e) => {
                                                const isChecked =
                                                    e.target.checked;
                                                setData(
                                                    "products",
                                                    isChecked
                                                        ? [
                                                              ...data.products,
                                                              {
                                                                  id: product.id,
                                                                  quantity: 1,
                                                                  price: parseFloat(
                                                                      product.price,
                                                                  ),
                                                              },
                                                          ]
                                                        : data.products.filter(
                                                              (p) =>
                                                                  p.id !==
                                                                  product.id,
                                                          ),
                                                );
                                            }}
                                            checked={data.products.some(
                                                (p) => p.id === product.id,
                                            )}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <label
                                                htmlFor={`product-${product.id}`}
                                                className="block text-sm font-medium text-gray-900 dark:text-white cursor-pointer"
                                            >
                                                {product.name}
                                            </label>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency:
                                                            store.currency,
                                                    },
                                                ).format(product.price)}
                                            </p>
                                        </div>
                                    </div>
                                    {data.products.some(
                                        (p) => p.id === product.id,
                                    ) && (
                                        <div className="flex items-center space-x-2">
                                            <button
                                                type="button"
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                                                onClick={() => {
                                                    const updatedProducts =
                                                        data.products.map(
                                                            (p) =>
                                                                p.id ===
                                                                    product.id &&
                                                                p.quantity > 1
                                                                    ? {
                                                                          ...p,
                                                                          quantity:
                                                                              p.quantity -
                                                                              1,
                                                                      }
                                                                    : p,
                                                        );
                                                    setData(
                                                        "products",
                                                        updatedProducts,
                                                    );
                                                }}
                                            >
                                                -
                                            </button>
                                            <span className="w-8 text-center">
                                                {data.products.find(
                                                    (p) => p.id === product.id,
                                                )?.quantity || 1}
                                            </span>
                                            <button
                                                type="button"
                                                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
                                                disabled={
                                                    product.quantity ===
                                                        "limited" &&
                                                    data.products.find(
                                                        (p) =>
                                                            p.id === product.id,
                                                    )?.quantity >=
                                                        parseInt(
                                                            product.quantity_items,
                                                        )
                                                }
                                                onClick={() => {
                                                    const updatedProducts =
                                                        data.products.map(
                                                            (p) =>
                                                                p.id ===
                                                                product.id
                                                                    ? {
                                                                          ...p,
                                                                          quantity:
                                                                              (p.quantity ||
                                                                                  1) +
                                                                              1,
                                                                      }
                                                                    : p,
                                                        );
                                                    setData(
                                                        "products",
                                                        updatedProducts,
                                                    );
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                No products available
                            </p>
                        )}
                    </div>
                    {data.products.length > 0 && (
                        <div className="pt-2 border-t border-gray-200 dark:border-neutral-700">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Total:{" "}
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: store.currency,
                                }).format(
                                    data.products
                                        .reduce((sum, item) => {
                                            return (
                                                sum +
                                                parseFloat(item.price) *
                                                    (item.quantity || 1)
                                            );
                                        }, 0)
                                        .toFixed(2),
                                )}
                            </p>
                        </div>
                    )}
                </div>
            )}

            <div className="mt-auto">
                <Button loading={processing} className="w-full">
                    Create Link
                </Button>
            </div>
        </form>
    );
};

export default CreatePaylink;
