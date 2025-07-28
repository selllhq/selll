import { Check } from "lucide-react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/form/button";
import Footer from "@/components/layout/footer";

const Pricing = ({ auth }) => {
    return (
        <>
            <Head>
                <title>
                    Selll Pricing - Start Your Online Store Today For Free
                </title>
                <meta
                    name="description"
                    content="Start for free in 2 minutes. No business registration, no hassle. Just create your store and start earning today!"
                />
            </Head>

            <Navbar auth={auth} />

            <section className="container mx-auto grid md:grid-cols-2 py-40">
                <div className="max-w-xl text-center md:text-left">
                    <h1 className="text-4xl md:text-[78px] tracking-[-1.44px] font-bold max-w-[766px] mt-[14px] mb-6">
                        Fair pricing for everyone
                    </h1>

                    <p className="max-w-5/6 font-light md:text-xl text-gray-500 dark:text-gray-300 mx-auto md:mx-0">
                        Just getting started? Already growing fast? Wherever you
                        are, Selll meets you there. Start free, grow on your
                        terms, and level up when you’re ready.
                    </p>

                    <Button
                        as={Link}
                        href="/auth/register"
                        className="p-6 mt-10 font-medium rounded-full active:scale-95 transition-all duration-150 ease-in-out border-none bg-primary-red hover:bg-primary-red/80 text-white flex-shrink-0"
                    >
                        Create your store
                    </Button>
                </div>
            </section>

            <section className="bg-black text-white rounded-t-3xl pt-10 lg:pt-0">
                <div className="px-6 lg:pb-16">
                    <div className="mx-auto grid xl:grid-cols-2 items-center w-full max-w-xl lg:container">
                        <div className="grid grid-cols-1 grid-rows-[auto,1fr] lg:-mt-20 xl:max-w-2/3 gap-px divide-y divide-primary-orange/20 rounded-3xl border border-primary-orange/20 lg:divide-none lg:border-0 lg:bg-[#2f100f]">
                            <div className="p-5 lg:bg-default xl:p-8 lg:!pb-0">
                                <h3 className="text-3xl font-normal tracking-tight text-strong xl:text-[32px]">
                                    3.95% per transaction
                                </h3>
                                <p className="mt-2 font-medium">
                                    <span className="text-semibold text-xl">
                                        If a customer buys a product for GHS
                                        100, we take GHS 3.95 and send you GHS
                                        96.05.
                                    </span>
                                    <br />
                                    <small className="text-primary-orange">
                                        No maintenance fees, no hidden costs.
                                    </small>
                                </p>
                            </div>
                            <div className="flex flex-col items-stretch p-5 lg:bg-default xl:p-8">
                                <ul className="flex-1 space-y-2.5">
                                    <li className="flex items-center gap-2 text-sm font-medium">
                                        <Check className="size-4" />
                                        <span>
                                            Free storefront for self-checkout
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-medium">
                                        <Check className="size-4" />
                                        <span>
                                            Customization options for your store
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-medium">
                                        <Check className="size-4" />
                                        <span>
                                            Unlimited products + categories +
                                            orders
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-medium">
                                        <Check className="size-4" />
                                        <span>
                                            Mobile friendly Business dashboard
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-medium">
                                        <Check className="size-4" />
                                        <span>
                                            Analytics & Reports on what's
                                            selling
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-medium">
                                        <Check className="size-4" />
                                        <span>
                                            Automated inventory tracking
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2 text-sm font-medium">
                                        <Check className="size-4" />
                                        <span>
                                            Real-time SMS & Email notifications
                                        </span>
                                    </li>
                                </ul>

                                <Button
                                    as={Link}
                                    className="relative isolate mt-6"
                                    href="/auth/register"
                                >
                                    {auth.user
                                        ? "Go to dashboard"
                                        : "Claim your free shop"}
                                </Button>
                            </div>
                        </div>
                        <div className="mx-auto max-w-2xl py-20 text-xl font-medium">
                            <blockquote className="relative">
                                <span className="absolute -left-2 top-0">
                                    “
                                </span>
                                <p>
                                    <i className="font-light">
                                        Setting up an online store used to be a
                                        nightmare—business registrations,
                                        payment gateways, and endless red tape.
                                        With Selll, I skipped all the hassle and
                                        had my storefront live in minutes. No
                                        complicated setup, no business
                                        registration—just effortless selling!
                                    </i>
                                    ”
                                </p>

                                <div className="mt-6 flex items-center gap-3 text-base">
                                    <div className="size-12 overflow-hidden rounded shadow-inner">
                                        <img
                                            src="https://pbs.twimg.com/profile_images/1896126751102619648/lEsHUBx3_400x400.jpg"
                                            alt="Sebastian Livingstone"
                                            className="size-full"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-strong">
                                            Sebastian Livingstone
                                        </p>
                                        <p className="text-default">
                                            Digital Creator (
                                            <a
                                                href="https://osemuix.selll.store"
                                                target="_blank"
                                                rel="pricing_testimonial"
                                                className="text-primary-orange"
                                            >
                                                osemuix.selll.store
                                            </a>
                                            )
                                        </p>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Pricing;
