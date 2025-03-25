import { Link, Head, useForm } from "@inertiajs/react";
import { Store, X } from "lucide-react";
import { slugify } from "@/utils";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { Card, CardContent } from "@/components/shared/card";

const Setup = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: `${auth.user.name}'s Store`,
        slug: slugify(auth.user.name),
        description: "",
        currency: "USD",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/store/new");
    };

    return (
        <>
            <Head title="Create your new store" />

            <div className="h-screen w-full dark:bg-[#141414] flex">
                <div className="w-[60%] overflow-y-auto border-r border-[#2C2C2C] flex justify-center items-center">
                    <div className="max-w-2xl w-full mx-auto px-4 md:px-8 py-20 relative">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">
                                    Create Your Store
                                </h2>
                                <p className="text-muted-foreground">
                                    Let's get you selling in 2 minutes!
                                </p>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-10 pb-8">
                            <div className="space-y-3">
                                <Label htmlFor="name" className="text-sm block mb-1">Store Name</Label>
                                <Input
                                    id="name"
                                    className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    placeholder="My Super Store"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.name}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="slug" className="text-sm block mb-1">Store URL</Label>
                                <div className="relative">
                                    <Input
                                        id="slug"
                                        className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 pr-24"
                                        value={data.slug}
                                        onChange={(e) =>
                                            setData(
                                                "slug",
                                                slugify(e.target.value),
                                            )
                                        }
                                        required
                                        placeholder="myshopurl"
                                    />
                                    <div className="absolute top-0 right-0 px-4 h-full inline-flex items-center min-w-fit rounded-e-lg bg-[#3C3C3C] text-gray-400">
                                        <span className="text-sm">
                                            .selll.store
                                        </span>
                                    </div>
                                </div>
                                <InputError
                                    className="mt-2"
                                    message={errors.slug}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label htmlFor="description" className="text-sm block mb-1">
                                    Store Description
                                </Label>
                                <Input
                                    id="description"
                                    as="textarea"
                                    className="block w-full min-h-20 dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    required
                                    placeholder="Tell your customers what you sell..."
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>
                            
                            <div className="space-y-3">
                                <Label htmlFor="currency" className="text-sm block mb-1">
                                    Store Currency
                                </Label>
                                <Input
                                    id="currency"
                                    as="select"
                                    className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                    value={data.currency}
                                    onChange={(e) => setData("currency", e.target.value)}
                                    required
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="NGN">NGN - Nigerian Naira</option>
                                    <option value="GHS">GHS - Ghanaian Cedi</option>
                                    <option value="KES">KES - Kenyan Shilling</option>
                                    <option value="ZAR">ZAR - South African Rand</option>
                                    <option value="CAD">CAD - Canadian Dollar</option>
                                </Input>
                                <p className="text-xs text-muted-foreground mt-1">
                                    This currency will be used for all transactions in your store.
                                </p>
                                <InputError
                                    className="mt-2"
                                    message={errors.currency}
                                />
                            </div>

                            <Button
                                className="w-full bg-primary-orange hover:bg-primary-orange/90 text-white flex items-center justify-center gap-2"
                                disabled={processing}
                            >
                                <Store className="h-4 w-4" />
                                Create Store
                            </Button>

                            {/* <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">
                                    Saved
                                </p>
                            </Transition> */}
                        </form>
                    </div>
                </div>

                <div className="flex-1 bg-[#0C0C0C] p-20 sticky top-0 overflow-y-auto flex items-center justify-center">
                    <Button
                        as={Link}
                        href="/dashboard"
                        variant="outline"
                        className="bg-[#2C2C2C] hover:bg-[#3C3C3C] border-0 rounded-full h-12 w-12 fixed right-20 top-20 text-white"
                    >
                        <X className="h-4 w-4" />
                    </Button>

                    <div className="max-w-lg mx-auto space-y-6 w-full">
                        <Card className="border border-[#2C2C2C] bg-[#141414]">
                            <CardContent>
                                <div className="text-lg font-medium text-white mb-2">
                                    Store Preview
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-400">
                                            Your store URL will be:
                                        </div>
                                        <div className="text-white font-medium break-all bg-[#2C2C2C] p-2 rounded-lg mt-1">
                                            https://
                                            {data.slug || "yourstore"}
                                            .selll.store
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">
                                            Store name:
                                        </div>
                                        <div className="text-white font-medium">
                                            {data.name || "Your Store Name"}
                                        </div>
                                    </div>
                                    {data.description && (
                                        <div>
                                            <div className="text-sm text-gray-400">
                                                Description:
                                            </div>
                                            <div className="text-white">
                                                {data.description}
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-sm text-gray-400">
                                            Currency:
                                        </div>
                                        <div className="text-white font-medium">
                                            {data.currency}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="bg-[#141414] rounded-lg p-4 text-sm text-gray-400 border border-[#2C2C2C]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-white font-medium">
                                    Store Features
                                </span>
                            </div>
                            <ul className="space-y-2 ml-2">
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>Free .selll.store domain</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>
                                        Built-in payment processing (no Stripe
                                        needed)
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>Real-time analytics dashboard</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>
                                        Professional store management tools
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
