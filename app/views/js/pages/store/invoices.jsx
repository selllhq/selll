import Layout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import EmptyState from "@/components/layout/empty";

export default function Invoices({ invoices }) {
    return (
        <Layout
            variant="header"
            breadcrumbs={[
                {
                    title: "Invoices",
                    href: "/Invoices",
                },
            ]}
        >
            <Head title="Invoices" />

            <div className="py-4 px-4">
                {invoices?.length === 0 ? (
                    <EmptyState
                        title="No invoices sent"
                        description="Use this feature to send professional invoices to your customers."
                    />
                ) : (
                    <div>Hello</div>
                )}
            </div>
        </Layout>
    );
}
