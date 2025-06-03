import { Head, useForm } from "@inertiajs/react";
import { AlertCircleIcon, ChevronLeft, CloudUpload } from "lucide-react";
import { slugify } from "@/utils";
import { useState, useRef } from "react";
import Button from "@/components/form/button";
import InputError from "@/components/form/input-error";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Setup = ({ auth }) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, errors, hasErrors, processing } = useForm({
        name: `${auth.user.name}'s Store`,
        description: "",
        slug: slugify(auth.user.name),
        logo: null,
        currency: "GHS",
        email: "",
        phone: "",
        address: "",
        estimated_sales_volume: "Less than GHS 1,000",
        selling_journey_status: "Just getting started",
        product_types: "Fashion & Apparel",
        customer_source: "Instagram",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                setData("logo", file);
            };
            reader.readAsDataURL(file);
        }
    };

    const nextStep = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => Math.min(prev + 1, 3));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const submit = (e) => {
        e.preventDefault();
        post("/store/new");
    };

    return (
        <>
            <Head title="Create your new store" />

            <div className="h-screen w-full dark:bg-[#141414] flex flex-col md:flex-row">
                <div className="w-full lg:w-[60%] overflow-y-auto dark:border-r border-[#2C2C2C] flex justify-center items-center">
                    <div className="max-w-xl w-full mx-auto px-4 md:px-8 py-10 md:py-20 relative">
                        <div className="mb-10 md:pt-12">
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">
                                {currentStep === 1
                                    ? `Welcome ${auth.user.name?.split(" ")[0]}!`
                                    : currentStep === 2
                                      ? `Okay ${auth.user.name?.split(" ")[0]},`
                                      : "Final Step, woohoo!"}
                            </h2>
                            <p className="text-muted-foreground dark:text-gray-400">
                                {currentStep === 1 ? (
                                    <span>
                                        You're just 2 minutes away from <br />{" "}
                                        selling your first product.
                                    </span>
                                ) : currentStep === 2 ? (
                                    "How will your customers find you?"
                                ) : (
                                    "Let's get some final details in place."
                                )}
                            </p>
                        </div>

                        <div className="hidden fixed left-8 top-1/2 transform -translate-y-1/2 xl:flex flex-col items-center justify-center mb-8">
                            <div className="flex flex-col items-center space-y-3">
                                {[1, 2, 3].map((step) => (
                                    <div
                                        key={step}
                                        className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                                            currentStep === step
                                                ? "bg-primary-orange"
                                                : "bg-gray-300 dark:bg-gray-600"
                                        }`}
                                    ></div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-8 pb-8">
                            {hasErrors && (
                                <Alert variant="destructive">
                                    <AlertCircleIcon />
                                    <AlertTitle>
                                        You have some errors
                                    </AlertTitle>
                                    <AlertDescription>
                                        <p>
                                            Please verify your store information
                                            and try again. You can press 'Back' to
                                            view the previous step.
                                        </p>
                                    </AlertDescription>
                                </Alert>
                            )}

                            {currentStep === 1 && (
                                <>
                                    <div className="mb-8">
                                        <Label
                                            htmlFor="logo"
                                            className="text-sm font-medium block mb-4"
                                        >
                                            Upload your store logo (Optional)
                                        </Label>
                                        <div className="mt-4 flex items-center space-x-4">
                                            <label
                                                htmlFor="logo"
                                                className="cursor-pointer"
                                            >
                                                <div className="relative w-24 h-24 bg-gray-200 dark:bg-[#2C2C2C] rounded-full flex items-center justify-center border border-gray-300 dark:border-[#2C2C2C]">
                                                    {profileImage ? (
                                                        <img
                                                            src={profileImage}
                                                            alt="Preview"
                                                            className="w-full h-full rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-20 h-20 rounded-full bg-background dark:bg-[#141414] flex items-center justify-center">
                                                            <CloudUpload className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                                                        </div>
                                                    )}
                                                </div>
                                            </label>
                                            <input
                                                id="logo"
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageChange}
                                            />
                                            <div>
                                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                    Select a logo
                                                </p>
                                                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                    Make sure the file is below
                                                    2MB
                                                </p>
                                                {errors.logo && (
                                                    <p className="text-red-500 text-xs mt-1">
                                                        {errors.logo}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <Label
                                            htmlFor="name"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            Store Name
                                        </Label>
                                        <Input
                                            id="name"
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            required
                                            placeholder="My Super Store"
                                        />
                                        {errors?.name ? (
                                            <InputError
                                                className="mt-2"
                                                message={errors.name}
                                            />
                                        ) : (
                                            <small className="text-xs text-muted-foreground mt-1 block">
                                                This name will appear on
                                                receipts, invoices, and other
                                                communication.
                                            </small>
                                        )}
                                    </div>

                                    <div className="mb-6">
                                        <Label
                                            htmlFor="description"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            Store Description (At least 10
                                            characters)
                                        </Label>
                                        <Input
                                            id="description"
                                            as="textarea"
                                            className="block w-full min-h-20 dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            value={data.description}
                                            onChange={(e) =>
                                                setData(
                                                    "description",
                                                    e.target.value,
                                                )
                                            }
                                            required
                                            placeholder="Tell your customers what you sell..."
                                        />
                                        {errors?.description ? (
                                            <InputError
                                                className="mt-2"
                                                message={errors.description}
                                            />
                                        ) : (
                                            <small className="text-xs text-muted-foreground mt-1 block">
                                                This will show when the users
                                                click on the 'About' tab on your
                                                store.
                                            </small>
                                        )}
                                    </div>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <div className="mb-6">
                                        <Label
                                            htmlFor="slug"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            Store URL
                                        </Label>
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

                                    <div className="mt-6">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium"
                                        >
                                            Store Contact Email
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-2 block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            placeholder="your@email.com"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            required
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <Label
                                            htmlFor="phone"
                                            className="text-sm font-medium"
                                        >
                                            Store Phone Number (Optional)
                                        </Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            value={data.phone}
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            placeholder="+233 123 456 789"
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.phone}
                                            className="mt-2"
                                        />
                                    </div>

                                    {/* Store Address */}
                                    <div className="mt-6">
                                        <Label
                                            htmlFor="address"
                                            className="text-sm font-medium"
                                        >
                                            Store Address (Optional)
                                        </Label>
                                        <Input
                                            id="address"
                                            type="text"
                                            name="address"
                                            value={data.address}
                                            className="mt-2 block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            placeholder="e.g., 123 Main St, Anytown, USA"
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.address}
                                            className="mt-2"
                                        />
                                    </div>
                                </>
                            )}

                            {currentStep === 3 && (
                                <>
                                    <div className="mb-6">
                                        <Label
                                            htmlFor="currency"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            Store Currency
                                        </Label>
                                        <Input
                                            id="currency"
                                            as="select"
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            value={data.currency}
                                            onChange={(e) =>
                                                setData(
                                                    "currency",
                                                    e.target.value,
                                                )
                                            }
                                            disabled
                                        >
                                            <option value="GHS">
                                                GHS - Ghanaian Cedi
                                            </option>
                                            {/* Add other currencies as needed, e.g.:
                                            <option value="USD">USD - US Dollar</option>
                                            <option value="EUR">EUR - Euro</option>
                                            */}
                                        </Input>
                                        {errors?.currency ? (
                                            <InputError
                                                className="mt-2"
                                                message={errors.currency}
                                            />
                                        ) : (
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Only GHS is supported at the
                                                moment — more currencies are
                                                coming soon!
                                            </p>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <Label
                                            htmlFor="selling_journey_status"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            Where are you in your selling
                                            journey?
                                        </Label>
                                        <Input
                                            id="selling_journey_status"
                                            as="select"
                                            name="selling_journey_status"
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            value={data.selling_journey_status}
                                            onChange={(e) =>
                                                setData(
                                                    "selling_journey_status",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option>
                                                Just getting started
                                            </option>
                                            <option>
                                                I’ve made some sales
                                            </option>
                                            <option>I sell regularly</option>
                                            <option>
                                                I’m running a small business
                                            </option>
                                            <option>
                                                I'm running a large business
                                            </option>
                                        </Input>
                                        <InputError
                                            message={
                                                errors.selling_journey_status
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <Label
                                            htmlFor="product_types"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            What kind of products are you
                                            selling?
                                        </Label>
                                        <Input
                                            id="product_types"
                                            as="select"
                                            name="product_types"
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            value={data.product_types}
                                            onChange={(e) =>
                                                setData(
                                                    "product_types",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option>Fashion & Apparel</option>
                                            <option>Food & Beverages</option>
                                            <option>
                                                Beauty & Personal Care
                                            </option>
                                            <option>Art & Crafts</option>
                                            <option>Home & Living</option>
                                            <option>
                                                Electronics & Gadgets
                                            </option>
                                            <option>
                                                Services (e.g. coaching, design,
                                                consulting)
                                            </option>
                                            <option>
                                                Subscriptions or Memberships
                                            </option>
                                            <option>Events & Tickets</option>
                                            <option>Books & Stationery</option>
                                        </Input>
                                        <InputError
                                            message={errors.product_types}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <Label
                                            htmlFor="estimated_sales_volume"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            Estimated monthly sales?{" "}
                                            {data.selling_journey_status ===
                                                "Just getting started" &&
                                                "(Just a rough idea — no pressure!)"}
                                        </Label>
                                        <Input
                                            id="estimated_sales_volume"
                                            as="select"
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            value={data.estimated_sales_volume}
                                            onChange={(e) =>
                                                setData(
                                                    "estimated_sales_volume",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option>Less than GHS 1,000</option>
                                            <option>GHS 1,000 – 5,000</option>
                                            <option>GHS 5,000 – 20,000</option>
                                            <option>GHS 20,000 – 50,000</option>
                                            <option>Over GHS 50,000</option>
                                        </Input>
                                        <InputError
                                            message={
                                                errors.estimated_sales_volume
                                            }
                                            className="mt-2"
                                        />
                                    </div>

                                    <div className="mt-6">
                                        <Label
                                            htmlFor="customer_source"
                                            className="text-sm font-medium block mb-3"
                                        >
                                            Where do you most of your customers
                                            come from?
                                            <span className="text-xs text-gray-500 block mt-1">
                                                {data.selling_journey_status ===
                                                "Just getting started"
                                                    ? "(No pressure, just a guess!)"
                                                    : "(e.g., Instagram, WhatsApp, referrals, offline sales, etc.)"}
                                            </span>
                                        </Label>
                                        <Input
                                            id="customer_source"
                                            as="select"
                                            name="customer_source"
                                            className="block w-full dark:bg-[#2C2C2C] dark:border-0 focus:ring-primary-orange/20"
                                            value={data.customer_source || ""}
                                            onChange={(e) =>
                                                setData(
                                                    "customer_source",
                                                    e.target.value,
                                                )
                                            }
                                        >
                                            <option value="Instagram">
                                                Instagram
                                            </option>
                                            <option value="WhatsApp">
                                                WhatsApp
                                            </option>
                                            <option value="TikTok">
                                                TikTok
                                            </option>
                                            <option value="Website">
                                                Website
                                            </option>
                                            <option value="Referrals / Word of mouth">
                                                Referrals / Word of mouth
                                            </option>
                                            <option value="Offline / In-person">
                                                Offline / In-person
                                            </option>
                                            <option value="Other">Other</option>
                                        </Input>
                                        <InputError
                                            message={errors.customer_source}
                                            className="mt-2"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-between pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className="h-12 px-6 border border-[#2C2C2C] flex items-center gap-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </Button>

                                {currentStep < 3 ? (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="h-12 px-8 bg-primary-orange hover:bg-primary-orange/90 text-white flex items-center justify-center gap-2 rounded-md"
                                    >
                                        {currentStep === 1
                                            ? "Next, store URL"
                                            : "Continue"}
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        className="h-12 px-8 bg-primary-orange hover:bg-primary-orange/90 text-white flex items-center justify-center gap-2 rounded-md"
                                        disabled={processing}
                                    >
                                        Create Store
                                    </Button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                <div className="sticky hidden lg:flex flex-col flex-1 bg-background top-0 h-screen overflow-hidden items-center justify-center p-6 md:p-12">
                    <div className="w-full [align-self:flex-start] max-w-none h-full bg-white dark:bg-[#141414] rounded-2xl shadow-2xl overflow-y-hidden">
                        <div className="p-4 w-full border-b flex items-center justify-between dark:border-gray-700">
                            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
                                {data.name || "Your Store Name"}
                            </div>
                            <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
                                <span>Home</span>
                                <span>Catalog</span>
                                <span>About</span>
                            </div>
                            <div>
                                <div className="h-5 w-5 rounded-md bg-gray-300 dark:bg-gray-600">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A18.75 18.75 0 0112 22.5c-2.786 0-5.433-.608-7.499-1.688z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="relative w-full h-80 bg-gray-700 overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
                                alt="Store Hero Background"
                                className="w-full h-full object-cover opacity-50"
                            />
                            <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 bg-black/30">
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                                    Welcome to my store
                                </h2>
                                <p className="text-xs md:text-sm text-white/90 mb-3 px-4">
                                    {data.description ||
                                        "This is some text you can change if you customize your store."}
                                </p>
                                <button className="bg-primary-orange text-white text-xs font-semibold py-2 px-4 rounded hover:opacity-90 transition-opacity">
                                    Shop now →
                                </button>
                            </div>
                        </div>

                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                    Our Products
                                </h3>
                                <a
                                    href="#"
                                    className="text-xs text-primary-orange hover:underline font-medium"
                                >
                                    View all →
                                </a>
                            </div>

                            <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group"
                                    >
                                        <div className="bg-gray-100 dark:bg-gray-700 h-28 md:h-36 relative flex items-center justify-center overflow-hidden">
                                            <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-sm font-semibold">
                                                NEW
                                            </div>
                                        </div>
                                        <div className="p-3 bg-white dark:bg-[#141414]">
                                            <div className="h-3.5 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-1.5"></div>
                                            <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="mt-12 bg-[#141414] rounded-lg p-4 text-sm text-gray-400 border border-[#2C2C2C]">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-white font-medium">
                                    Store Features
                                </span>
                            </div>
                            <ul className="space-y-2 ml-2">
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>Free .selll.store domain</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>
                                        Built-in payment processing (no Stripe
                                        needed)
                                    </span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>Real-time analytics dashboard</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-orange"></div>
                                    <span>
                                        Professional store management tools
                                    </span>
                                </li>
                            </ul>
                        </div>

                        <div className="mt-4 text-center">
                            <div className="text-xs text-gray-500">
                                Your store URL will be:{" "}
                                <span className="font-bold text-foreground">
                                    https://{data.slug || "yourstore"}
                                    .selll.store
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Setup;
