import { Head, Link } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/form/button";
import { Card } from "@/components/shared/card";
import Footer from "@/components/layout/footer";
import SignUpMiniForm from "@/components/layout/sign-up-mini-form";

const Lander = ({ auth, referrer }) => {
    console.log("Referrer:", referrer);
    return (
        <div>
            <Head
                title={`${referrer.name} invites you to Selll`}
                children={
                    <meta
                        name="description"
                        content="Get your own store with no coding, add your products and get paid"
                    />
                }
            />

            <Navbar auth={auth} />

            <section className="container mx-auto pt-36 sm:pt-60 px-4 sm:px-0 min-h-[calc(100vh-150px)]">
                <div className="text-center max-w-3xl mx-auto">
                    <img
                        src={
                            referrer.avatar ??
                            "https://api.dicebear.com/9.x/avataaars/svg?radius=50&backgroundColor=372115&seed=Chase"
                        }
                        alt={referrer.name}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto"
                    />

                    <h1 className="text-4xl md:text-[78px] tracking-[-1.44px] font-bold max-w-[766px] mx-auto mt-[14px] mb-6">
                        <span className="bg-[linear-gradient(315deg,var(--color-primary-orange)_25%,var(--color-primary-red))] bg-clip-text [-webkit-text-fill-color:transparent] inline-block italic pr-2">
                            {referrer.name}
                        </span>{" "}
                        has invited you to Selll
                    </h1>

                    <p className="mx-auto md:mx-0 font-light md:text-xl text-gray-500 dark:text-gray-300">
                        Manage your orders, payments, and customers — all in one
                        place, whether you sell through DMs or at the market.
                        Selll handles the logistics, so you can focus on making
                        your customers happy.
                    </p>

                    {/* <SignUpMiniForm referrer={referrer} auth={auth} /> */}
                    <Button
                        as={Link}
                        href={`/auth/register?ref=${referrer.code}`}
                        className="p-6 my-10 font-medium rounded-full active:scale-95 transition-all duration-150 ease-in-out border-none bg-primary-red hover:bg-primary-red/80 text-white flex-shrink-0"
                    >
                        Create your store
                    </Button>
                </div>
            </section>

            <section id="features">
                <div className="container mx-auto px-4 py-16">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="bg-gray-700 !text-white rounded-3xl p-10 overflow-hidden">
                            <h4 className="text-xl md:text-3xl mb-2">
                                Know Your People
                            </h4>
                            <p>
                                See who's buying, what they love, and keep all
                                your customer information in one place
                            </p>
                            <div className="h-48">
                                <img
                                    src="/assets/img/random/customers-2.png"
                                    className="w-full pt-8"
                                    alt=""
                                />
                            </div>
                        </Card>
                        <Card className="!bg-primary-orange !text-black rounded-3xl p-10 lg:col-span-2 overflow-hidden">
                            <h4 className="text-xl md:text-3xl mb-2">
                                Inventory That Manages Itself
                            </h4>
                            <p className="lg:max-w-lg">
                                Selll automatically updates your inventory on
                                every order, and quickly alerts you when
                                something is almost out of stock
                            </p>
                            <div className="h-48">
                                <img
                                    src="/assets/img/random/inventory.png"
                                    className="w-full pt-8"
                                    alt=""
                                />
                            </div>
                        </Card>
                        <Card className="!bg-indigo-950 !text-white rounded-3xl p-10 overflow-hidden">
                            <h4 className="text-xl md:text-3xl mb-2">
                                Checkout, Anywhere
                            </h4>
                            <p>
                                Online or in person — your customers can pay you
                                through momo, bank or card with a simple link
                            </p>
                            <div className="h-48">
                                <img
                                    src="/assets/img/random/pay-2.png"
                                    className="w-full pt-4"
                                    alt=""
                                />
                            </div>
                        </Card>
                        <Card className="bg-black dark:bg-white text-white dark:text-black rounded-3xl p-10 overflow-hidden">
                            <h4 className="text-xl md:text-3xl mb-2">
                                Your Store, by the Numbers
                            </h4>
                            <p>
                                See what’s selling, what’s trending, and how
                                your store is performing over time
                            </p>
                            <div className="h-48">
                                <img
                                    src="/assets/img/random/by-the-numbers-2.png"
                                    className="w-full pt-8"
                                    alt=""
                                />
                            </div>
                        </Card>
                        <Card className="!bg-[#DA5811] !text-white rounded-3xl p-10">
                            <h4 className="text-xl md:text-3xl mb-2">
                                Stay in the Know, Always
                            </h4>
                            <p>
                                Never miss an order, customer update, or
                                delivery — we’ll keep you posted, wherever you
                                are.
                            </p>
                            <div className="h-48">
                                <img
                                    src="/assets/img/random/notis.png"
                                    className="w-full pt-8"
                                    alt=""
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mx-auto px-4 py-16">
                    <h3 className="text-2xl md:text-6xl mb-8 md:mb-16">
                        Real businesses <br /> crushing it with Selll
                    </h3>

                    <div className="grid md:grid-cols-2 items-center gap-20">
                        <img
                            src="https://cdn1.selll.online/stores/7/image.jpg"
                            className="rounded-3xl"
                            alt=""
                        />
                        <div>
                            {/* <img
                                src="https://cdn1.selll.online/stores/7/image.jpg"
                                className="w-14 mb-6"
                                alt=""
                            /> */}
                            <h4 className="text-2xl md:text-5xl font-light mb-4">
                                “I was able to create my store and receive my
                                first order in just 5 minutes. Finally, a
                                platform that actually gets simplicity.”
                            </h4>
                            <p>Kwesi Wolff @ FunGuy</p>
                            <Button
                                as="a"
                                variant="link"
                                href="https://funguy.selll.store"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-0 my-10 underline font-medium active:scale-95 transition-all duration-150 ease-in-out flex-shrink-0"
                            >
                                Order from FunGuy
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-black text-white rounded-t-3xl">
                <div className="container mx-auto px-4 py-16">
                    <div>
                        <h3 className="text-2xl md:text-5xl">
                            What’s the catch?
                        </h3>
                        <p className="md:text-2xl font-light mt-4 max-w-2xl text-[#b7b7b7]">
                            We only win when you do. That’s why we keep things
                            simple, fair, and transparent — so you can focus on
                            growing your business while we handle the rest.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 md:items-center mt-10 gap-20">
                        <img
                            src="/assets/img/random/catch.jpg"
                            className="rounded-3xl"
                            alt=""
                        />
                        <div className="grid gap-8">
                            {[
                                {
                                    title: "Automatic payouts",
                                    description:
                                        "Get paid fast. Payments are sent straight to your bank or mobile money, usually the next business day.",
                                },
                                {
                                    title: "3.95% transaction fee",
                                    description:
                                        "No setup fees, no hidden costs. If you sell something for GHS 100, you keep GHS 96.05 — that’s it.",
                                },
                                {
                                    title: "Unlimited Orders",
                                    description:
                                        "Add as many products and categories as you need — no hidden limits, no “pro” upgrade needed.",
                                },
                            ].map((i) => (
                                <div className="grid grid-cols-[35px_1fr] gap-2 md:gap-0">
                                    <svg
                                        width="35"
                                        height="35"
                                        viewBox="0 0 35 35"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            opacity="0.3"
                                            d="M29.1666 17.5002C29.1666 20.5944 27.9374 23.5618 25.7495 25.7497C23.5616 27.9377 20.5941 29.1668 17.4999 29.1668C14.4057 29.1668 11.4383 27.9377 9.25034 25.7497C7.06242 23.5618 5.83325 20.5944 5.83325 17.5002C5.83325 14.406 7.06242 11.4385 9.25034 9.25058C11.4383 7.06266 14.4057 5.8335 17.4999 5.8335C20.5941 5.8335 23.5616 7.06266 25.7495 9.25058C27.9374 11.4385 29.1666 14.406 29.1666 17.5002Z"
                                            stroke="#FDFDFD"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M13.2446 17.4998L16.5186 20.7737L22.4715 14.8208"
                                            stroke="#FDFDFD"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>

                                    <div>
                                        <h4 className="text-2xl md:text-3xl">
                                            {i.title}
                                        </h4>
                                        <p className="md:text-lg font-light mt-2 text-[#b7b7b7]">
                                            {i.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-black text-white pt-16 hidden sm:block">
                <div className="container mx-auto px-4 pt-24 pb-16">
                    <div className="text-center mb-16">
                        <small className="text-xs md:text-sm">
                            Grow with Selll
                        </small>
                        <h3 className="text-2xl md:text-5xl mt-2">
                            Lets help you reach more customers
                        </h3>
                        <p className="md:text-2xl font-light mt-4 max-w-2xl mx-auto text-[#b7b7b7]">
                            We don’t just give you a storefront — we help you
                            get discovered, build trust, and turn visitors into
                            loyal customers.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {[
                            {
                                title: "Shareable Storefront Links",
                                description:
                                    "Selll gives you a simple link you can post anywhere — WhatsApp, Instagram, TikTok, or even on flyers. No complicated setup, just copy and share.",
                            },
                            {
                                title: "Smart Checkout Links",
                                description:
                                    "Turn conversations into conversions. Create checkout links for specific products or carts and send them directly to customers — online or in-person.",
                            },
                            {
                                title: "Visibility Boosts",
                                description:
                                    "From product views to sales insights, Selll shows you what’s working — so you can double down and sell more, while we help more people find your store.",
                            },
                        ].map((i) => (
                            <Card className="!bg-[#222] !text-white rounded-3xl p-8">
                                <h4 className="text-xl md:text-2xl mb-1">
                                    {i.title}
                                </h4>
                                <p className="font-light">{i.description}</p>
                            </Card>
                        ))}
                    </div>

                    <Card className="!bg-primary-red !text-white rounded-3xl p-8 md:p-20 flex flex-col items-center justify-center">
                        <h3 className="text-2xl md:text-6xl max-w-lg text-center">
                            Get started for free in just 2 minutes
                        </h3>
                        <Button
                            as={Link}
                            href="/auth/register"
                            className="p-6 mt-6 font-medium rounded-full active:scale-95 transition-all duration-150 ease-in-out border-none bg-white hover:bg-white/90 text-primary-red flex-shrink-0 cursor-pointer"
                        >
                            Create your store
                        </Button>
                    </Card>
                </div>
            </section>

            {/* <section
                id="video-demo"
                className="relative py-32 bg-gradient-to-b from-[#141414] to-primary-red/90"
            >
                <div className="absolute inset-0 bg-[url(/assets/img/bg-vector.svg)] bg-cover opacity-5"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-orange to-transparent opacity-70"></div>

                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                            From your first sale <br /> to the world — start
                            local, grow global.
                        </h2>
                    </div>

                    <div className="relative flex justify-center items-center my-4 sm:my-12">
                        <div
                            className="rounded-3xl bg-black/5 p-2 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full container transform-none"
                            style={{ transformOrigin: "50% 50% 0px" }}
                        >
                            <iframe
                                src="https://www.youtube.com/embed/C_54knYP3ds?si=zCDWysb21LDRvyQN"
                                title="YouTube video player"
                                frameBorder="0"
                                className="rounded-2xl w-full h-full aspect-video bg-black/5 dark:bg-white/10"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                            ></iframe>
                        </div>
                    </div>

                    <div className="max-w-3xl mx-auto">
                        <div className="flex items-center justify-center mb-10">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#2C2C2C] border border-gray-800">
                                <span className="size-2 bg-primary-orange rounded-full mr-2"></span>
                                <span className="text-sm font-medium text-gray-300">
                                    3 Simple Steps
                                </span>
                            </div>
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold mb-12 text-center text-white">
                            Let's get you started{" "}
                            <span className="text-primary-orange">
                                in 2 minutes
                            </span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange font-bold text-xl mb-4">
                                    01
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-white">
                                    Create your store
                                </h4>
                                <p className="text-gray-100">
                                    Sign up for free and get your own
                                    .selll.store domain in seconds.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange font-bold text-xl mb-4">
                                    02
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-white">
                                    Add your products
                                </h4>
                                <p className="text-gray-100">
                                    Upload photos, set prices, and customize
                                    your store to match your brand.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-primary-orange/20 flex items-center justify-center text-primary-orange font-bold text-xl mb-4">
                                    03
                                </div>
                                <h4 className="text-xl font-semibold mb-2 text-white">
                                    Set up payouts
                                </h4>
                                <p className="text-gray-100">
                                    Tell us where to send your earnings, and
                                    you're ready to start selling.
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <Button
                                as={Link}
                                href="/auth/register"
                                className="mt-4 bg-white hover:bg-gray-100 text-primary-red font-medium px-8 py-3 rounded-md"
                            >
                                Let's do it
                            </Button>
                        </div>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 mx-auto gap-8 border-t border-white/10 pt-12">
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                {Intl.NumberFormat().format(activeStores)}
                            </div>
                            <p className="text-gray-100">Active Stores</p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                5+
                            </div>
                            <p className="text-gray-100">
                                Supported Currencies
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                                2 mins
                            </div>
                            <p className="text-gray-100">Average Setup Time</p>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* Commented out redundant sections that have been merged into the video-demo section above */}
            {/*
            <div className="font-medium text-[96px] text-primary-orange leading-none">
                {Intl.NumberFormat().format(purchases)}
                <p className="text-lg font-normal text-black dark:text-white">
                    Purchases made on Selll stores
                </p>
            </div>
            <div className="flex justify-center gap-8 text-black dark:text-white">
                <div className="font-medium text-[56px] leading-none">
                    {Intl.NumberFormat().format(activeStores)}
                    <p className="text-lg font-normal">
                        Active Stores
                    </p>
                </div>
            </div>

            <section className="flex justify-center items-center bg-primary-red dark:bg-primary-red/80 py-32">
                <div className="container">
                    <h2 className="text-3xl lg:text-5xl text-center">
                        Let's get you started in 3 easy steps
                    </h2>

                    <div className="mt-16 grid-container grid gap-x-12 gap-y-xl grid-cols-4 sm:items-center md:grid-cols-12">
                        <div className="grid-images-container w-full h-full hidden sm:flex gap-sm justify-self-end col-span-4 items-end ml-10 order-2 sm:col-span-2 sm:ml-0 sm:order-1 md:col-span-5 lg:col-span-6">
                            <img
                                src="/assets/img/screenshots/orders.jpg"
                                alt=""
                                className="rounded-2xl"
                            />
                        </div>
                        <div className="col-span-4 sm:col-span-2 sm:order-2 md:col-span-7 lg:col-span-6 lg:pl-lg">
                            <div className="mb-2xl" role="list">
                                <p
                                    className="w-full text-left items-center flex text-4xl"
                                    role="listitem"
                                    tabIndex="0"
                                >
                                    <span className="hidden md:block text-body-lg text-primary-orange w-10 md:w-16">
                                        01
                                    </span>
                                    <span className="block grow border-b dark:border-b-primary-orange px-6 md:px-0 pb-2 md:py-3 transition-color duration-300 text-pretty text-white">
                                        Create your store
                                    </span>
                                </p>
                                <p
                                    className="w-full text-left items-center flex text-4xl"
                                    role="listitem"
                                    tabIndex="0"
                                >
                                    <span className="hidden md:block text-body-lg text-primary-orange w-10 md:w-16">
                                        02
                                    </span>
                                    <span className="block grow border-b dark:border-b-primary-orange px-6 md:px-0 pb-2 md:py-3 transition-color duration-300 text-pretty text-white">
                                        Add your products
                                    </span>
                                </p>
                                <p
                                    className="w-full text-left items-center flex text-4xl"
                                    role="listitem"
                                    tabIndex="0"
                                >
                                    <span className="hidden md:block text-body-lg text-primary-orange w-10 md:w-16">
                                        03
                                    </span>
                                    <span className="block grow border-b dark:border-b-primary-orange px-6 md:px-0 pb-2 md:py-3 transition-color duration-300 text-pretty border-transparent text-white">
                                        Set up payouts
                                    </span>
                                </p>
                            </div>
                            <div className="px-6 sm:px-0 sm:pl-10 md:pl-16 mt-10">
                                <Button
                                    as={Link}
                                    href="/auth/register"
                                    className="w-full md:w-max"
                                >
                                    Let's do it
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            */}

            {/* <footer className="bg-[size:1540px] bg-left-top bg-no-repeat px-6 text-default">
                <div className="relative mx-auto w-full max-w-xl lg:container">
                    <div className="pb-10 pt-32">
                        <div className="grid grid-cols-1 gap-x-12 gap-y-20 lg:grid-cols-2 lg:gap-y-36">
                            <nav className="col-span-full flex items-center gap-6 sm:gap-10">
                                <a
                                    href="https://leafphp.dev"
                                    target="_blank"
                                    className="rounded transition-colors duration-100 hover:text-white focus:outline-none focus-visible:shadow-xs-selected"
                                >
                                    © {new Date().getFullYear()} Leaf PHP
                                </a>
                                <a
                                    href="/privacy"
                                    target="_blank"
                                    className="rounded transition-colors duration-100 hover:underline focus:outline-none focus-visible:shadow-xs-selected"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="/terms"
                                    target="_blank"
                                    className="rounded transition-colors duration-100 hover:underline focus:outline-none focus-visible:shadow-xs-selected"
                                >
                                    Terms of use
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div className="flex w-full items-end justify-center">
                        <div className="mx-auto w-full container font-bold text-xl md:text-[120px]">
                            <a
                                href="https://leafphp.dev"
                                className="flex items-center gap-2"
                            >
                                <img
                                    src="https://zero.leafphp.dev/assets/img/logo.png"
                                    className="size-10 md:size-36 mr-2 md:mr-4"
                                    alt=""
                                />
                                <span className="text-5xl md:text-[180px] font-semibold">
                                    Selll
                                </span>
                                <small className="italic ml-3 md:ml-6">
                                    by Leaf PHP
                                </small>
                            </a>
                        </div>
                    </div>
                </div>
            </footer> */}

            <Footer />
        </div>
    );
};

export default Lander;
