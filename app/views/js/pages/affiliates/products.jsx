import { Link, Head } from "@inertiajs/react";

import Button from "@/components/form/button";
import { Card } from "@/components/shared/card";

const Affiliates = ({ products }) => {
    return (
        <>
            <Head>
                <title>Select a product to promote</title>
                <meta
                    name="description"
                    content="We are Selll, a platform that enables commerce for everyday people. Create your store, start selling, and grow your business effortlessly."
                />
            </Head>
            <header className="py-4 px-0 fixed top-0 left-0 w-full bg-background shadow-xs dark:shadow-primary-orange/20 z-50 backdrop-blur-2xl backdrop-opacity-20 flex justify-center items-center">
                <Link href="/affiliates" className="flex items-center gap-2">
                    <img
                        src="/assets/img/logo/text.png"
                        className="dark:hidden w-16"
                        alt="Selll"
                    />
                    <img
                        src="/assets/img/logo/text-white-alt.png"
                        className="hidden dark:block w-16"
                        alt="Selll"
                    />
                </Link>
            </header>

            <main className="pt-20 px-4 md:px-6">
                {products.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-[1550px] mx-auto">
                        {products.map((product) => {
                            const productImage =
                                JSON.parse(product.images ?? "[]")[0] ?? null;

                            return (
                                <Card
                                    key={product.id}
                                    className="flex flex-col items-center justify-center p-0 sm:p-4 ring-0 sm:ring rounded-3xl dark:bg-background sm:dark:bg-[#1C1C1C]"
                                >
                                    <img
                                        src={
                                            productImage ??
                                            "/assets/img/placeholder.png"
                                        }
                                        alt={product.name}
                                        className="w-full h-64 object-cover mb-4 rounded-xl"
                                    />
                                    <h3 className="font-bold line-clamp-1 group-hover:text-opacity-90 transition-colors duration-300 text-base sm:text-lg">
                                        {product.name}
                                    </h3>
                                    <p
                                        className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                product.description ||
                                                "No description available.",
                                        }}
                                    ></p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                                        {new Intl.NumberFormat("en-US", {
                                            style: "currency",
                                            currency: "GHS",
                                        }).format(product.price)}
                                    </p>
                                    <Button
                                        as={Link}
                                        href={`/affiliates/products/${product.id}`}
                                        className="w-full"
                                    >
                                        Generate Link
                                    </Button>
                                </Card>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            No products available
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            It seems there are no products available for you to
                            promote at the moment.
                        </p>
                    </div>
                )}

                <Button
                    className="mx-auto mt-32 mb-60 block"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        window.location.reload();
                    }}
                >
                    More products
                </Button>
            </main>
        </>
    );
};

export default Affiliates;
