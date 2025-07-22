import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import { Package, Wallet, CheckCircle2, Link2Icon } from "lucide-react";
import Layout from "@/layouts/app-layout";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/shared/card";
import Button from "@/components/form/button";

const GetStarted = ({ products, wallets }) => {
    const [linkCopied, setLinkCopied] = useState(false);

    const steps = [
        {
            title: "Set Up Payouts",
            icon: <Wallet className="w-6 h-6" />,
            complete: wallets && wallets.length > 0,
            content: (completed) => (
                <Card>
                    <CardHeader className="mb-0">
                        <CardTitle className="!text-primary">
                            Connect your bank/momo
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Tell us where to send your money when customers buy
                            items from your store
                        </CardDescription>
                    </CardHeader>
                    {!completed && (
                        <CardContent className="mt-4">
                            <Button
                                as={Link}
                                href="/payouts/setup"
                                className="w-full md:w-max"
                            >
                                Payment Setup
                            </Button>
                        </CardContent>
                    )}
                </Card>
            ),
        },
        {
            title: "Share Your Store",
            icon: <Link2Icon className="w-6 h-6" />,
            complete: linkCopied,
            content: (completed) => (
                <Card>
                    <CardHeader className="mb-0">
                        <CardTitle className="!text-primary">
                            Share Your Store Link
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Share your store link on social media, add it to your page description,
                            link in bio, or send it directly to your customers. You can also
                            generate brand graphics to let your customers know
                            about your store.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row gap-2 mt-4">
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(
                                    window.location.href
                                );
                                setLinkCopied(true);
                            }}
                            variant="outline"
                        >
                            {completed ? "Link Copied!" : "Copy Store Link"}
                        </Button>
                        <Button
                            as={Link}
                            href="/dashboard/brand"
                            rel="noopener noreferrer"
                            variant="outline"
                        >
                            Generate Brand Graphics
                        </Button>
                    </CardContent>
                </Card>
            ),
        },
        {
            title: "Add Products",
            icon: <Package className="w-6 h-6" />,
            complete: products && products.length > 0,
            content: (completed) => (
                <Card>
                    <CardHeader className="mb-0">
                        <CardTitle className="!text-primary">
                            List Your First Product
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            Add products to your store with high-quality images,
                            detailed descriptions, and competitive prices. The
                            more details you provide, the better!
                        </CardDescription>
                    </CardHeader>
                    {!completed && (
                        <CardContent className="flex flex-col md:flex-row gap-2 mt-4">
                            <Button as={Link} href="/products/new">
                                Add Product
                            </Button>
                            <Button
                                as={Link}
                                href="/products/import"
                                variant="outline"
                            >
                                Import from Instagram
                            </Button>
                        </CardContent>
                    )}
                </Card>
            ),
        },
    ];

    return (
        <Layout breadcrumbs={[]} variant="header">
            <Head>
                <title>Get Started - Setup Your Store</title>
            </Head>

            <div className="container mx-auto px-4 py-8 max-w-xl">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">
                        Setup your store
                    </h1>
                    <p className="text-muted-foreground">
                        Follow these steps to set up your store and start
                        selling. We'll guide you through the entire process.
                    </p>
                </div>

                <div className="space-y-6">
                    {steps.map((step, index) => (
                        <div key={index} className="flex items-start gap-4">
                            <div
                                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.complete ? "bg-green-100 text-green-600" : "bg-primary/10"}`}
                            >
                                {step.complete ? (
                                    <CheckCircle2 className="w-6 h-6" />
                                ) : (
                                    step.icon
                                )}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-4">
                                    <h3 className="text-xl font-semibold">
                                        {step.title}
                                    </h3>
                                    {step.complete && (
                                        <span className="text-sm text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                                            Completed
                                        </span>
                                    )}
                                </div>
                                <div>{step.content(step.complete)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default GetStarted;
