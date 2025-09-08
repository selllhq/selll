import { toast } from "sonner";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Instagram,
    MessageSquare,
    Smartphone,
    ShoppingCart,
} from "lucide-react";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from "@/layouts/app-layout";
import Input from "@/components/form/input";
import Button from "@/components/form/button";
import { useDialog } from "@/components/ui/dialog";
import InputError from "@/components/form/input-error";
import { slugify, urlify } from "@/utils";
import { PageHeader } from "@/components/layout/header";

export default function Domain({ store }) {
    const confirmModal = useDialog("confirmAction");

    const { data, setData, post, errors, processing } = useForm({
        slug: store?.slug || "",
        domain: store?.custom_domains?.[0]?.domain || "",
    });

    const handleStoreDomain = (e) => {
        e.preventDefault();

        confirmModal.openDialog({
            title: "Update Store URL",
            description:
                "Changing your store URL will immediately update the link customers use to access your store. Are you sure you want to proceed?",
            cancelText: "Cancel",
            confirmText: "Yes, Update",
            onConfirm: () => {
                post("/store/domain", {
                    onSuccess: () => {
                        toast.success("Store URL updated successfully");
                        confirmModal.closeDialog();
                        router.visit("/store/customize", {
                            preserveState: true,
                            preserveScroll: true,
                        });
                    },
                });
            },
        });
    };

    const handleCustomDomain = (e) => {
        e.preventDefault();

        confirmModal.openDialog({
            title: "Add custom domain",
            description:
                "This will involve some advanced configuration of your domain name registrar. Please review this guide before you begin.",
            cancelText: "Close",
            confirmText: "Got it",
            onConfirm: () => {
                post("/store/domain/custom", {
                    onSuccess: () => {
                        toast.success("Custom domain added successfully.");
                        confirmModal.closeDialog();
                        router.visit("/store/domain/setup", {
                            preserveState: true,
                            preserveScroll: true,
                        });
                    },
                });
            },
        });
    };

    return (
        <Layout>
            <Head title="Change Store URL" />

            <div className="flex flex-col lg:flex-row px-4 lg:px-8 pt-6 pb-20 lg:pb-8 max-w-[calc(100vw-1rem)] md:max-w-[calc(100vw-275px)] lg:max-w-7xl mx-auto w-full">
                    <PageHeader
                        title="Store URL"
                        description="Update your store URL"
                    />

                <div className="w-full md:w-[60%] lg:p-6 pt-10 max-w-lg md:mr-auto">
                    <Tabs.Root defaultValue="selll" className="space-y-6">
                        <Tabs.List className="flex space-x-1 border-b border-gray-800">
                            <Tabs.Trigger
                                value="selll"
                                className="px-4 py-2 text-sm font-medium text-muted-foreground border-b-2 border-transparent data-[state=active]:text-secondary-foreground data-[state=active]:border-primary-orange"
                            >
                                Selll Link
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value="custom"
                                className="px-4 py-2 text-sm font-medium text-muted-foreground border-b-2 border-transparent data-[state=active]:text-secondary-foreground data-[state=active]:border-primary-orange"
                            >
                                Custom Domain
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="selll" asChild>
                            <form
                                onSubmit={handleStoreDomain}
                                className="space-y-6"
                            >
                                <div className="mb-4">
                                    {/* <Label
                                        htmlFor="slug"
                                        className="text-sm font-medium block mb-3"
                                    >
                                        Store URL
                                    </Label> */}
                                    <div className="relative">
                                        <Input
                                            id="slug"
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 pr-24"
                                            value={data.slug}
                                            onChange={(e) =>
                                                setData(
                                                    "slug",
                                                    slugify(e.target.value),
                                                )
                                            }
                                            required
                                            placeholder="myshopurl"
                                        />
                                        <div className="absolute top-0 right-0 px-4 h-full inline-flex items-center min-w-fit rounded-e-lg text-muted-foreground">
                                            <span className="text-sm">
                                                .selll.store
                                            </span>
                                        </div>
                                    </div>
                                    <InputError
                                        message={errors.slug}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="text-sm text-muted-foreground">
                                    Your store will be accessible at:{" "}
                                    <a
                                        href={`https://${data.slug}.selll.store`}
                                        className="font-medium text-foreground"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        https://{data?.slug}.selll.store
                                    </a>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary-orange hover:bg-primary-orange/90 w-full"
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </Tabs.Content>

                        <Tabs.Content value="custom">
                            <form
                                onSubmit={handleCustomDomain}
                                className="space-y-6"
                            >
                                <p>
                                    Custom domains help your store look more
                                    professional and trustworthy. They also make
                                    it easier for customers to remember your
                                    store link.
                                </p>
                                <div className="mb-4">
                                    {/* <Label
                                        htmlFor="slug"
                                        className="text-sm font-medium block mb-3"
                                    >
                                        Store URL
                                    </Label> */}
                                    <Input
                                        id="slug"
                                        className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20 pr-24"
                                        value={data.domain}
                                        onChange={(e) =>
                                            setData("domain", urlify(e.target.value))
                                        }
                                        required
                                        placeholder="myshopurl.com"
                                    />
                                    <InputError
                                        message={errors.domain}
                                        className="mt-2"
                                    />
                                </div>

                                {data?.domain && (
                                    <div className="text-sm text-muted-foreground">
                                        Your store will be accessible at:{" "}
                                        <a
                                            href={data?.domain}
                                            className="font-medium text-foreground"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {data?.domain}
                                        </a>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-primary-orange hover:bg-primary-orange/90 w-full"
                                >
                                    Save Changes
                                </Button>
                            </form>
                        </Tabs.Content>
                    </Tabs.Root>
                </div>

                <div className="w-full lg:w-[40%] md:overflow-y-auto lg:p-6 pt-20">
                    <TipsSection />
                </div>
            </div>
        </Layout>
    );
}

function TipsSection() {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                How to Use Your Selll Store Link Effectively
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
                <div className="grid grid-cols-[auto_1fr] items-start gap-3 p-4 rounded-lg border dark:border-[#2C2C2C] bg-gray-50 dark:bg-[#1b1b1b]">
                    <Instagram className="w-5 h-5 text-primary-orange mt-0.5" />
                    <div className="text-sm leading-relaxed">
                        <p className="font-medium">
                            Add it to your Instagram/Twitter bio
                        </p>
                        <p className="text-muted-foreground">
                            Let new visitors find your store easily. Include a
                            clear call-to-action like:
                            <br />
                            “Tap the link to shop all our products directly on
                            our website.”
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-3 p-4 rounded-lg border dark:border-[#2C2C2C] bg-gray-50 dark:bg-[#1b1b1b]">
                    <MessageSquare className="w-5 h-5 text-primary-orange mt-0.5" />
                    <div className="text-sm leading-relaxed">
                        <p className="font-medium">
                            Include it in Instagram Quick Replies
                        </p>
                        <p className="text-muted-foreground">
                            Save a quick reply in your DMs so you can instantly
                            send your store link to customers asking for product
                            lists — no need to resend pictures every time.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-3 p-4 rounded-lg border dark:border-[#2C2C2C] bg-gray-50 dark:bg-[#1b1b1b]">
                    <ShoppingCart className="w-5 h-5 text-primary-orange mt-0.5" />
                    <div className="text-sm leading-relaxed">
                        <p className="font-medium">
                            Share customer cart screenshots
                        </p>
                        <p className="text-muted-foreground">
                            When someone orders through your Selll store,
                            screenshot their cart and share it on your feed or
                            stories. It builds trust and drives others to click
                            the link.
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-[auto_1fr] items-start gap-3 p-4 rounded-lg border dark:border-[#2C2C2C] bg-gray-50 dark:bg-[#1b1b1b]">
                    <Smartphone className="w-5 h-5 text-primary-orange mt-0.5" />
                    <div className="text-sm leading-relaxed">
                        <p className="font-medium">
                            Post it on your WhatsApp Status
                        </p>
                        <p className="text-muted-foreground">
                            Add a few product images to your status, then
                            include your store link so people can browse
                            everything without bombarding them with too many
                            photos.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
