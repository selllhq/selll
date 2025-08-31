import { Head, Link } from "@inertiajs/react";

import Layout from "@/layouts/app-layout";
import Button from "@/components/form/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from "@/components/shared/card";

import { PageHeader } from "@/components/layout/header";

const Store = ({ auth }) => {
    return (
        <Layout>
            <Head title="Store" />

            <div className="px-4 lg:px-8 pt-6 pb-20 lg:pb-8 lg:max-w-7xl mx-auto w-full">
                <PageHeader
                    title={`Hello, ${auth.user.name.split(" ")[0]}`}
                    description="Manage your store settings and preferences."
                />

                <div className="grid gap-4 grid-cols-2 mt-8">
                    <Button
                        as={Link}
                        href="/store/customize"
                        variant="ghost"
                        className="w-full h-full p-0 whitespace-normal text-center"
                    >
                        <Card className="w-full flex flex-col justify-center items-center hover:!bg-accent">
                            <img
                                src="/assets/img/dashboard/customize-store.svg"
                                className="h-24"
                                alt=""
                            />
                            <p className="font-bold lg:text-xl mt-2">
                                Customize Store
                            </p>
                            <CardDescription className="lg:text-base lg:w-2/3">
                                Update your store's info and appearance
                            </CardDescription>
                        </Card>
                    </Button>
                    <Button
                        as={Link}
                        href="/store/deliveries"
                        variant="ghost"
                        className="w-full h-full p-0 whitespace-normal text-center"
                    >
                        <Card className="w-full flex flex-col justify-center items-center hover:!bg-accent">
                            <img
                                src="/assets/img/dashboard/delivery.svg"
                                className="h-24"
                                alt=""
                            />
                            <p className="text-center font-bold lg:text-xl mt-2">
                                Setup Deliveries
                            </p>
                            <CardDescription className="lg:text-base lg:w-2/3">
                                Add a pickup location/delivery options
                            </CardDescription>
                        </Card>
                    </Button>
                    <Button
                        as={Link}
                        href="/store/brand"
                        variant="ghost"
                        className="w-full h-full p-0 whitespace-normal text-center"
                    >
                        <Card className="w-full flex flex-col justify-center items-center hover:!bg-accent">
                            <img
                                src="/assets/img/dashboard/store-branding.svg"
                                className="h-24"
                                alt=""
                            />
                            <p className="text-center font-bold lg:text-xl mt-2">
                                Brand Assets
                            </p>
                            <CardDescription className="lg:text-base lg:w-2/3">
                                Let your customers know who you are
                            </CardDescription>
                        </Card>
                    </Button>
                    <Button
                        as={Link}
                        href="/store/domain"
                        variant="ghost"
                        className="w-full h-full p-0 whitespace-normal text-center"
                    >
                        <Card className="w-full flex flex-col justify-center items-center hover:!bg-accent">
                            <img
                                src="/assets/img/dashboard/link.svg"
                                className="h-24"
                                alt=""
                            />
                            <p className="text-center font-bold lg:text-xl mt-2">
                                Store Link
                            </p>
                            <CardDescription className="lg:text-base lg:w-2/3">
                                Update URL or add a custom domain
                            </CardDescription>
                        </Card>
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default Store;
