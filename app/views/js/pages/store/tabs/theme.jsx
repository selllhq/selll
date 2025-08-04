import Label from "@/components/form/label";
import Input from "@/components/form/input";
import InputError from "@/components/form/input-error";

const ThemeTab = ({ data, setData, errors }) => {
    return (
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            This color will be used for buttons, links, and accents
                        </p>
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            The main background color of your store
                        </p>
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            The main text color for your store
                        </p>
                        <InputError
                            message={
                                errors.text_color
                            }
                        />
                    </div>

                    {/* <div>
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
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            The color used for borders and dividers
                        </p>
                        <InputError
                            message={
                                errors.border_color
                            }
                        />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ThemeTab;
