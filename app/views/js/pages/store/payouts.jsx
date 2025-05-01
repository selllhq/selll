import { useState } from "react";
import Layout from "@/layouts/app-layout";
import { Head, router, useForm } from "@inertiajs/react";
import EmptyState from "@/components/layout/empty";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/shared/card";
import {
    Wallet,
    CreditCard,
    DollarSign,
    Calendar,
    Clock,
    ArrowUpCircle,
    XCircle,
    Search,
    Plus,
    BanknoteIcon,
} from "lucide-react";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import * as Dialog from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { StatusBadge } from "@/components/shared/badge";

export default function Payouts({ payouts = [], orders = [], currentStore }) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    const [showRequestDialog, setShowRequestDialog] = useState(false);

    const completedOrders = orders.filter(
        (order) => order.status === "paid" && !order.payout_id,
    );
    const availableBalance = completedOrders.reduce(
        (acc, order) => acc + Number(order.total),
        0,
    );

    const totalPaidOut = payouts.reduce(
        (acc, payout) => acc + Number(payout.amount),
        0,
    );

    const pendingPayouts = payouts.filter(
        (payout) => payout.status === "pending",
    );
    const pendingAmount = pendingPayouts.reduce(
        (acc, payout) => acc + Number(payout.amount),
        0,
    );

    const filteredPayouts = payouts.filter((payout) => {
        const matchesSearch =
            payout.reference?.toLowerCase().includes(search.toLowerCase()) ||
            payout.status?.toLowerCase().includes(search.toLowerCase()) ||
            payout.payment_method
                ?.toLowerCase()
                .includes(search.toLowerCase()) ||
            String(payout.amount).includes(search);

        if (!matchesSearch) {
            return false;
        }

        switch (filter) {
            case "pending":
                return payout.status === "pending";
            case "completed":
                return payout.status === "completed";
            case "failed":
                return payout.status === "failed";
            default:
                return true;
        }
    });

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: availableBalance,
        payment_method: "bank_transfer",
        account_name: "",
        account_number: "",
        bank_name: "",
        notes: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/store/payouts/request", {
            onSuccess: () => {
                setShowRequestDialog(false);
                reset();
            },
        });
    };

    return (
        <Layout variant="header" className="p-2 pt-2 mt-5 md:mt-20">
            <Head title="Payouts" />

            <div className="space-y-8 py-4 px-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold md:mb-2">
                            Payouts
                        </h2>
                        <p className="text-muted-foreground text-sm md:text-base">
                            Manage your store's payouts and withdraw your
                            earnings
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        {availableBalance > 0 && (
                            <Button
                                className="bg-primary-orange hover:bg-primary-orange/90"
                                onClick={() => setShowRequestDialog(true)}
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Request Payout
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                            <CardTitle>Available Balance</CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <Wallet className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency:
                                            currentStore?.currency || "USD",
                                    }).format(availableBalance)}
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <span className="text-sm">
                                        From {completedOrders.length} completed
                                        orders
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                        {availableBalance > 0 && (
                            <CardFooter className="pt-0">
                                <Button
                                    variant="outline"
                                    className="w-full bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                    onClick={() => setShowRequestDialog(true)}
                                >
                                    <ArrowUpCircle className="h-4 w-4 mr-2" />
                                    Request Payout
                                </Button>
                            </CardFooter>
                        )}
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                            <CardTitle>Total Paid Out</CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <BanknoteIcon className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency:
                                            currentStore?.currency || "USD",
                                    }).format(totalPaidOut)}
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <span className="text-sm">
                                        From{" "}
                                        {
                                            payouts.filter(
                                                (p) => p.status === "completed",
                                            ).length
                                        }{" "}
                                        completed payouts
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                            <CardTitle>Pending Payouts</CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <Clock className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <div className="text-4xl font-bold mb-2">
                                    {new Intl.NumberFormat("en-US", {
                                        style: "currency",
                                        currency:
                                            currentStore?.currency || "USD",
                                    }).format(pendingAmount)}
                                </div>
                                <div className="flex items-center gap-1 text-gray-400">
                                    <span className="text-sm">
                                        From {pendingPayouts.length} pending
                                        payouts
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Search payouts by reference, status, or amount..."
                                className="pl-8 h-9 bg-[#141414] border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors w-full text-sm placeholder:text-gray-500"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <select
                        className="ml-6 h-9 bg-[#141414] border-[#2C2C2C] rounded-md focus:ring-1 focus:ring-[#2C2C2C] focus:border-[#2C2C2C] hover:bg-[#2C2C2C]/10 transition-colors text-sm font-medium text-gray-400 px-2.5 appearance-none cursor-pointer min-w-[140px]"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: `right 0.5rem center`,
                            backgroundRepeat: `no-repeat`,
                            backgroundSize: `1rem`,
                            paddingRight: `2rem`,
                        }}
                    >
                        <option
                            value="all"
                            className="bg-[#141414] text-gray-400"
                        >
                            All Payouts
                        </option>
                        <option
                            value="pending"
                            className="bg-[#141414] text-gray-400"
                        >
                            Pending
                        </option>
                        <option
                            value="completed"
                            className="bg-[#141414] text-gray-400"
                        >
                            Completed
                        </option>
                        <option
                            value="failed"
                            className="bg-[#141414] text-gray-400"
                        >
                            Failed
                        </option>
                    </select>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white">
                        {filter === "all"
                            ? "All Payouts"
                            : filter === "pending"
                              ? "Pending Payouts"
                              : filter === "completed"
                                ? "Completed Payouts"
                                : "Failed Payouts"}{" "}
                        ({filteredPayouts.length})
                    </h3>

                    <div className="text-sm text-gray-400">
                        {search && (
                            <span>
                                Found {filteredPayouts.length}{" "}
                                {filteredPayouts.length === 1
                                    ? "payout"
                                    : "payouts"}{" "}
                                matching "{search}"
                            </span>
                        )}
                    </div>
                </div>

                {filteredPayouts.length === 0 ? (
                    <EmptyState
                        icon={Wallet}
                        title={search ? "No payouts found" : "No payouts yet"}
                        description={
                            search
                                ? `No payouts match your search "${search}"`
                                : availableBalance > 0
                                  ? "You have funds available for payout. Request a payout to withdraw your earnings."
                                  : "Complete orders to earn money that you can withdraw."
                        }
                        button={
                            availableBalance > 0
                                ? {
                                      text: "Request Payout",
                                      icon: Plus,
                                      onClick: () => setShowRequestDialog(true),
                                      className:
                                          "bg-primary-orange hover:bg-primary-orange/90",
                                  }
                                : undefined
                        }
                        className="mt-6"
                    />
                ) : (
                    <div className="space-y-4">
                        {filteredPayouts.map((payout) => (
                            <div
                                key={payout.id}
                                className="bg-[#1A1A1A] rounded-lg overflow-hidden cursor-pointer hover:bg-[#1A1A1A]/90 transition-colors"
                                onClick={() =>
                                    router.visit(`/store/payouts/${payout.id}`)
                                }
                            >
                                <div className="px-5 py-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-md bg-[#2C2C2C] flex items-center justify-center text-primary-orange font-medium text-lg flex-shrink-0">
                                                <DollarSign className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-medium text-white">
                                                    Payout #{payout.reference}
                                                </h3>
                                                <p className="text-xs text-gray-400">
                                                    Requested on{" "}
                                                    {dayjs(
                                                        payout.created_at,
                                                    ).format("MMM D, YYYY")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-lg font-bold text-primary-orange">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency:
                                                    currentStore?.currency ||
                                                    "USD",
                                            }).format(payout.amount)}
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4 text-gray-500 flex-shrink-0" />
                                            <span className="text-xs text-gray-400 truncate">
                                                {payout.payment_method ===
                                                "bank_transfer"
                                                    ? `Bank Transfer to ${payout.bank_name}`
                                                    : payout.payment_method}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-1">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4 text-primary-orange" />
                                                <span className="text-xs text-white">
                                                    Processed
                                                </span>
                                            </div>
                                            <div className="bg-[#2C2C2C] rounded-md px-2 py-0.5 text-xs font-medium text-white">
                                                {payout.processed_at
                                                    ? dayjs(
                                                          payout.processed_at,
                                                      ).format("MMM D, YYYY")
                                                    : "Pending"}
                                            </div>
                                        </div>

                                        <StatusBadge status={payout.status} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Request Payout Dialog */}
            <Dialog.Root
                open={showRequestDialog}
                onOpenChange={setShowRequestDialog}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
                    <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#1A1A1A] p-6 shadow-lg overflow-auto">
                        <Dialog.Title className="text-xl font-bold text-white mb-4">
                            Request Payout
                        </Dialog.Title>

                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <Label
                                        htmlFor="amount"
                                        className="text-white"
                                    >
                                        Amount
                                    </Label>
                                    <div className="relative mt-1">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <DollarSign className="h-4 w-4 text-gray-500" />
                                        </div>
                                        <Input
                                            id="amount"
                                            type="number"
                                            step="0.01"
                                            className="pl-10 bg-[#2C2C2C] border-0 text-white focus:ring-primary-orange"
                                            value={data.amount}
                                            onChange={(e) =>
                                                setData(
                                                    "amount",
                                                    e.target.value,
                                                )
                                            }
                                            max={availableBalance}
                                            min={0.01}
                                            required
                                        />
                                    </div>
                                    {errors.amount && (
                                        <InputError message={errors.amount} />
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">
                                        Available balance:{" "}
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency:
                                                currentStore?.currency || "USD",
                                        }).format(availableBalance)}
                                    </p>
                                </div>

                                <div>
                                    <Label
                                        htmlFor="payment_method"
                                        className="text-white"
                                    >
                                        Payment Method
                                    </Label>
                                    <select
                                        id="payment_method"
                                        className="w-full h-10 mt-1 bg-[#2C2C2C] border-0 rounded-md text-white focus:ring-primary-orange"
                                        value={data.payment_method}
                                        onChange={(e) =>
                                            setData(
                                                "payment_method",
                                                e.target.value,
                                            )
                                        }
                                        required
                                    >
                                        <option value="bank_transfer">
                                            Bank Transfer
                                        </option>
                                        <option value="mobile_money">
                                            Mobile Money
                                        </option>
                                        <option value="paypal">PayPal</option>
                                    </select>
                                    {errors.payment_method && (
                                        <InputError
                                            message={errors.payment_method}
                                        />
                                    )}
                                </div>

                                {data.payment_method === "bank_transfer" && (
                                    <>
                                        <div>
                                            <Label
                                                htmlFor="account_name"
                                                className="text-white"
                                            >
                                                Account Name
                                            </Label>
                                            <Input
                                                id="account_name"
                                                type="text"
                                                className="bg-[#2C2C2C] border-0 text-white focus:ring-primary-orange"
                                                value={data.account_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "account_name",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.account_name && (
                                                <InputError
                                                    message={
                                                        errors.account_name
                                                    }
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <Label
                                                htmlFor="account_number"
                                                className="text-white"
                                            >
                                                Account Number
                                            </Label>
                                            <Input
                                                id="account_number"
                                                type="text"
                                                className="bg-[#2C2C2C] border-0 text-white focus:ring-primary-orange"
                                                value={data.account_number}
                                                onChange={(e) =>
                                                    setData(
                                                        "account_number",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.account_number && (
                                                <InputError
                                                    message={
                                                        errors.account_number
                                                    }
                                                />
                                            )}
                                        </div>

                                        <div>
                                            <Label
                                                htmlFor="bank_name"
                                                className="text-white"
                                            >
                                                Bank Name
                                            </Label>
                                            <Input
                                                id="bank_name"
                                                type="text"
                                                className="bg-[#2C2C2C] border-0 text-white focus:ring-primary-orange"
                                                value={data.bank_name}
                                                onChange={(e) =>
                                                    setData(
                                                        "bank_name",
                                                        e.target.value,
                                                    )
                                                }
                                                required
                                            />
                                            {errors.bank_name && (
                                                <InputError
                                                    message={errors.bank_name}
                                                />
                                            )}
                                        </div>
                                    </>
                                )}

                                {data.payment_method === "mobile_money" && (
                                    <div>
                                        <Label
                                            htmlFor="account_number"
                                            className="text-white"
                                        >
                                            Mobile Number
                                        </Label>
                                        <Input
                                            id="account_number"
                                            type="text"
                                            className="bg-[#2C2C2C] border-0 text-white focus:ring-primary-orange"
                                            value={data.account_number}
                                            onChange={(e) =>
                                                setData(
                                                    "account_number",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        {errors.account_number && (
                                            <InputError
                                                message={errors.account_number}
                                            />
                                        )}
                                    </div>
                                )}

                                {data.payment_method === "paypal" && (
                                    <div>
                                        <Label
                                            htmlFor="account_number"
                                            className="text-white"
                                        >
                                            PayPal Email
                                        </Label>
                                        <Input
                                            id="account_number"
                                            type="email"
                                            className="bg-[#2C2C2C] border-0 text-white focus:ring-primary-orange"
                                            value={data.account_number}
                                            onChange={(e) =>
                                                setData(
                                                    "account_number",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                        {errors.account_number && (
                                            <InputError
                                                message={errors.account_number}
                                            />
                                        )}
                                    </div>
                                )}

                                <div>
                                    <Label
                                        htmlFor="notes"
                                        className="text-white"
                                    >
                                        Notes (Optional)
                                    </Label>
                                    <textarea
                                        id="notes"
                                        className="w-full h-20 mt-1 bg-[#2C2C2C] border-0 rounded-md text-white focus:ring-primary-orange resize-none p-2"
                                        value={data.notes}
                                        onChange={(e) =>
                                            setData("notes", e.target.value)
                                        }
                                    />
                                    {errors.notes && (
                                        <InputError message={errors.notes} />
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="bg-[#2C2C2C] border-0 text-white hover:bg-[#3C3C3C]"
                                    onClick={() => setShowRequestDialog(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="bg-primary-orange hover:bg-primary-orange/90"
                                    disabled={
                                        processing ||
                                        data.amount <= 0 ||
                                        data.amount > availableBalance
                                    }
                                >
                                    {processing
                                        ? "Processing..."
                                        : "Request Payout"}
                                </Button>
                            </div>
                        </form>

                        <Dialog.Close asChild>
                            <button
                                className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full h-6 w-6 text-gray-400 hover:text-white focus:outline-none"
                                aria-label="Close"
                            >
                                <XCircle className="h-4 w-4" />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </Layout>
    );
}
