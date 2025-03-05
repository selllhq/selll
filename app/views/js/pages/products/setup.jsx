import { Link, Head, useForm } from "@inertiajs/react";
import { ArrowRight, X } from "lucide-react";
import { slugify } from "@/utils";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { cn } from "@/utils";

const Setup = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        description: "",
        currency: "USD",
        price: "",
        quantity: "unlimited",
        quantity_items: ""
    });

    const submit = (e) => {
        e.preventDefault();

        post("/products/new");
    };

    return (
        <>
            <Head title="Create a new product" />

            <div className="flex flex-col justify-center items-center h-screen w-screen relative">
                <Button
                    as={Link}
                    href="/products"
                    className="cursor-pointer absolute top-5 md:top-12 right-5 md:right-12 bg-gray-100 hover:bg-gray-200 dark:bg-gray-400 dark:hover:bg-gray-500 p-2 rounded-full"
                >
                    <X className="md:size-6 text-black" />
                </Button>

                <h2 className="text-2xl md:text-4xl mb-2">
                    Tell users about your product
                </h2>
                <p>These are the details users would see on your shop.</p>

                <div className="w-full mt-12 max-w-xl min-w-0 rounded-3xl bg-default/60 p-2 shadow-xs backdrop-blur-sm bg-primary-red/10 dark:bg-white/60">
                    <form
                        onSubmit={submit}
                        className="space-y-6 w-full rounded-2xl p-10 bg-background"
                    >
                        <div className="grid gap-2">
                            <Label htmlFor="name">Product Name</Label>

                            <Input
                                id="name"
                                className="block w-full"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                required
                                placeholder="My Super Product"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.name}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">
                                Product description
                            </Label>

                            <Input
                                id="description"
                                as="textarea"
                                className="block w-full min-h-20"
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                required
                                placeholder="A brief description of your product"
                            />

                            <InputError
                                className="mt-2"
                                message={errors.description}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Price</Label>

                            <div className="flex gap-2">
                                <Input
                                    as="select"
                                    className="block w-24 pr-0"
                                    value={data.currency}
                                    onChange={(e) =>
                                        setData("currency", e.target.value)
                                    }
                                >
                                    <option value="USD">USD</option>
                                    <option value="GHS">GHS</option>
                                    <option value="NGN">NGN</option>
                                </Input>
                                <Input
                                    id="price"
                                    className="block w-full"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData("price", e.target.value)
                                    }
                                    required
                                    placeholder="0"
                                />
                            </div>

                            <InputError
                                className="mt-2"
                                message={errors.price ?? errors.quantity}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="price">Quantity</Label>

                            <div className="flex gap-2">
                                <Input
                                    as="select"
                                    className={cn("block pr-0", {
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
                                        className="block w-full"
                                        value={data.quantity_items}
                                        onChange={(e) =>
                                            setData("quantity_items", e.target.value)
                                        }
                                        required
                                        placeholder="0"
                                    />
                                )}
                            </div>

                            <InputError
                                className="mt-2"
                                message={errors.price ?? errors.quantity}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                className="bg-primary-red hover:bg-primary-red/80 text-white"
                                disabled={processing}
                            >
                                Add Images <ArrowRight size={16} />
                            </Button>

                            {/* <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-neutral-600">Saved</p>
                                        </Transition> */}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Setup;
