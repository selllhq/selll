import { Link, Head } from "@inertiajs/react";

import Button from "@/components/form/button";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Card } from "@/components/shared/card";

const Affiliates = ({ auth }) => {
    return (
        <>
            <Head>
                <title>Make money promoting products</title>
                <meta
                    name="description"
                    content="Join the Selll Affiliate Program and earn a commission from the top products in our marketplace. 3 simple steps, no account needed, start earning in minutes."
                />
            </Head>

            <Navbar auth={auth} />

            <section className="container mx-auto py-40 px-4 md:px-0">
                <div className="max-w-3xl text-center mx-auto">
                    <h1 className="text-4xl md:text-[78px] tracking-[-1.44px] font-bold max-w-[766px] mt-[14px] mb-6">
                        <span className="bg-[linear-gradient(315deg,var(--color-primary-orange)_25%,var(--color-primary-red))] bg-clip-text [-webkit-text-fill-color:transparent] inline-block pb-2">
                            Earn money
                        </span>{" "}
                        by promoting products you love
                    </h1>

                    <p className="font-light md:text-xl text-gray-500 dark:text-gray-300">
                        Join the Selll Affiliate Program and earn a commission from the top products in our marketplace. 3 simple steps, no account needed, start earning in minutes.
                    </p>

                    <Button
                        as={Link}
                        href="/affiliates/products"
                        className="p-6 mt-10 font-medium rounded-full active:scale-95 transition-all duration-150 ease-in-out border-none bg-primary-red hover:bg-primary-red/80 text-white flex-shrink-0"
                    >
                        Select a product to promote
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-32">
                    {[
                        {
                            step: "1",
                            title: "Pick a product",
                            description:
                                "Browse our list of top products and select any one you would love to promote",
                        },
                        {
                            step: "2",
                            title: "Promote",
                            description:
                                "Share your unique affiliate links on your website, blog, social media, or with friends",
                        },
                        {
                            step: "3",
                            title: "Earn",
                            description:
                                "Earn commissions you set for every sale made through your links. Promote to earn more",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-muted/40 p-8 rounded-3xl text-center"
                        >
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-50/90 rounded-full flex items-center justify-center text-2xl font-semibold text-primary-red mx-auto mb-4">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">
                                {item.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-black text-white rounded-t-3xl pt-10 lg:pt-16">
                <div className="container mx-auto px-4 pt-24 pb-16">
                    <div className="text-center mb-16">
                        <h3 className="text-2xl md:text-5xl mt-2">
                            Why become an affiliate?
                        </h3>
                        <p className="md:text-2xl font-light mt-4 max-w-2xl mx-auto text-[#b7b7b7]">
                            Earn commissions you set yourself, promote products
                            you love, and help others discover great products. <br />
                            It's a win-win for everyone.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        {[
                            {
                                title: "Personalized Commissions",
                                description:
                                    "Set your own $$$ for each product you promote. No limits, no percentage cuts. You decide how much you earn.",
                            },
                            {
                                title: "Automatic Payouts",
                                description:
                                    "We send your earnings directly to your wallet the next business day after a sale. No waiting, no hassle.",
                            },
                            {
                                title: "Trusted Vendors",
                                description:
                                    "We vet every vendor to ensure quality and reliability, so you can promote with confidence.",
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
                            Start earning for free in just 2 minutes
                        </h3>
                        <Button
                            as={Link}
                            href="/affiliates/products"
                            className="p-6 mt-6 font-medium rounded-full active:scale-95 transition-all duration-150 ease-in-out border-none bg-white hover:bg-white/90 text-primary-red flex-shrink-0 cursor-pointer"
                        >
                            Promote a product
                        </Button>
                    </Card>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Affiliates;
