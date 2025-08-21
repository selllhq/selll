import { Link, Head, useForm } from "@inertiajs/react";

import Button from "@/components/form/button";
import { Card } from "@/components/shared/card";
import Input from "@/components/form/input";
import InputError from "@/components/form/input-error";
import Label from "@/components/form/label";

const Affiliates = ({ product, banks, mobileMoney }) => {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        email: "",
        phone: "",
        commission: "",
        type: "momo",
        provider: null,
        account_number: "",
        product: product.id,
    });

    const providers = {
        momo: mobileMoney,
        bank: banks,
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.provider) {
            alert("Please select a provider.");
            return;
        }

        if (data.account_number === "") {
            setData("account_number", data.phone);
        }

        post("/affiliates/setup");
    };

    return (
        <>
            <Head
                title={`Promote ${product.name}`}
                meta={[
                    {
                        name: "description",
                        content: `Promote ${product.name} and earn commissions on every sale.`,
                    },
                ]}
            />

            <header className="py-4 px-0 fixed top-0 left-0 w-full bg-background shadow-xs dark:shadow-primary-orange/20 z-50 backdrop-blur-2xl backdrop-opacity-20 flex justify-center items-center">
                <Link href="/affiliates" className="flex items-center gap-2">
                    <img
                        src="/assets/img/logo/text.png"
                        className="dark:hidden w-16"
                        alt="Selll"
                    />
                    <img
                        src="/assets/img/logo/text-white-alt.png"
                        className="hidden dark:block w-16"
                        alt="Selll"
                    />
                </Link>
            </header>

            <main className="pt-20 px-4 md:px-6">
                <div className="max-w-3xl mx-auto">
                    <Card className="p-0 rounded-3xl !bg-background !ring-0">
                        <img
                            src={
                                JSON.parse(product.images ?? "[]")[0] ??
                                "/assets/img/placeholder.png"
                            }
                            alt={product.name}
                            className="w-full object-cover mb-4 rounded-xl ring ring-muted-foreground/40"
                        />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                            {product.name} -{" "}
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "GHS",
                            }).format(product.price)}
                        </h3>
                        <p
                            className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-6"
                            dangerouslySetInnerHTML={{
                                __html:
                                    product.description ||
                                    "No description available.",
                            }}
                        ></p>
                        <p>
                            by{" "}
                            <a
                                href={`https://${product.store.slug}.selll.store`}
                                className="underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {product.store.name}
                            </a>
                        </p>

                        <div className="mt-12 py-6">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                                Become an Affiliate
                            </h3>

                            {data.commission > product.price * 0.5 && (
                                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg text-yellow-800 dark:text-yellow-200">
                                    <p>
                                        ⚠️ Note: Setting a high commission might
                                        make customers reluctant to purchase due
                                        to the increased price.
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label
                                        htmlFor="name"
                                        className="block text-xs font-medium mb-2"
                                    >
                                        Name
                                    </Label>
                                    <Input
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => {
                                            setData("name", e.target.value);
                                        }}
                                        placeholder="Your Name"
                                        className="w-full dark:bg-[#141414] dark:border-[#333]"
                                        required
                                    />
                                    {errors.name && (
                                        <InputError message={errors.name} />
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="block text-xs font-medium mb-2"
                                    >
                                        Email Address
                                    </Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => {
                                            setData("email", e.target.value);
                                        }}
                                        placeholder="your@email.com"
                                        className="w-full dark:bg-[#141414] dark:border-[#333]"
                                        required
                                    />
                                    {errors.email && (
                                        <InputError message={errors.email} />
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="phone"
                                        className="block text-xs font-medium mb-2"
                                    >
                                        Phone Number
                                    </Label>
                                    <Input
                                        type="tel"
                                        name="phone"
                                        value={data.phone}
                                        onChange={(e) => {
                                            setData("phone", e.target.value);
                                        }}
                                        placeholder="e.g., 024xxxxxxx"
                                        className="w-full dark:bg-[#141414] dark:border-[#333]"
                                        required
                                    />
                                    {errors.phone && (
                                        <InputError message={errors.phone} />
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="commission"
                                        className="block text-xs font-medium mb-2"
                                    >
                                        Your Commission (GHS)
                                    </Label>
                                    <Input
                                        type="number"
                                        name="commission"
                                        value={data.commission}
                                        onChange={(e) => {
                                            setData(
                                                "commission",
                                                e.target.value,
                                            );
                                        }}
                                        error={errors.commission}
                                        placeholder="20"
                                        className="w-full dark:bg-[#141414] dark:border-[#333]"
                                        min="0"
                                        step="0.01"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Selll takes a 3% transaction fee on
                                        commissions.
                                    </p>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="type"
                                        className="block text-xs font-medium mb-2"
                                    >
                                        Where should we send your earnings?
                                    </Label>
                                    <Input
                                        as="select"
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => {
                                            setData("type", e.target.value);
                                        }}
                                        className="w-full dark:bg-[#141414] dark:border-[#333]"
                                        required
                                    >
                                        <option value="momo">
                                            Mobile Money
                                        </option>
                                        <option value="bank">
                                            Bank Account
                                        </option>
                                    </Input>
                                    {errors.type && (
                                        <InputError message={errors.type} />
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="provider"
                                        className="block text-xs font-medium mb-2"
                                    >
                                        {data.type === "momo"
                                            ? "Mobile Money Provider"
                                            : "Bank Name"}
                                    </Label>
                                    <Input
                                        as="select"
                                        id="provider"
                                        value={data.provider}
                                        onChange={(e) => {
                                            setData("provider", e.target.value);
                                        }}
                                        className="w-full dark:bg-[#141414] dark:border-[#333]"
                                    >
                                        <option value="">
                                            Select{" "}
                                            {data.type === "momo"
                                                ? "provider"
                                                : "bank"}
                                        </option>
                                        {(providers[data.type] || []).map(
                                            (prov) => (
                                                <option
                                                    key={prov.slug}
                                                    value={`${prov.code}:${prov.name}`}
                                                >
                                                    {prov.name}
                                                </option>
                                            ),
                                        )}
                                    </Input>
                                    {errors.provider && (
                                        <InputError message={errors.provider} />
                                    )}
                                </div>

                                <div>
                                    <Label
                                        htmlFor="account_number"
                                        className="block text-xs font-medium mb-2"
                                    >
                                        {data.type === "momo"
                                            ? "Mobile Money Number"
                                            : "Account Number"}
                                    </Label>
                                    <Input
                                        id="account_number"
                                        type="text"
                                        value={
                                            data.account_number
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "account_number",
                                                e.target.value,
                                            )
                                        }
                                        placeholder={
                                            data.type === "momo"
                                                ? "e.g. 024xxxxxxx"
                                                : "e.g. 1234567890123"
                                        }
                                        className="dark:bg-[#141414] dark:border-[#333]"
                                    />
                                    {errors.account_number ? (
                                        <InputError
                                            message={errors.account_number}
                                        />
                                    ) : (
                                        <>
                                            {data.account_number.length > 8 && (
                                                <small className="text-muted-foreground">
                                                    Double-check your details
                                                    before submitting, funds
                                                    cannot be reversed once
                                                    sent.
                                                </small>
                                            )}
                                        </>
                                    )}
                                </div>

                                <div className="p-4 bg-gray-100 dark:bg-muted rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">
                                            Final Price:
                                        </span>
                                        <span className="text-lg font-bold text-primary-orange">
                                            {new Intl.NumberFormat("en-GH", {
                                                style: "currency",
                                                currency: "GHS",
                                            }).format(
                                                parseFloat(product.price) +
                                                    (parseFloat(
                                                        data.commission,
                                                    ) || 0),
                                            )}
                                        </span>
                                    </div>
                                    {data.commission && (
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            (Product:{" "}
                                            {new Intl.NumberFormat("en-GH", {
                                                style: "currency",
                                                currency: "GHS",
                                            }).format(
                                                parseFloat(product.price),
                                            )}{" "}
                                            + Commission:{" "}
                                            {new Intl.NumberFormat("en-GH", {
                                                style: "currency",
                                                currency: "GHS",
                                            }).format(
                                                parseFloat(data.commission) ||
                                                    0,
                                            )}
                                            )
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 pb-12">
                                    <Button
                                        loading={processing}
                                        type="submit"
                                        className="w-full"
                                    >
                                        Generate Affiliate Link
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </main>
        </>
    );
};

export default Affiliates;
