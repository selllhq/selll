import dayjs from "dayjs";
import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { Wallet, BanknoteIcon, Plus } from "lucide-react";
import Layout from "@/layouts/app-layout";
import EmptyState from "@/components/layout/empty";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import Button from "@/components/form/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/shared/table";
import { useDialog } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function Payouts({
    payouts = [],
    currentStore,
    orders = 0,
    payoutWallets = [],
    activePayoutWallet = null,
}) {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const confirmModal = useDialog("confirmAction");

    const totalPaidOut = payouts.reduce((sum, payout) => {
        return sum + parseFloat(payout.amount);
    }, 0);

    const filteredPayouts = payouts.filter((payout) => {
        const matchesSearch =
            search === "" ||
            payout.reference.toLowerCase().includes(search.toLowerCase()) ||
            payout.status.toLowerCase().includes(search.toLowerCase()) ||
            payout.amount.toString().includes(search);

        const matchesFilter =
            filter === "all" ||
            (filter === "pending" && payout.status === "pending") ||
            (filter === "completed" && payout.status === "completed") ||
            (filter === "failed" && payout.status === "failed");

        return matchesSearch && matchesFilter;
    });

    return (
        <Layout variant="header" className="dark:bg-[#141414] p-4 pt-2">
            <Head title="Payouts" />

            <div className="space-y-8 py-0 md:py-4 px-0 md:px-4">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold md:mb-2">
                        Payouts
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        View all payouts made to your store. Payouts are
                        automatic, so just sit back and relax while we process
                        your earnings.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-8">
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
                                        From {orders} completed orders
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {payoutWallets && (
                        <>
                            {payoutWallets.map((wallet) => (
                                <Card
                                    key={wallet.id}
                                    className={
                                        activePayoutWallet === wallet.id
                                            ? "border-2 border-primary-orange"
                                            : "cursor-pointer hover:bg-muted/50 dark:hover:bg-neutral-800/50"
                                    }
                                    onClick={() => {
                                        if (activePayoutWallet !== wallet.id) {
                                            confirmModal.openDialog({
                                                title: "Change Default Wallet",
                                                description:
                                                    "Are you sure you want to make this your default wallet to receive your payouts?",
                                                cancelText: "Cancel",
                                                confirmText: "Yes, Set Default",
                                                onConfirm: () => {
                                                    router.patch(
                                                        `/payouts/wallet`,
                                                        { wallet: wallet.id },
                                                        {
                                                            onFinish: () => {
                                                                toast(
                                                                    "Wallet updated successfully.",
                                                                );
                                                                confirmModal.closeDialog();
                                                            },
                                                        },
                                                    );
                                                },
                                            });
                                        }
                                    }}
                                >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 mb-2">
                                        <CardTitle>Payout Wallet</CardTitle>
                                        <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                            <Wallet className="h-5 w-5 text-primary-orange" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="font-medium">
                                                    {wallet.type === "momo"
                                                        ? "Mobile Money"
                                                        : wallet.type === "bank"
                                                          ? "Bank Account"
                                                          : wallet.type ===
                                                              "other"
                                                            ? "Other"
                                                            : wallet.type}{" "}
                                                    - {wallet.provider || "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="font-medium">
                                                    {wallet.account_number ||
                                                        "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            <Card
                                className="cursor-pointer hover:bg-muted/50 dark:hover:bg-neutral-800/50"
                                onClick={() => router.visit("/payouts/setup")}
                            >
                                <CardContent className="flex flex-col items-center justify-center text-center p-4">
                                    <div className="bg-accent rounded-full flex justify-center items-center w-8 h-8">
                                        <Plus className="h-6 w-6 text-primary-orange" />
                                    </div>
                                    <h3 className="text-lg font-medium mb-2">
                                        New Payout Method
                                    </h3>
                                </CardContent>
                            </Card>
                        </>
                    )}
                </div>

                {/* <div className="flex items-center justify-between mb-6">
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
                </div> */}

                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium">
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
                    <>
                        {!activePayoutWallet ? (
                            <Card className="mt-8">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-center justify-center text-center p-4">
                                        <div className="bg-[#2C2C2C] p-3 rounded-full mb-4">
                                            <Wallet className="h-6 w-6 text-primary-orange" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-2">
                                            No Payout Wallet Set Up
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4">
                                            You haven't set up a payout wallet
                                            yet. Set up your payout details to
                                            receive payments from your sales.
                                        </p>
                                        <Button
                                            onClick={() =>
                                                router.visit("/payouts/setup")
                                            }
                                            className="bg-primary-orange hover:bg-primary-orange/90"
                                        >
                                            Set Up Payout Wallet
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ) : (
                            <EmptyState
                                icon={Wallet}
                                title={
                                    search
                                        ? "No payouts found"
                                        : "No payouts yet"
                                }
                                description="Payouts are automatically requested when a sale is completed. Start selling products to receive payouts."
                                button={false}
                                className="mt-6"
                            />
                        )}
                    </>
                ) : (
                    <>
                        <div className="overflow-x-auto rounded-lg border border-muted-foreground/15">
                            <Table>
                                <TableHeader>
                                    <TableRow className="dark:border-neutral-800">
                                        <TableHead>Reference</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Requested</TableHead>
                                        <TableHead className="text-nowrap">
                                            Payment Method
                                        </TableHead>
                                        {/* <TableHead>Processed</TableHead>
                                    <TableHead>Status</TableHead> */}
                                        {/* <TableHead className="text-right">
                                        Actions
                                    </TableHead> */}
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredPayouts.map((payout) => (
                                        <TableRow
                                            key={payout.id}
                                            className="cursor-pointer hover:bg-muted/50 dark:hover:bg-neutral-800/50 dark:border-neutral-800"
                                        >
                                            <TableCell className="font-medium">
                                                #{payout.reference || payout.id}
                                            </TableCell>
                                            <TableCell>
                                                {new Intl.NumberFormat(
                                                    "en-US",
                                                    {
                                                        style: "currency",
                                                        currency:
                                                            currentStore?.currency ||
                                                            "USD",
                                                    },
                                                ).format(payout.amount)}
                                            </TableCell>
                                            <TableCell className="text-gray-400">
                                                {dayjs(
                                                    payout.created_at,
                                                ).format("MMM D, YYYY")}
                                            </TableCell>
                                            <TableCell className="text-gray-400 truncate max-w-[200px]">
                                                {payout.wallet.type === "momo"
                                                    ? "Mobile Money"
                                                    : payout.wallet.type ===
                                                        "bank"
                                                      ? "Bank Account"
                                                      : payout.wallet.type ===
                                                          "other"
                                                        ? "Other"
                                                        : payout.wallet.type}
                                            </TableCell>
                                            {/* <TableCell className="text-gray-400">
                                            {payout.processed_at
                                                ? dayjs(
                                                      payout.processed_at,
                                                  ).format("MMM D, YYYY")
                                                : "Pending"}
                                        </TableCell>
                                        <TableCell>
                                            <StatusBadge
                                                status={payout.status}
                                            />
                                        </TableCell> */}
                                            {/* <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); // Prevent row click if button is clicked
                                                    router.visit(
                                                        `/store/payouts/${payout.id}`,
                                                    );
                                                }}
                                                className="text-primary-orange hover:text-primary-orange/90"
                                            >
                                                View
                                            </Button>
                                        </TableCell> */}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="bg-gray-100 dark:bg-[#1A1A1A] px-4 py-3 text-xs text-gray-400 border-t dark:border-neutral-800">
                                <div>
                                    {Intl.NumberFormat("en-US", {
                                        style: "decimal",
                                    }).format(filteredPayouts.length)}{" "}
                                    {filteredPayouts.length === 1
                                        ? "payout"
                                        : "payouts"}{" "}
                                    found
                                    {search && (
                                        <span> matching "{search}"</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* report payout not received after 2 working days */}
                        <div className="mt-6 text-sm text-gray-400">
                            <p>
                                If you have not received your payout within 2
                                working days, please{" "}
                                <Button
                                    variant="link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.Tawk_API?.toggle();
                                    }}
                                    className="text-primary-orange p-0"
                                >
                                    contact support
                                </Button>{" "}
                                for assistance.
                            </p>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}
