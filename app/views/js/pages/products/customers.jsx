import Layout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import EmptyState from "@/components/layout/empty";

export default function Customers({ customers }) {
    return (
        <Layout
            variant="sidebar"
            breadcrumbs={[
                {
                    title: "Customers",
                    href: "/customers",
                },
            ]}
        >
            <Head title="Customers" />

            <div className="py-4 px-4">
                {customers?.length === 0 ? (
                    <EmptyState
                        title="Waiting for orders..."
                        description="Your store is ready, share it with your customers to start selling."
                    />
                ) : (
                    <div>Hello</div>
                )}
            </div>
        </Layout>
    );
}
