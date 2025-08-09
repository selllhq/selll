import { toast } from "sonner";
import { useState } from "react";
import { Edit } from "lucide-react";
import { Head, useForm } from "@inertiajs/react";

import Layout from "@/layouts/app-layout";
import Button from "@/components/form/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/shared/card";

import Map from "./map";

const Delivery = ({
    auth,
    deliveries,
    currentStore,
    deliveryDefaults,
    deliveryUpdates,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const { data, setData, post, errors, processing } = useForm({
        allow_pickups: deliveryDefaults?.allow_pickups ?? false,
        expected_delivery_days: deliveryDefaults?.expected_delivery_days ?? 1,
        longitude: deliveryDefaults?.longitude ?? "",
        latitude: deliveryDefaults?.latitude ?? "",
        work_hours: [],
    });

    const handleDeliveryDefaults = (e) => {
        e.preventDefault();

        if (!data.longitude || !data.latitude) {
            alert("Please select a pickup location on the map.");
            return;
        }

        post("/deliveries/defaults", {
            onFinish: () => {
                toast.success("Delivery settings saved successfully!");
                setIsEditing(false);
            },
        });
    };

    return (
        <Layout
            variant="header"
            className="p-4 pt-2"
            breadcrumbs={[
                {
                    title: "Home",
                    href: "/dashboard",
                },
            ]}
        >
            <Head title="Delivery" />

            <div className="md:py-4 md:px-4">
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold md:mb-2">
                        Hello, {auth.user.name.split(" ")[0]}
                    </h2>
                    <p className="text-muted-foreground text-sm md:text-base">
                        {!deliveryDefaults
                            ? `Let's setup deliveries for ${currentStore?.name}`
                            : `You can update your delivery settings here.`}
                    </p>
                </div>

                {!deliveryDefaults || isEditing ? (
                    // <Card className="text-sm rounded-3xl border border-primary-red/10">
                    //     <CardHeader className="mb-4">
                    //         <CardTitle>
                    //             Welcome to Delivery Setup
                    //         </CardTitle>
                    //     </CardHeader>
                    //     <CardContent>
                    //         Hello, it seems like you haven't set up your delivery
                    //         options yet. To start offering delivery services to
                    //     </CardContent>
                    // </Card>
                    <>
                        <form
                            className="space-y-10 mt-8"
                            onSubmit={handleDeliveryDefaults}
                        >
                            <div>
                                <p className="block font-medium mb-2">
                                    Enable Direct Pickup?
                                </p>
                                <label className="font-light text-base flex sm:items-center">
                                    <input
                                        type="checkbox"
                                        checked={data.allow_pickups}
                                        className="mr-2 w-4 h-4 mt-1 sm:mt-0"
                                        value={data.allow_pickups}
                                        onChange={(e) =>
                                            setData(
                                                "allow_pickups",
                                                e.target.checked,
                                            )
                                        }
                                    />
                                    I allow customers to directly pick up orders
                                    from my store
                                </label>
                            </div>
                            <div>
                                <label className="block font-medium mb-2">
                                    Default Expected Delivery Days
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={30}
                                    value={data.expected_delivery_days}
                                    className="border rounded-3xl w-full px-3 py-2 sm:w-32"
                                    onChange={(e) =>
                                        setData(
                                            "expected_delivery_days",
                                            Number(e.target.value),
                                        )
                                    }
                                />
                                <p className="text-sm text-muted-foreground mt-1">
                                    This will be the default expected delivery
                                    time for all orders, you can update the
                                    order delivery time later.
                                </p>
                            </div>
                            <div>
                                <label className="block font-medium mb-2">
                                    Pickup Location <br />
                                    <small className="text-sm text-muted-foreground font-light">
                                        This is the location where customers and
                                        delivery personnel can pick up orders.
                                    </small>
                                </label>
                                <div className="h-64 rounded-xl overflow-hidden border">
                                    <Map
                                        value={{
                                            longitude: data.longitude,
                                            latitude: data.latitude,
                                        }}
                                        onChange={(loc) => {
                                            setData("longitude", loc.lngLat[0]);
                                            setData("latitude", loc.lngLat[1]);

                                            // Try to extract city and country from loc.address or loc context
                                            // Use regex or split for city, country (Mapbox returns 'place_name' as 'city, region, country')
                                            let city = "";
                                            let country = "";

                                            if (loc.address) {
                                                const parts = loc.address
                                                    .split(",")
                                                    .map((s) => s.trim());
                                                country =
                                                    parts[parts.length - 1] ||
                                                    "";
                                                city =
                                                    parts.length > 2
                                                        ? parts[
                                                              parts.length - 3
                                                          ]
                                                        : "";
                                            }

                                            // setCustomerInfo((prev) => ({
                                            //     ...prev,
                                            //     city,
                                            //     country,
                                            // }));
                                        }}
                                    />
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    Selected: {Number(data.latitude).toFixed(5)}
                                    , {Number(data.longitude).toFixed(5)}
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground">
                                You can change these settings later by clicking
                                on the "Deliveries" page.
                            </p>

                            <Button
                                type="submit"
                                loading={processing}
                                disabled={processing}
                                className="bg-primary-orange text-white w-full sm:w-auto px-6 py-2 mb-5 sm:mb-0"
                            >
                                Save Delivery Settings
                            </Button>

                            {isEditing && (
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditing(false)}
                                    className="w-full sm:w-auto px-6 py-2 -mt-5 mb-5 sm:mb-0"
                                >
                                    Cancel
                                </Button>
                            )}
                        </form>
                    </>
                ) : (
                    <>
                        <Card className="mt-6 rounded-3xl">
                            <CardHeader className="mb-2 flex flex-row items-center justify-between">
                                <CardTitle className="text-xl dark:text-primary">
                                    Delivery Defaults
                                </CardTitle>
                                <Button
                                    className="p-2 h-8"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Edit className="w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <p>
                                        Allow Direct Pickup:{" "}
                                        {deliveryDefaults.allow_pickups
                                            ? "Yes"
                                            : "No"}
                                    </p>
                                    <p>
                                        Expected Delivery Days:{" "}
                                        {
                                            deliveryDefaults.expected_delivery_days
                                        }
                                    </p>
                                    <p>
                                        Pickup Location:{" "}
                                        {deliveryDefaults.latitude},{" "}
                                        {deliveryDefaults.longitude}
                                    </p>
                                    {data.longitude && data.latitude && (
                                        <iframe
                                            width="100%"
                                            height="400"
                                            frameborder="0"
                                            className="border-0 rounded-xl"
                                            src={`https://www.google.com/maps?q=${data.latitude},${data.longitude}&hl=en&z=14&output=embed`}
                                            allowfullscreen
                                        ></iframe>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {deliveryUpdates && (
                            // <div className="mt-6">
                            //     <h3 className="text-lg font-semibold mb-2">
                            //         Recent Updates
                            //     </h3>
                            //     <ul className="list-disc pl-5 space-y-1">
                            //         {deliveryUpdates.map((update, index) => (
                            //             <li key={index}>
                            //                 {update.description} -{" "}
                            //                 {new Date(
                            //                     update.created_at,
                            //                 ).toLocaleDateString()}
                            //             </li>
                            //         ))}
                            //     </ul>
                            // </div>
                            <></>
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Delivery;
