import { Link, Head } from "@inertiajs/react";
import { Check } from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/form/button";
import Footer from "@/components/layout/footer";

const Pricing = ({ auth }) => {
    return (
        <>
            <Head title="Pricing" />

            <Navbar auth={auth} />

            <section className="mt-36 mb-16 flex items-center px-6">
                <div className="mx-auto grid w-full container gap-y-8 lg:grid-cols-2">
                    <div className="max-w-xl space-y-8">
                        <h1 className="text-4xl !leading-[1.2] text-strong sm:text-5xl">
                            Start Sellling for free in 2 minutes
                        </h1>

                        <p className="max-w-lg text-base leading-normal sm:text-xl">
                            Whether you're just getting started or scaling up,
                            Selll has a plan that fits your needs. Start for
                            free, upgrade only when you're ready, and grow your
                            business with powerful tools.
                        </p>
                    </div>
                </div>
            </section>

            <section>
                <div className="px-6 lg:pb-16">
                    <div className="mx-auto w-full max-w-xl lg:container">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-px lg:gap-y-0 lg:border-b lg:border-t lg:border-primary-orange/20 lg:bg-primary-orange/20">
                            <div className="grid grid-cols-1 grid-rows-[auto,1fr] gap-px divide-y divide-primary-orange/20 rounded-xl border border-primary-orange/20 lg:divide-none lg:rounded-none lg:border-0 lg:bg-primary-red/20">
                                <div className="p-5 lg:bg-default xl:p-8 lg:!pb-0">
                                    <h3 className="text-3xl font-normal tracking-tight text-strong xl:text-[32px]">
                                        Starter
                                    </h3>
                                    <p className="mt-2 font-medium">
                                        <span className="text-semibold text-xl">
                                            $0/month
                                        </span>
                                        <br />
                                        <small className="dark:text-primary-orange">
                                            +2% fees + processor fees
                                        </small>
                                    </p>
                                </div>
                                <div className="flex flex-col items-stretch p-5 lg:bg-default xl:p-8">
                                    <p className="font-medium text-strong">
                                        Everything you need to earn your first
                                        dollar
                                    </p>
                                    <ul className="mt-4 flex-1 space-y-2.5">
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>Simple storefront</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>
                                                Free .selll.store domain
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>
                                                Paystack & Stripe integration
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>Easy Business dashboard</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>Basic analytics</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>
                                                2% Selll fee + 2%
                                                Stripe/Paystack fee
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
                            <div className="grid grid-cols-1 grid-rows-[auto,1fr] gap-px divide-y divide-primary-orange/20 rounded-xl border border-primary-orange/20 lg:divide-none lg:rounded-none lg:border-0 lg:bg-primary-orange/20">
                                <div className="p-5 lg:bg-default xl:p-8 lg:!pb-0">
                                    <h3 className="text-3xl font-normal tracking-tight text-strong xl:text-[32px]">
                                        Pro
                                    </h3>
                                    <p className="mt-2 font-medium">
                                        <span className="text-semibold text-xl">
                                            $20/month
                                        </span>
                                        <br />
                                        <small className="dark:text-primary-orange">
                                            +2% fees + processor fees
                                        </small>
                                    </p>
                                </div>
                                <div className="flex flex-col items-stretch p-5 lg:bg-default xl:p-8">
                                    <p className="font-medium text-strong">
                                        Finer control + tools to help you grow
                                        your store
                                    </p>
                                    <ul className="mt-4 flex-1 space-y-2.5">
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>Everything in Free</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>Advanced analytics</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>
                                                Store customization (themes,
                                                colors, fonts)
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>Automated invoicing</span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>
                                                Discount codes & promotions
                                            </span>
                                        </li>
                                        <li className="flex items-center gap-2 text-sm font-medium">
                                            <Check className="size-4" />
                                            <span>Priority support</span>
                                        </li>
                                    </ul>

                                    <Button
                                        disabled
                                        className="relative isolate mt-6"
                                    >
                                        Coming soon
                                    </Button>
                                </div>
                            </div>
                        </div>
                        {/* <div className="mx-auto max-w-2xl py-20 text-xl font-medium">
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
                        </div> */}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Pricing;
