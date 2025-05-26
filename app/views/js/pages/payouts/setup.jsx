import React from "react";
import { Head, useForm } from "@inertiajs/react";
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

export default function PayoutSetupPage({ auth, currentStore }) {
    const { data, setData, post, errors, processing } = useForm({
        type: "momo",
        provider: "",
        account_number: "",
    });

    const providers = {
        momo: ["MTN Mobile Money", "Vodafone Cash", "AirtelTigo Money"],
        bank: ["GCB Bank", "Ecobank", "Stanbic Bank", "Absa Bank"],
    };

    const submit = (e) => {
        e.preventDefault();
        post("/payouts/store");
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

            <div className="space-y-6 py-0 md:py-6 px-0 md:px-6">
                <div className="mb-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                        Add a payout account
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Set up how you want to receive payments from your store
                        sales
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
                                <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-lg p-5">
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
                                                    className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer border ${data.type === "momo" ? "border-primary-orange bg-[#2C2C2C]" : "border-[#2C2C2C]"}`}
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
                                                    className={`flex items-center gap-2 p-2.5 rounded-lg cursor-pointer border ${data.type === "bank" ? "border-primary-orange bg-[#2C2C2C]" : "border-[#2C2C2C]"}`}
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
                                                onChange={(e) =>
                                                    setData(
                                                        "provider",
                                                        e.target.value,
                                                    )
                                                }
                                                className="w-full bg-[#141414] border-[#2C2C2C] focus:border-primary-orange focus:ring-primary-orange"
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
                                                        key={prov}
                                                        value={prov}
                                                    >
                                                        {prov}
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
                                                className="bg-[#141414] border-[#2C2C2C] focus:border-primary-orange focus:ring-primary-orange"
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
                                <div className="bg-[#1A1A1A] border border-[#2C2C2C] rounded-lg p-5 text-xs">
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
                                                            amount: GHS 50
                                                        </span>
                                                    </li>
                                                    <li className="flex items-center gap-2">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                                        <span className="text-gray-400">
                                                            No transaction fees
                                                            on payouts
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
