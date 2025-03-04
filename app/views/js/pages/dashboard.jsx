import Layout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import Button from "@/components/form/button";
import { Plus } from "lucide-react";

export default function Dashboard({ stores, currentStore }) {
    return (
        <Layout
            variant="sidebar"
            breadcrumbs={[
                {
                    title: "Dashboard",
                    href: "/dashboard",
                },
            ]}
        >
            <Head title="Dashboard" />

            <div className="py-4 px-4">
                {stores?.length === 0 && (
                    <div className="text-center">
                        <div class="mx-auto flex w-full flex-col items-center justify-center text-center py-20">
                            <div class="relative mb-8">
                                <img
                                    className="dark:hidden"
                                    src="/assets/img/dashboard/empty-light.svg"
                                    alt="create"
                                    aria-hidden="true"
                                    height="242"
                                />
                                <img
                                    className="hidden dark:block"
                                    src="/assets/img/dashboard/empty-dark.svg"
                                    alt="create"
                                    aria-hidden="true"
                                    height="242"
                                />
                            </div>
                            <h3 class="font-medium text-xl xl:text-4xl">
                                Welcome to Selll
                            </h3>
                            <p class="mt-2 text-default">
                                Create your first store and start selling in 2 minutes
                            </p>
                            <Button
                                as={Link}
                                href="/store/create"
                                className="mt-8 bg-primary-red hover:bg-primary-red/80 text-white"
                            >
                                <Plus size={16} />
                                <span>New application</span>
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
