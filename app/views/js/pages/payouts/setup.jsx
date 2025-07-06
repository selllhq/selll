import { Head, router, useForm } from "@inertiajs/react";
import Layout from "@/layouts/app-layout";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import InputError from "@/components/form/input-error";
import {
    AlertTriangle,
    ArrowDownCircle,
    CreditCard,
    Wallet,
    Banknote,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import { toast } from "sonner";

export default function PayoutSetupPage({ banks, mobileMoney }) {
    const { data, setData, post, errors, processing } = useForm({
        type: "momo",
        provider: null,
        account_number: "",
    });

    const providers = {
        momo: mobileMoney,
        bank: banks,
    };

    const submit = (e) => {
        e.preventDefault();
        post("/payouts/setup", {
            onFinish: () => {
                setData({
                    type: "momo",
                    provider: "",
                    account_number: "",
                });
                toast.success("Payout account details saved successfully!");
                router.visit("/dashboard");
            },
        });
    };

    return (
        <Layout
            variant="header"
            className="p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Dashboard",
                    href: "/dashboard",
                },
                {
                    title: "Payouts",
                    href: "/payouts",
                    icon: ArrowDownCircle,
                },
                {
                    title: "Setup",
                    href: "/payouts/setup",
                    icon: CreditCard,
                },
            ]}
        >
            <Head title="Setup Payouts" />

            <div className="space-y-6 md:px-4 md:py-6 md:mt-8 px-0">
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                        Set up we pay you
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Tell us where to send your money when orders start
                        rolling in.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <h3 className="text-base font-medium">
                                    How would you like to get paid?
                                </h3>
                                <p className="mb-2 text-xs text-muted-foreground">
                                    Payouts will be sent in GHS
                                </p>
                                <div className="border rounded-lg divide-x grid grid-cols-2 bg-background dark:border-[#333] dark:divide-[#333] overflow-hidden">
                                    <div
                                        className="flex items-start gap-4 p-4 cursor-pointer hover:bg-primary-orange/10 dark:hover:bg-muted"
                                        onClick={() => {
                                            setData("type", "momo");
                                        }}
                                    >
                                        <Wallet className="h-6 w-6 text-primary-orange mt-1" />
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                Mobile money
                                            </p>
                                            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                                                <li>1-3 business days</li>
                                                <li>Minimum payout GHS 10</li>
                                                <li>Fees - 1.95%</li>
                                            </ul>
                                        </div>
                                        <input
                                            type="radio"
                                            checked={data.type === "momo"}
                                            className="bg-primary-orange"
                                        />
                                    </div>
                                    <div
                                        className="flex items-start gap-4 p-4 cursor-pointer hover:bg-primary-orange/10 dark:hover:bg-muted"
                                        onClick={() => {
                                            setData("type", "bank");
                                        }}
                                    >
                                        <Banknote className="h-6 w-6 text-primary-orange mt-1" />
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                Bank account
                                            </p>
                                            <ul className="list-disc list-inside text-xs text-muted-foreground space-y-0.5">
                                                <li>1-3 business days</li>
                                                <li>Minimum payout GHS 50</li>
                                                <li>Fees - 1.95%</li>
                                            </ul>
                                        </div>
                                        <input
                                            type="radio"
                                            checked={data.type === "bank"}
                                            className="bg-primary-orange"
                                        />
                                    </div>
                                </div>
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
                                    value={data.account_number}
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
                                                Double-check your details before submitting, funds cannot be reversed once sent.
                                            </small>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary-orange hover:bg-primary-orange/90 w-full md:w-auto"
                                >
                                    {processing
                                        ? "Saving..."
                                        : "Save Payout Details"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
