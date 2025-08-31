import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Head } from "@inertiajs/react";
import { Copy, ExternalLink, Linkedin, Twitter, Mail } from "lucide-react";
import Layout from "@/layouts/app-layout";
import Button from "@/components/form/button";
import Input from "@/components/form/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import { StatusBadge } from "@/components/shared/badge";
import { formatCurrency } from "@/utils/store";
import { PageHeader } from "@/components/layout/header";

export default function Referrals({ referrals, referralCode }) {
    const referralUrl = `https://selll.online/invite/${referralCode}`;

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralUrl);
        toast.success("Referral link copied to clipboard");
    };

    const [tab, setTab] = useState("pending");

    const paidCount = useMemo(
        () => referrals.filter((r) => r.reward_paid).length,
        [referrals],
    );

    const eligiblePendingCount = useMemo(
        () =>
            referrals.filter(
                (r) =>
                    r.store_activated_at &&
                    r.store_product_added_at &&
                    !r.reward_paid,
            ).length,
        [referrals],
    );

    const openShare = (network) => {
        const text = encodeURIComponent(
            "Join me on Selll — create a store in minutes. Use my invite link!",
        );

        const url = encodeURIComponent(referralUrl);

        let shareUrl = "";

        if (network === "twitter") {
            shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
        } else if (network === "linkedin") {
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        } else if (network === "email") {
            shareUrl = `mailto:?subject=${encodeURIComponent(
                "Try Selll — my invite link",
            )}&body=${text}%20${url}`;
        }

        if (shareUrl) {
            window.open(shareUrl, "_blank", "noopener,noreferrer");
        }
    };

    const getReferralStatus = (referral) => {
        if (!referral.store_activated_at) {
            return { label: "Store Not Activated", status: "gray" };
        }

        if (!referral.store_product_added_at) {
            return { label: "No Products Added", status: "pending" };
        }

        if (!referral.reward_paid) {
            return { label: "Reward Pending", status: "pending" };
        }

        return { label: "Reward Paid", status: "paid" };
    };

    return (
        <Layout className="dark:bg-[#141414] p-4 pt-2">
            <Head title="Referrals" />

            <div className="px-4 lg:px-8 pt-6 lg:pt-10 pb-20 lg:pb-8 lg:max-w-5xl mx-auto w-full space-y-8">
                <PageHeader
                    title="Referrals"
                    description="Invite others to Selll and earn rewards"
                />

                <Card>
                    <CardHeader>
                        <img
                            src="/assets/img/dashboard/referral.svg"
                            alt=""
                            className="h-22 w-22 mb-4 select-none"
                        />
                        <CardTitle className="!text-foreground">
                            Your referral summary
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            For every vendor that joins and gets started, you
                            earn GHS 20 + some amazing perks
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-5xl font-bold">
                            {formatCurrency(paidCount * 20, "GHS")}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            {paidCount} paid out • {eligiblePendingCount}{" "}
                            pending
                        </p>

                        <div className="mt-6 border-b flex items-center gap-6">
                            <button
                                className={`pb-2 text-sm ${tab === "pending" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                                onClick={() => setTab("pending")}
                            >
                                Pending
                            </button>
                            <button
                                className={`pb-2 text-sm ${tab === "joined" ? "border-b-2 border-primary font-medium" : "text-muted-foreground"}`}
                                onClick={() => setTab("joined")}
                            >
                                Joined
                            </button>
                        </div>

                        <div className="mt-4 space-y-3">
                            {tab === "pending" ? (
                                referrals.filter((r) => !r.reward_paid)
                                    .length === 0 ? (
                                    <p className="text-sm text-muted-foreground">
                                        You have no pending invites — spread the
                                        word using your unique link.
                                    </p>
                                ) : (
                                    referrals
                                        .filter((r) => !r.reward_paid)
                                        .slice(0, 5)
                                        .map((r) => (
                                            <div
                                                key={r.id}
                                                className="flex items-center justify-between text-sm"
                                            >
                                                <span className="truncate">
                                                    {r.store.name} ({
                                                        !r.store_activated_at
                                                            ? "Not Activated"
                                                            : !r.store_product_added_at
                                                            ? "No Products"
                                                            : "Eligible"
                                                    })
                                                </span>
                                                <span className="text-muted-foreground">
                                                    {dayjs(r.created_at).format(
                                                        "MMM D",
                                                    )}
                                                </span>
                                            </div>
                                        ))
                                )
                            ) : referrals.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No joined referrals yet.
                                </p>
                            ) : (
                                referrals.slice(0, 5).map((r) => (
                                    <div
                                        key={r.id}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="truncate">
                                            {r.store.name}
                                        </span>
                                        <span className="text-muted-foreground">
                                            {dayjs(r.created_at).format(
                                                "MMM D",
                                            )}
                                        </span>
                                    </div>
                                ))
                            )}

                            {/* <div className="rounded-md border">
                                <div className="relative w-full overflow-auto">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="[&_tr]:border-b">
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <th className="h-12 px-4 text-left align-middle font-medium">
                                                    Store
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">
                                                    Joined
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">
                                                    Status
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">
                                                    Reward
                                                </th>
                                                <th className="h-12 px-4 text-left align-middle font-medium">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {referrals.length === 0 ? (
                                                <tr>
                                                    <td
                                                        colSpan="5"
                                                        className="p-4 text-center text-muted-foreground"
                                                    >
                                                        No referrals yet. Share
                                                        your link to start
                                                        earning!
                                                    </td>
                                                </tr>
                                            ) : (
                                                referrals.map((referral) => {
                                                    const status =
                                                        getReferralStatus(
                                                            referral,
                                                        );
                                                    return (
                                                        <tr
                                                            key={referral.id}
                                                            className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                                        >
                                                            <td className="p-4 align-middle">
                                                                <div>
                                                                    <div className="font-medium">
                                                                        {
                                                                            referral
                                                                                .store
                                                                                .name
                                                                        }
                                                                    </div>
                                                                    <div className="text-sm text-muted-foreground">
                                                                        {
                                                                            referral
                                                                                .store
                                                                                .owner
                                                                                .name
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="p-4 align-middle">
                                                                {dayjs(
                                                                    referral.created_at,
                                                                ).format(
                                                                    "MMM D, YYYY",
                                                                )}
                                                            </td>
                                                            <td className="p-4 align-middle">
                                                                <StatusBadge
                                                                    status={
                                                                        status.status
                                                                    }
                                                                >
                                                                    {
                                                                        status.label
                                                                    }
                                                                </StatusBadge>
                                                            </td>
                                                            <td className="p-4 align-middle">
                                                                {referral.reward_paid ? (
                                                                    <span className="text-green-500 font-medium">
                                                                        GHS
                                                                        10.00
                                                                    </span>
                                                                ) : (
                                                                    <span className="text-muted-foreground">
                                                                        --
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td className="p-4 align-middle">
                                                                <Button
                                                                    as="a"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="h-8"
                                                                    href={`https://${referral.store.slug}.selll.store`}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    <ExternalLink className="w-4 h-4" />
                                                                    View Store
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div> */}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-3 items-center">
                            <Input
                                value={referralUrl}
                                readOnly
                                className="h-12 rounded-2xl"
                            />
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    className="h-12"
                                    onClick={copyReferralLink}
                                >
                                    <Copy className="w-4 h-4 mr-2" /> Copy
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-12"
                                    onClick={() => openShare("linkedin")}
                                >
                                    <Linkedin className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-12"
                                    onClick={() => openShare("twitter")}
                                >
                                    <Twitter className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="secondary"
                                    className="h-12"
                                    onClick={() => openShare("email")}
                                >
                                    <Mail className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-3">
                    <h3 className="text-lg font-medium">
                        It's easy to get started
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                        <li>• Spread the word with your link or via email</li>
                        <li>• They click and sign up through your link</li>
                        <li>
                            • When they add a product and activate, you earn GHS
                            20
                        </li>
                    </ul>
                </div>
            </div>
        </Layout>
    );
}
