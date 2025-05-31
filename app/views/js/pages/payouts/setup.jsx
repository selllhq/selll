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
            className="dark:bg-[#141414] p-4 pt-2"
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

            <div className="space-y-6 py-0 md:py-6 md:mt-8 px-0">
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
                        <Card className="border-0 dark:border-0 shadow-none">
                            <CardHeader className="p-0 pb-3">
                                <CardTitle className="text-base font-medium">
                                    Account Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="dark:bg-[#1A1A1A] border border-[#2C2C2C] rounded-lg p-5">
                                    <form
                                        onSubmit={submit}
                                        className="space-y-5"
                                    >
                                        <div>
                                            <Label
                                                htmlFor="type"
                                                className="block text-xs font-medium mb-2"
                                            >
                                                Payout Type
                                            </Label>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div
                                                    className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer border ${data.type === "momo" ? "border-primary-orange bg-primary-orange/10 dark:bg-[#2C2C2C]" : "border-[#2C2C2C]"}`}
                                                    onClick={() =>
                                                        setData("type", "momo")
                                                    }
                                                >
                                                    <div
                                                        className={`p-1.5 rounded-full ${data.type === "momo" ? "bg-primary-orange text-white" : "bg-[#2C2C2C] text-gray-400"}`}
                                                    >
                                                        <Wallet className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium">
                                                            Mobile Money
                                                        </span>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer border ${data.type === "bank" ? "border-primary-orange bg-primary-orange/10 dark:bg-[#2C2C2C]" : "border-[#2C2C2C]"}`}
                                                    onClick={() =>
                                                        setData("type", "bank")
                                                    }
                                                >
                                                    <div
                                                        className={`p-1.5 rounded-full ${data.type === "bank" ? "bg-primary-orange text-white" : "bg-[#2C2C2C] text-gray-400"}`}
                                                    >
                                                        <Banknote className="h-4 w-4" />
                                                    </div>
                                                    <div>
                                                        <span className="text-sm font-medium">
                                                            Bank Account
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {errors.type && (
                                                <InputError
                                                    message={errors.type}
                                                />
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
                                                    setData(
                                                        "provider",
                                                        e.target.value,
                                                    );
                                                }}
                                                className="w-full dark:bg-[#141414] border-[#2C2C2C]"
                                            >
                                                <option value="">
                                                    Select{" "}
                                                    {data.type === "momo"
                                                        ? "provider"
                                                        : "bank"}
                                                </option>
                                                {(
                                                    providers[data.type] || []
                                                ).map((prov) => (
                                                    <option
                                                        key={prov.slug}
                                                        value={`${prov.code}:${prov.name}`}
                                                    >
                                                        {prov.name}
                                                    </option>
                                                ))}
                                            </Input>
                                            {errors.provider && (
                                                <InputError
                                                    message={errors.provider}
                                                />
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
                                                className="dark:bg-[#141414] border-[#2C2C2C]"
                                            />
                                            {errors.account_number && (
                                                <InputError
                                                    message={
                                                        errors.account_number
                                                    }
                                                />
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
                            </CardContent>
                        </Card>
                    </div>

                    <div>
                        <Card className="border-0 dark:border-0 shadow-none bg-transparent dark:bg-transparent">
                            <CardHeader className="p-0 pb-3">
                                <CardTitle className="text-base font-medium">
                                    Important Notice
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="dark:bg-[#1A1A1A] border border-[#2C2C2C] rounded-lg p-5 text-xs">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <AlertTriangle className="h-5 w-5 text-primary-orange" />
                                        </div>
                                        <div className="space-y-4">
                                            <p>
                                                Please double-check your account
                                                details before submitting. Selll
                                                will not be responsible for
                                                payouts made to incorrect
                                                account numbers.
                                            </p>
                                            <div className="pt-3">
                                                <h4 className="text-xs font-medium mb-2">
                                                    Payout Schedule
                                                </h4>
                                                <ul className="space-y-2 ml-2">
                                                    <li className="flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                                        <span className="text-gray-400">
                                                            Payouts are
                                                            processed every 7
                                                            days
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                                        <span className="text-gray-400">
                                                            Minimum payout
                                                            amount: GHS{" "}
                                                            {data.provider ===
                                                            "momo"
                                                                ? "50"
                                                                : "10"}
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                                        <span className="text-gray-400">
                                                            Our payment
                                                            processor charges 2%
                                                            per payout
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
