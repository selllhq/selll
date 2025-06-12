import React from "react";
import Label from "@/components/form/label";
import { Switch } from "@/components/form/switch";

const LayoutTab = ({ data, setData }) => {
    return (
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
                                the homepage footer
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

                    {/* <div className="flex items-center justify-between">
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
                    </div> */}

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

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Open Product in Popup</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Open product details in a popup instead of a new page
                            </p>
                        </div>
                        <Switch
                            checked={data.open_product_in_popup}
                            onCheckedChange={(checked) =>
                                setData("open_product_in_popup", checked)
                            }
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium">Two Cards on Mobile</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Show two product cards side by side on mobile devices
                            </p>
                        </div>
                        <Switch
                            checked={data.two_cards_on_mobile}
                            onCheckedChange={(checked) =>
                                setData("two_cards_on_mobile", checked)
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LayoutTab;
