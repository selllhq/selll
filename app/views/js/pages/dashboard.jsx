import Layout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/shared/tabs";
import dayjs from "dayjs";
import EmptyState from "@/components/layout/empty";

export default function Dashboard({ auth, products, stores, currentStore }) {
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
                {stores?.length === 0 ? (
                    <EmptyState
                        title="Welcome to Selll"
                        description="Create your first store and start selling in 2 minutes"
                        button={{
                            href: "/store/new",
                            text: "Create Store",
                        }}
                    />
                ) : (
                    <div>
                        <h2 className="text-4xl">
                            Hello, {auth.user.name.split(" ")[0]}
                        </h2>
                        <p>Here's everything new with {currentStore?.name}</p>

                        {dayjs(currentStore?.created_at).isAfter(
                            dayjs().subtract(30, "minutes"),
                        ) && (
                            <div className="bg-green-100 text-green-800 p-4 rounded-md mt-4">
                                Your store was created just now. Get started by
                                adding your first product.
                            </div>
                        )}

                        {products?.length > 0 && (
                            <>
                                <Tabs
                                    defaultValue="overview"
                                    className="w-[400px]"
                                >
                                    <TabsList>
                                        <TabsTrigger value="overview">
                                            Overview
                                        </TabsTrigger>
                                        <TabsTrigger value="analytics">
                                            Analytics
                                        </TabsTrigger>
                                        <TabsTrigger value="reports">
                                            Reports
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="overview">
                                        Overview here
                                    </TabsContent>
                                    <TabsContent value="analytics">
                                        Analytics
                                    </TabsContent>
                                    <TabsContent value="reports">
                                        Reports
                                    </TabsContent>
                                </Tabs>
                            </>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}
