import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import EmptyState from "@/components/layout/empty";

export default function Payouts({ payouts }) {
    return (
        <Layout
            variant="sidebar"
            breadcrumbs={[
                {
                    title: "Payouts",
                    href: "/payouts",
                },
            ]}
        >
            <Head title="Payouts" />

            <div className="py-4 px-4">
                {payouts?.length === 0 ? (
                    <EmptyState
                        title="No payouts sent"
                        description="Use this feature to send professional payouts to your customers."
                    />
                ) : (
                    <div>Hello</div>
                )}
            </div>
        </Layout>
    );
}
