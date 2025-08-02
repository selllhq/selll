import { Link, Head } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/form/button";
import Footer from "@/components/layout/footer";
import { Card } from "@/components/shared/card";

const About = ({ auth }) => {
    return (
        <>
            <Head>
                <title>About Selll</title>
                <meta
                    name="description"
                    content="We are Selll, a platform that enables commerce for everyday people. Create your store, start selling, and grow your business effortlessly."
                />
            </Head>

            <Navbar auth={auth} />

            <section className="container mx-auto grid md:grid-cols-2 py-40 px-4 md:px-0">
                <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
                    <h1 className="text-4xl md:text-[78px] tracking-[-1.44px] font-bold max-w-[766px] mt-[14px] mb-6">
                        Enabling commerce for everyday people
                    </h1>

                    <p className="font-light md:text-xl text-gray-500 dark:text-gray-300">
                        Selling online is still a nightmare for most people in
                        Africa, from payments to other logistics, it's a mess.
                        That's why we are building Selll, your all-in-one
                        platform that helps you go from “I have something to
                        sell” to “I just got an order” — in minutes. No coding,
                        no hectic paperwork.
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

            <section className="bg-black text-white rounded-t-3xl pt-10 lg:pt-16">
                <div className="container mx-auto px-4 pt-24 pb-16">
                    <div className="text-center mb-16">
                        <h3 className="text-2xl md:text-5xl mt-2">
                            We want to see you win
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

            <Footer />
        </>
    );
};

export default About;
