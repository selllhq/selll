import { Head, useForm } from "@inertiajs/react";
import { Store, LayoutDashboard, Palette, Image } from "lucide-react";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { Switch } from "@/components/form/switch";
import { cn } from "@/utils";
import Layout from "@/layouts/app-layout";
import * as Tabs from "@radix-ui/react-tabs";

const Customize = ({ store }) => {
    const storeConfig = JSON.parse(store?.config ?? "{}");
    const { data, setData, post, errors, processing } = useForm({
        show_hero: storeConfig?.show_hero ?? false,
        hero_image: storeConfig?.hero_image ?? "",
        hero_title: storeConfig?.hero_title ?? "",
        hero_description: storeConfig?.hero_description ?? "",
        hero_content_alignment: storeConfig?.hero_content_alignment ?? "center",
        show_store_name: storeConfig?.show_store_name ?? true,
        show_store_logo: storeConfig?.show_store_logo ?? true,
        show_store_description: storeConfig?.show_store_description ?? true,
        show_store_information_in_popup:
            storeConfig?.show_store_information_in_popup ?? true,
        show_product_price: storeConfig?.show_product_price ?? true,
        show_product_description: storeConfig?.show_product_description ?? true,
        theme_color: storeConfig?.theme_color ?? "#FF6B00",
        background_color: storeConfig?.background_color ?? "#141414",
        text_color: storeConfig?.text_color ?? "#FFFFFF",
        border_color: storeConfig?.border_color ?? "#2C2C2C",
        open_product_in_popup: storeConfig?.open_product_in_popup ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        post("/store/customize");
    };

    return (
        <Layout
            variant="header"
            breadcrumbs={[
                {
                    title: "Dashboard",
                    href: "/dashboard",
                },
                {
                    title: "Customize Store",
                    href: "/store/customize",
                    icon: Store,
                },
            ]}
        >
            <Head title="Customize Store" />

            <div className="flex h-[calc(100vh-5rem)]">
                <div className="w-[60%] overflow-y-auto border-r dark:border-[#2C2C2C] p-6 pt-20">
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-medium mb-2">
                                Store Customization
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400">
                                Customize how your store looks and feels
                            </p>
                        </div>

                        <form onSubmit={submit}>
                            <Tabs.Root
                                defaultValue="layout"
                                className="space-y-8"
                            >
                                <Tabs.List className="flex space-x-1 border-b border-gray-800">
                                    <Tabs.Trigger
                                        value="layout"
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground",
                                            "border-b-2 border-transparent",
                                            "hover:text-secondary-foreground data-[state=active]:text-secondary-foreground data-[state=active]:border-primary-orange",
                                        )}
                                    >
                                        <LayoutDashboard className="w-4 h-4" />
                                        Layout
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        value="hero"
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground",
                                            "border-b-2 border-transparent",
                                            "hover:text-secondary-foreground data-[state=active]:text-secondary-foreground data-[state=active]:border-primary-orange",
                                        )}
                                    >
                                        <Image className="w-4 h-4" />
                                        Hero Section
                                    </Tabs.Trigger>
                                    <Tabs.Trigger
                                        value="theme"
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground",
                                            "border-b-2 border-transparent",
                                            "hover:text-secondary-foreground data-[state=active]:text-secondary-foreground data-[state=active]:border-primary-orange",
                                        )}
                                    >
                                        <Palette className="w-4 h-4" />
                                        Theme
                                    </Tabs.Trigger>
                                </Tabs.List>

                                <div className="mt-6">
                                    <Tabs.Content
                                        value="layout"
                                        className="space-y-6"
                                    >
                                        <div className="space-y-6">
                                            <div>
                                                <Label>Display Settings</Label>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium">
                                                                Show Store Name
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Display your
                                                                store name in
                                                                the header
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                data.show_store_name
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                setData(
                                                                    "show_store_name",
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium">
                                                                Show Store Logo
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Display your
                                                                store logo in
                                                                the header
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                data.show_store_logo
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                setData(
                                                                    "show_store_logo",
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium">
                                                                Show Store
                                                                Description
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Display your
                                                                store
                                                                description on
                                                                the homepage
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                data.show_store_description
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                setData(
                                                                    "show_store_description",
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium">
                                                                Store
                                                                Information in
                                                                Popup
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Show store
                                                                information in a
                                                                popup instead of
                                                                the footer
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                data.show_store_information_in_popup
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                setData(
                                                                    "show_store_information_in_popup",
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium">
                                                                Show Product
                                                                Prices
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Display product
                                                                prices in the
                                                                catalog
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                data.show_product_price
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                setData(
                                                                    "show_product_price",
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium">
                                                                Show Product
                                                                Descriptions
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Display product
                                                                descriptions in
                                                                the catalog
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                data.show_product_description
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                setData(
                                                                    "show_product_description",
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tabs.Content>

                                    <Tabs.Content
                                        value="hero"
                                        className="space-y-6"
                                    >
                                        <div className="space-y-6">
                                            <div>
                                                <Label>Hero Section</Label>
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <h3 className="font-medium">
                                                                Show Hero
                                                                Section
                                                            </h3>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                                Display a hero
                                                                section at the
                                                                top of your
                                                                store
                                                            </p>
                                                        </div>
                                                        <Switch
                                                            checked={
                                                                data.show_hero
                                                            }
                                                            onCheckedChange={(
                                                                checked,
                                                            ) =>
                                                                setData(
                                                                    "show_hero",
                                                                    checked,
                                                                )
                                                            }
                                                        />
                                                    </div>

                                                    {data.show_hero && (
                                                        <div className="space-y-4 pl-4 border-l-2 border-[#2C2C2C]">
                                                            <div>
                                                                <Label
                                                                    htmlFor="hero_image"
                                                                    className="text-sm font-medium mb-2"
                                                                >
                                                                    Hero Image
                                                                    URL
                                                                </Label>
                                                                <Input
                                                                    id="hero_image"
                                                                    type="text"
                                                                    className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                                    value={
                                                                        data.hero_image
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            "hero_image",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="https://example.com/hero-image.jpg"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.hero_image
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <Label
                                                                    htmlFor="hero_title"
                                                                    className="text-sm font-medium mb-2"
                                                                >
                                                                    Hero Title
                                                                </Label>
                                                                <Input
                                                                    id="hero_title"
                                                                    type="text"
                                                                    className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                                    value={
                                                                        data.hero_title
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            "hero_title",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Welcome to our store"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.hero_title
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <Label
                                                                    htmlFor="hero_description"
                                                                    className="text-sm font-medium mb-2"
                                                                >
                                                                    Hero
                                                                    Description
                                                                </Label>
                                                                <textarea
                                                                    id="hero_description"
                                                                    className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20 rounded-lg"
                                                                    value={
                                                                        data.hero_description
                                                                    }
                                                                    onChange={(
                                                                        e,
                                                                    ) =>
                                                                        setData(
                                                                            "hero_description",
                                                                            e
                                                                                .target
                                                                                .value,
                                                                        )
                                                                    }
                                                                    placeholder="Describe your store or add a welcome message"
                                                                    rows={3}
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.hero_description
                                                                    }
                                                                />
                                                            </div>

                                                            <div>
                                                                <Label
                                                                    htmlFor="hero_content_alignment"
                                                                    className="text-sm font-medium mb-2"
                                                                >
                                                                    Content
                                                                    Alignment
                                                                </Label>
                                                                <div className="grid grid-cols-3 gap-2">
                                                                    {[
                                                                        "left",
                                                                        "center",
                                                                        "right",
                                                                    ].map(
                                                                        (
                                                                            alignment,
                                                                        ) => (
                                                                            <button
                                                                                key={
                                                                                    alignment
                                                                                }
                                                                                type="button"
                                                                                onClick={() =>
                                                                                    setData(
                                                                                        "hero_content_alignment",
                                                                                        alignment,
                                                                                    )
                                                                                }
                                                                                className={cn(
                                                                                    "p-2 text-sm rounded-lg capitalize",
                                                                                    data.hero_content_alignment ===
                                                                                        alignment
                                                                                        ? "bg-primary-orange text-white"
                                                                                        : "bg-gray-100 dark:bg-[#2C2C2C] hover:bg-gray-200 dark:hover:bg-[#3C3C3C]",
                                                                                )}
                                                                            >
                                                                                {
                                                                                    alignment
                                                                                }
                                                                            </button>
                                                                        ),
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Tabs.Content>

                                    <Tabs.Content
                                        value="theme"
                                        className="space-y-6"
                                    >
                                        <div className="space-y-6">
                                            <div>
                                                <Label>Theme Colors</Label>
                                                <div className="mt-4 space-y-4">
                                                    <div>
                                                        <Label
                                                            htmlFor="theme_color"
                                                            className="text-sm font-medium mb-2"
                                                        >
                                                            Theme Color
                                                        </Label>
                                                        <Input
                                                            id="theme_color"
                                                            type="color"
                                                            className="h-12 block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                            value={
                                                                data.theme_color
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "theme_color",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.theme_color
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label
                                                            htmlFor="background_color"
                                                            className="text-sm font-medium mb-2"
                                                        >
                                                            Background Color
                                                        </Label>
                                                        <Input
                                                            id="background_color"
                                                            type="color"
                                                            className="h-12 block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                            value={
                                                                data.background_color
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "background_color",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.background_color
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label
                                                            htmlFor="text_color"
                                                            className="text-sm font-medium mb-2"
                                                        >
                                                            Text Color
                                                        </Label>
                                                        <Input
                                                            id="text_color"
                                                            type="color"
                                                            className="h-12 block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                            value={
                                                                data.text_color
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "text_color",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.text_color
                                                            }
                                                        />
                                                    </div>

                                                    <div>
                                                        <Label
                                                            htmlFor="border_color"
                                                            className="text-sm font-medium mb-2"
                                                        >
                                                            Border Color
                                                        </Label>
                                                        <Input
                                                            id="border_color"
                                                            type="color"
                                                            className="h-12 block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                            value={
                                                                data.border_color
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "border_color",
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.border_color
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Tabs.Content>
                                </div>
                            </Tabs.Root>

                            <div className="mt-20 border-t dark:border-[#2C2C2C] pt-6 space-y-4">
                                <Button
                                    type="submit"
                                    className="w-full bg-primary-orange hover:bg-primary-orange/90"
                                    disabled={processing}
                                >
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="w-[40%] bg-gray-50 dark:bg-[#1C1C1C] overflow-y-auto">
                    <div className="p-8">
                        <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-[#2C2C2C] bg-white dark:bg-[#141414]">
                            <div
                                className="min-h-[600px] flex flex-col"
                                style={{
                                    backgroundColor: data.background_color,
                                    color: data.text_color,
                                }}
                            >
                                <div
                                    className="p-4"
                                    style={{
                                        borderBottom: `1px solid ${data.border_color}`,
                                    }}
                                >
                                    <div className="flex items-center justify-between">
                                        {data.show_store_name && (
                                            <span className="text-sm">
                                                {store?.name}
                                            </span>
                                        )}
                                        <span className="text-sm">
                                            Cart (0)
                                        </span>
                                    </div>
                                </div>

                                {data.show_hero && (
                                    <div className="relative">
                                        <div className="aspect-[21/9] w-full overflow-hidden relative">
                                            {data.hero_image ? (
                                                <>
                                                    <img
                                                        src={data.hero_image}
                                                        alt="Hero"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.src =
                                                                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMSAxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMkMyQzJDIi8+PC9zdmc+";
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                </>
                                            ) : (
                                                <div className="w-full h-full bg-[#2C2C2C] flex items-center justify-center">
                                                    <svg
                                                        className="w-12 h-12 text-gray-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                            <div
                                                className={cn(
                                                    "absolute inset-0 flex flex-col justify-end p-8",
                                                    {
                                                        "items-start text-left":
                                                            data.hero_content_alignment ===
                                                            "left",
                                                        "items-center text-center":
                                                            data.hero_content_alignment ===
                                                            "center",
                                                        "items-end text-right":
                                                            data.hero_content_alignment ===
                                                            "right",
                                                    },
                                                )}
                                            >
                                                {data.hero_title && (
                                                    <h1 className="text-2xl font-bold mb-4 text-white">
                                                        {data.hero_title}
                                                    </h1>
                                                )}
                                                {data.hero_description && (
                                                    <p className="text-sm text-white/70">
                                                        {data.hero_description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Products Grid */}
                                <div className="flex-1 p-4 grid grid-cols-1 gap-4">
                                    <div
                                        className="rounded-lg overflow-hidden"
                                        style={{
                                            border: `1px solid ${data.border_color}`,
                                        }}
                                    >
                                        <div className="aspect-square bg-gray-800 flex items-center justify-center">
                                            <svg
                                                className="w-8 h-8 text-gray-600"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-medium">
                                                Test Product
                                            </h3>
                                            {data.show_product_description && (
                                                <p className="text-sm opacity-70 mt-1">
                                                    This is a test product
                                                </p>
                                            )}
                                            {data.show_product_price && (
                                                <p
                                                    className="mt-2 font-medium"
                                                    style={{
                                                        color: data.theme_color,
                                                    }}
                                                >
                                                    GHS 120.00
                                                </p>
                                            )}
                                            <button
                                                className="w-full mt-3 py-2 rounded-lg text-white text-sm"
                                                style={{
                                                    backgroundColor:
                                                        data.theme_color,
                                                }}
                                            >
                                                View in Store
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div
                                    className="mt-auto"
                                    style={{
                                        borderTop: `1px solid ${data.border_color}`,
                                    }}
                                >
                                    <div className="p-6">
                                        {data.show_store_description && (
                                            <p className="text-sm opacity-70 mb-4">
                                                This is a test
                                            </p>
                                        )}
                                        <div className="grid grid-cols-3 gap-8 mb-8">
                                            <div>
                                                <h4 className="font-medium mb-2">
                                                    Quick Links
                                                </h4>
                                                <ul className="space-y-1 text-sm opacity-70">
                                                    <li>Home</li>
                                                    <li>Products</li>
                                                    <li>Contact Us</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">
                                                    Customer Service
                                                </h4>
                                                <ul className="space-y-1 text-sm opacity-70">
                                                    <li>FAQ</li>
                                                    <li>Shipping & Returns</li>
                                                    <li>Privacy Policy</li>
                                                </ul>
                                            </div>
                                            <div>
                                                <h4 className="font-medium mb-2">
                                                    Contact Us
                                                </h4>
                                                <ul className="space-y-1 text-sm opacity-70">
                                                    <li>test@test.com</li>
                                                    <li>+1 (555) 123-4567</li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div
                                            className="flex items-center justify-center gap-4 pt-6"
                                            style={{
                                                borderTop: `1px solid ${data.border_color}`,
                                            }}
                                        >
                                            <a
                                                href="#"
                                                className="text-gray-500 hover:text-gray-400"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-500 hover:text-gray-400"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                                </svg>
                                            </a>
                                            <a
                                                href="#"
                                                className="text-gray-500 hover:text-gray-400"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Customize;
