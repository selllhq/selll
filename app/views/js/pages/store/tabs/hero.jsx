import React from "react";
import Label from "@/components/form/label";
import Input from "@/components/form/input";
import InputError from "@/components/form/input-error";
import { Switch } from "@/components/form/switch";
import { cn } from "@/utils";

const HeroTab = ({ data, setData, errors }) => {
    return (
        <div className="space-y-6">
            <div>
                <Label>Hero Section</Label>
                <div className="mt-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">
                                Show Hero Section
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

                            <div className="mt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium">
                                            Show Hero Button
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Display a call-to-action button in the hero section
                                        </p>
                                    </div>
                                    <Switch
                                        checked={data.show_hero_button}
                                        onCheckedChange={(checked) =>
                                            setData("show_hero_button", checked)
                                        }
                                    />
                                </div>

                                {data.show_hero_button && (
                                    <div className="space-y-4 mt-4 pl-4 border-l-2 border-[#2C2C2C]">
                                        <div>
                                            <Label
                                                htmlFor="hero_button_text"
                                                className="text-sm font-medium mb-2"
                                            >
                                                Button Text
                                            </Label>
                                            <Input
                                                id="hero_button_text"
                                                type="text"
                                                className="block w-full bg-gray-100 dark:bg-[#2C2C2C] border-0 focus:ring-primary-orange/20"
                                                value={data.hero_button_text}
                                                onChange={(e) =>
                                                    setData("hero_button_text", e.target.value)
                                                }
                                                placeholder="Shop Now"
                                            />
                                            <InputError message={errors.hero_button_text} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeroTab;
