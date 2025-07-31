import dayjs from "dayjs";
import { toast } from "sonner";
import { Head } from "@inertiajs/react";
import {
    ArrowDownCircle,
    Users,
    Copy,
    ExternalLink,
    CreditCard,
} from "lucide-react";
import Layout from "@/layouts/app-layout";
import Button from "@/components/form/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";
import { StatusBadge } from "@/components/shared/badge";
import { formatCurrency } from "@/utils/store";

export default function Referrals({ referrals, referralCode }) {
    const referralUrl = `https://selll.online/auth/register?ref=${referralCode}`;

    const copyReferralLink = () => {
        navigator.clipboard.writeText(referralUrl);
        toast.success("Referral link copied to clipboard");
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
        <Layout
            variant="header"
            className="dark:bg-[#141414] p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Home",
                    href: "/dashboard",
                },
                {
                    title: "Referrals",
                    href: "/referrals",
                    icon: ArrowDownCircle,
                },
            ]}
        >
            <Head title="Your Referred Stores" />

            <div className="space-y-6 py-0 md:py-6 md:mt-8 px-0">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold md:mb-2">
                        Referrals
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Track your referrals and earnings from referred stores.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                    <Card className="flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Referrals
                            </CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <Users className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <div className="text-4xl font-bold mb-2">
                                {referrals.length}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {referrals.filter((r) => r.reward_paid).length}{" "}
                                paid out
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle>Total Earnings</CardTitle>
                            <div className="bg-[#2C2C2C] p-2 rounded-lg">
                                <CreditCard className="h-5 w-5 text-primary-orange" />
                            </div>
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <div className="text-4xl font-bold mb-2">
                                {formatCurrency(
                                    referrals.filter((r) => r.reward_paid)
                                        .length * 10,
                                    "GHS",
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {/* {
                                    referrals.filter(
                                        (r) =>
                                            r.store_activated_at &&
                                            r.store_product_added_at &&
                                            !r.reward_paid,
                                    ).length
                                }{" "}
                                pending referrals */}
                                {formatCurrency(
                                    referrals.filter(
                                        (r) =>
                                            r.store_activated_at &&
                                            r.store_product_added_at &&
                                            !r.reward_paid,
                                    ).length * 10,
                                    "GHS",
                                )}{" "}
                                pending earnings
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Referral Link</CardTitle>
                            <CardDescription className="text-primary">
                                Share this link with other store owners. You'll
                                earn GHS 10 for each store that:
                                <ul className="mt-2 list-disc list-inside space-y-1">
                                    <li>Signs up using your referral link</li>
                                    <li>Activates their store</li>
                                    <li>Adds at least one product</li>
                                </ul>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={copyReferralLink}
                                    variant="outline"
                                    className="shrink-0"
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy Link
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-20">
                    <h2 className="text-lg mb-2">Your Referrals</h2>
                    <div className="rounded-md border">
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
                                                No referrals yet. Share your
                                                link to start earning!
                                            </td>
                                        </tr>
                                    ) : (
                                        referrals.map((referral) => {
                                            const status =
                                                getReferralStatus(referral);

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
                                                        ).format("MMM D, YYYY")}
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        <StatusBadge
                                                            status={
                                                                status.status
                                                            }
                                                        >
                                                            {status.label}
                                                        </StatusBadge>
                                                    </td>
                                                    <td className="p-4 align-middle">
                                                        {referral.reward_paid ? (
                                                            <span className="text-green-500 font-medium">
                                                                GHS 10.00
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
                    </div>
                </div>
            </div>
        </Layout>
    );
}
