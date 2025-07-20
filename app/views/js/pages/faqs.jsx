import { Head } from "@inertiajs/react";
import { createElement, useState } from "react";
import {
    ChevronDown,
    ShoppingBag,
    CreditCard,
    Store,
    Shield,
    Wallet,
    HelpCircle,
} from "lucide-react";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/form/button";
import { cn } from "@/utils";
import Footer from "@/components/layout/footer";

const Faqs = ({ auth }) => {
    const [activeCategory, setActiveCategory] = useState("general");
    const [openQuestions, setOpenQuestions] = useState({});

    const toggleQuestion = (id) => {
        setOpenQuestions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const categories = [
        { id: "general", name: "General", icon: HelpCircle },
        { id: "products", name: "Products", icon: ShoppingBag },
        { id: "payments", name: "Payments", icon: CreditCard },
        { id: "store", name: "Store Customization", icon: Store },
        // { id: "shipping", name: "Shipping & Delivery", icon: Truck },
        // { id: "analytics", name: "Analytics & Reports", icon: BarChart },
        // { id: "international", name: "International Selling", icon: Globe },
        { id: "security", name: "Security & Privacy", icon: Shield },
        { id: "payouts", name: "Payouts", icon: Wallet },
    ];

    const faqs = {
        general: [
            {
                id: "what-is-selll",
                question: "What is Selll?",
                answer: "Selll is an all-in-one e-commerce platform that allows you to create an online store, sell products, and manage your business without any technical knowledge. It's designed to be simple, fast, and affordable for businesses of all sizes.",
            },
            {
                id: "how-much-does-it-cost",
                question: "How much does Selll cost?",
                answer: "You can start selling online for free with Selll's Starter plan, you don't have to pay anything until you're ready to scale.",
            },
            {
                id: "technical-knowledge",
                question: "Do I need technical knowledge to use Selll?",
                answer: "Not at all! Selll is designed to be user-friendly and requires no coding or technical skills. Our intuitive interface makes it easy to set up your store, add products, and start selling in minutes.",
            },
            // {
            //     id: "sell-physical-digital",
            //     question: "Can I sell both physical and digital products?",
            //     answer: "Yes, Selll supports both physical and digital products. Selll collects the necessary information for each type of product, so you can easily manage inventory, shipping on your physical products, and delivery for your digital products.",
            // },
            {
                id: "customer-support",
                question: "What kind of customer support does Selll offer?",
                answer: "We offer 12 hours of customer support via email and chat for all users. Our support team is available to help you with any questions or issues you may have. Premium plans will also include priority support for faster response times.",
            },
        ],
        products: [
            {
                id: "add-products",
                question: "How do I add products to my store?",
                answer: "To add products, go to the Products section in your dashboard and click 'Add New Product'. You can then enter product details, upload images, set pricing, add variants, and configure inventory settings. Once saved, the product will be available in your store.",
            },
            {
                id: "product-limit",
                question: "Is there a limit to how many products I can add?",
                answer: "At the moment, there is no limit to the number of products you can add. However, we recommend keeping your store organized so customers can easily find what they're looking for.",
            },
            {
                id: "product-categories",
                question: "Can I organize my products into categories?",
                answer: "Yes, you can create custom categories to organize your products. This helps customers navigate your store and find what they're looking for more easily.",
            },
            // {
            //     id: "product-variants",
            //     question:
            //         "How do I set up product variants like sizes and colors?",
            //     answer: "When creating or editing a product, you'll find a 'Variants' section where you can add different options like sizes, colors, or materials. You can set specific prices and inventory levels for each variant combination.",
            // },
            // {
            //     id: "bulk-import",
            //     question: "Can I import products in bulk?",
            //     answer: "Yes, Selll supports bulk product imports via CSV files. This feature is available on all premium plans and makes it easy to migrate from another platform or add multiple products at once."
            // },
        ],
        payments: [
            {
                id: "payment-methods",
                question: "What payment methods can I offer my customers?",
                answer: "Selll supports various payment methods including credit/debit cards, Mobile money, Apple Pay, and bank transfers. All of this is handled through our secure payment processors, so you don't have to worry about managing payment gateways yourself.",
            },
            {
                id: "transaction-fees",
                question: "What are the transaction fees?",
                answer: "Selll charges a small transaction fee of 2% per transaction. In addition, the payment processor fees which vary by provider, but range from 1.9% to 3%. Not to worry though, we are always working to reduce these fees and provide the best value for our users.",
            },
            {
                id: "payment-security",
                question: "How secure are the payments?",
                answer: "All payments are processed through PCI-compliant payment processors. We use industry-standard encryption and security measures to protect customer payment information. Your store is automatically equipped with SSL encryption to ensure secure transactions.",
            },
            {
                id: "refund-process",
                question: "How do I process refunds?",
                answer: "Refunds are handled by our account managers. Give us a few details, and the refund will be on its way, and will be processed through the original payment method used by the customer.",
            },
        ],
        store: [
            {
                id: "customize-store",
                question: "How can I customize my store's appearance?",
                answer: "Selll offers a range of customization options. You can choose different colours, layouts, and even how products are displayed. We are working on adding more themes and templates to make it even easier to create a unique look for your store.",
            },
            {
                id: "custom-domain",
                question: "Can I use my own domain name?",
                answer: "Not yet, but we are working on this feature for our premium plans. For now, your store will be hosted on a Selll subdomain (e.g., yourstore.selll.store). Once custom domains are available, you will be able to connect your own domain easily (eg., yourstore.com).",
            },
            {
                id: "mobile-friendly",
                question: "Are Selll stores mobile-friendly?",
                answer: "Absolutely! All Selll stores are fully responsive and optimized for mobile devices. Your customers will have a seamless shopping experience whether they're on a desktop, tablet, or smartphone.",
            },
            {
                id: "seo-optimization",
                question: "How can I optimize my store for search engines?",
                answer: "Selll includes built-in SEO features that allow you to customize page titles, meta descriptions, URLs, and image alt tags. We also automatically generate sitemaps and use proper HTML structure to help your store rank better in search results.",
            },
        ],
        // shipping: [
        //     {
        //         id: "shipping-options",
        //         question: "What shipping options can I offer?",
        //         answer: "Selll allows you to set up various shipping options including flat rate, weight-based, price-based, and location-based shipping. You can also offer free shipping based on certain conditions like minimum order value.",
        //     },
        //     {
        //         id: "shipping-labels",
        //         question: "Can I print shipping labels directly from Selll?",
        //         answer: "Yes, premium plans include integrated shipping label printing. You can generate and print shipping labels for major carriers directly from your dashboard, saving you time and reducing errors.",
        //     },
        //     {
        //         id: "international-shipping",
        //         question: "Can I ship internationally?",
        //         answer: "Yes, Selll supports international shipping. You can define shipping zones and set specific rates for different countries or regions. You can also display shipping costs in local currencies to provide a better customer experience.",
        //     },
        //     {
        //         id: "order-tracking",
        //         question: "How do customers track their orders?",
        //         answer: "When you fulfill an order and add a tracking number, customers automatically receive an email with their tracking information. They can also log in to their account on your store to view order status and tracking details.",
        //     },
        // ],
        analytics: [
            {
                id: "sales-reports",
                question: "What kind of sales reports are available?",
                answer: "Selll provides comprehensive sales reports including daily, weekly, and monthly sales summaries, product performance, customer acquisition, and revenue breakdowns. These insights help you understand your business performance and make informed decisions.",
            },
            {
                id: "traffic-analytics",
                question: "Can I see where my store traffic is coming from?",
                answer: "Yes, Selll includes traffic analytics that show you where your visitors are coming from, which pages they visit, and how they navigate your store. This helps you optimize your marketing efforts and improve conversion rates.",
            },
            {
                id: "export-data",
                question: "Can I export my sales data?",
                answer: "Yes, you can export your sales data, customer information, and product reports in CSV format for further analysis or accounting purposes. This feature is available on all plans.",
            },
            {
                id: "conversion-tracking",
                question: "Does Selll support conversion tracking for ads?",
                answer: "Yes, Selll integrates with major advertising platforms like Google Ads and Facebook Ads. You can easily add conversion tracking pixels to measure the effectiveness of your ad campaigns and optimize your marketing spend.",
            },
        ],
        international: [
            {
                id: "multi-currency",
                question: "Can I sell in multiple currencies?",
                answer: "For now, Selll only allows you to select one currency for your store. This currency however can be changed at any time and is not locked to your country. We are working on adding multi-currency support in the future.",
            },
            {
                id: "language-translation",
                question: "Can my store be available in multiple languages?",
                answer: "Not yet, but we are working on adding multi-language support in the future. For now, your store will be in English, but you can customize product descriptions and other content in any language.",
            },
            {
                id: "international-taxes",
                question:
                    "How does Selll handle international taxes and duties?",
                answer: "All taxes and duties are automatically calculated based on the customer's location, and are handled by our checkout payment processors.",
            },
        ],
        security: [
            {
                id: "data-security",
                question:
                    "How does Selll keep my store and customer data secure?",
                answer: "Selll employs industry-leading security measures including SSL encryption, regular security audits, and secure data centers. All customer data is encrypted and stored according to the highest security standards to protect against unauthorized access.",
            },
            {
                id: "backups",
                question: "Does Selll back up my store data?",
                answer: "Yes, we perform automatic backups of your store data. This ensures that your product information, customer data, and sales history are safe and can be restored if needed.",
            },
            {
                id: "fraud-protection",
                question: "Does Selll offer fraud protection?",
                answer: "Yes, all Selll stores come with basic fraud detection tools. Premium plans include advanced fraud protection features that automatically flag suspicious orders based on various risk indicators, helping you prevent chargebacks and fraud losses.",
            },
            // {
            //     id: "gdpr-compliance",
            //     question: "Is Selll GDPR compliant?",
            //     answer: "Yes, Selll is fully GDPR compliant. We provide the necessary tools and features to help you collect, store, and process customer data in accordance with GDPR requirements, including consent management and data export capabilities.",
            // },
        ],
        payouts: [
            {
                id: "payout-schedule",
                question: "When will I receive my payouts?",
                answer: "Payouts will be automatically deposited in your payout wallet, typically within 1-3 business days after a sale is made. There is no need to be alarmed if you do not see the funds immediately, as processing times may vary based on your bank or payment provider.",
            },
            {
                id: "payout-methods",
                question: "What payout methods are available?",
                answer: "Selll supports payouts via bank transfer, and mobile money services in supported countries. Note that some payout methods come with additional fees not covered by Selll.",
            },
            {
                id: "minimum-payout",
                question: "Is there a minimum payout amount?",
                answer: "Yes, the minimum payout amount is $20 for bank transfers and $5 for Wise and mobile money transfers. If your available balance is below the minimum, it will roll over to the next payout period.",
            },
            {
                id: "payout-fees",
                question: "Are there any fees for payouts?",
                answer: "Standard payouts to bank accounts in your local currency may incur fees depending on your bank. For mobile money transfers, there may be additional fees charged by the service provider. Selll does not charge any additional fees for processing payouts.",
            },
        ],
    };

    return (
        <>
            <Head>
                <title>Frequently Asked Questions</title>
                <meta
                    name="description"
                    content="If you're new to Selll or looking to replatform your business, this guide will help you learn more about the platform and its features."
                />
            </Head>

            <Navbar auth={auth} />

            <div className="py-20 md:py-32 bg-white dark:bg-background relative overflow-hidden">
                <div className="mx-auto container px-4 sm:px-6 relative z-10">
                    <div className="flex flex-col gap-6 py-4 lg:py-8 text-center max-w-3xl mx-auto">
                        <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary-orange/10 text-primary-orange text-sm font-medium mb-4 mx-auto">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                            <span>Frequently Asked Questions</span>
                        </div>

                        <h2 className="text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl text-gray-900 dark:text-white font-medium">
                            Everything You Need to Know
                        </h2>

                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Selll and Leaf have compiled a list of frequently
                            asked questions to help you get started selling your
                            products online.
                        </p>
                    </div>

                    <div className="mt-16 max-w-7xl mx-auto">
                        {/* Category Tabs */}
                        <div className="mb-12 relative">
                            <div className="flex overflow-x-auto hide-scrollbar pb-2 gap-2 justify-center flex-wrap">
                                {categories.map((category) => {
                                    const Icon = category.icon;
                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() =>
                                                setActiveCategory(category.id)
                                            }
                                            className={cn(
                                                "inline-flex items-center py-3 px-5 text-sm font-medium whitespace-nowrap transition-all rounded-full",
                                                activeCategory === category.id
                                                    ? "bg-primary-orange text-white shadow-lg shadow-primary-orange/20 dark:shadow-primary-orange/10"
                                                    : "bg-gray-100 dark:bg-[#1A1A1A] text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#2C2C2C] border border-gray-200 dark:border-gray-800",
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    "h-4 w-4 mr-2 flex-shrink-0",
                                                )}
                                            />
                                            <span>{category.name}</span>
                                            {faqs[category.id]?.length > 0 && (
                                                <span
                                                    className={cn(
                                                        "ml-2 text-xs rounded-full px-2 py-0.5",
                                                        activeCategory ===
                                                            category.id
                                                            ? "bg-white/20"
                                                            : "bg-gray-200 dark:bg-[#141414] text-gray-600 dark:text-gray-400",
                                                    )}
                                                >
                                                    {faqs[category.id]?.length}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="p-2 max-w-4xl mx-auto">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center">
                                    {categories.find(
                                        (c) => c.id === activeCategory,
                                    )?.icon &&
                                        createElement(
                                            categories.find(
                                                (c) => c.id === activeCategory,
                                            )?.icon,
                                            {
                                                className:
                                                    "h-5 w-5 mr-2 text-primary-orange",
                                            },
                                        )}
                                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">
                                        {categories.find(
                                            (c) => c.id === activeCategory,
                                        )?.name || "General"}{" "}
                                        Questions
                                    </h2>
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#1A1A1A] px-2 py-1 rounded-full">
                                    {faqs[activeCategory]?.length || 0}{" "}
                                    questions
                                </div>
                            </div>

                            <div className="space-y-2">
                                {faqs[activeCategory]?.map((faq) => (
                                    <div
                                        key={faq.id}
                                        className={cn(
                                            "border-b border-gray-200 dark:border-[#2C2C2C] overflow-hidden transition-all",
                                            openQuestions[faq.id]
                                                ? "bg-transparent"
                                                : "bg-transparent",
                                        )}
                                    >
                                        <button
                                            className="flex items-center justify-between w-full py-4 text-left"
                                            onClick={() =>
                                                toggleQuestion(faq.id)
                                            }
                                            aria-expanded={
                                                openQuestions[faq.id]
                                            }
                                            aria-controls={`faq-${faq.id}-content`}
                                        >
                                            <h3 className="text-base font-medium text-gray-900 dark:text-white pr-4">
                                                {faq.question}
                                            </h3>
                                            <ChevronDown
                                                className={cn(
                                                    "h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform",
                                                    openQuestions[faq.id]
                                                        ? "transform rotate-180 text-primary-orange"
                                                        : "",
                                                )}
                                            />
                                        </button>
                                        <div
                                            id={`faq-${faq.id}-content`}
                                            className={cn(
                                                "transition-all duration-300 ease-in-out overflow-hidden",
                                                openQuestions[faq.id]
                                                    ? "max-h-96"
                                                    : "max-h-0",
                                            )}
                                        >
                                            {openQuestions[faq.id] && (
                                                <div className="pb-4 pt-0">
                                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="relative overflow-hidden py-24 bg-[#141414]">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-orange/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-orange/20 to-transparent"></div>
                <div className="absolute -left-20 -top-20 size-96 rounded-full bg-primary-orange/10 blur-3xl"></div>
                <div className="absolute -right-20 -bottom-20 size-96 rounded-full bg-primary-orange/10 blur-3xl"></div>

                <div className="relative z-10 mx-auto container px-4 sm:px-6 py-16">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-4xl font-bold text-white mb-6">
                            Still have questions?
                        </h3>
                        <p className="text-gray-300 mb-10 text-lg max-w-xl mx-auto">
                            Our support team is here to help you with any
                            questions you might have about Selll's platform and
                            services.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2C2C2C] hover:border-primary-orange/40 transition-colors group">
                                <div className="size-14 rounded-full bg-primary-orange/10 flex items-center justify-center mx-auto mb-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-primary-orange"
                                    >
                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-white text-lg mb-3">
                                    Contact Support
                                </h4>
                                <p className="text-gray-400 mb-5">
                                    Get help from our dedicated support team
                                    within 24 hours.
                                </p>
                                <Button
                                    className="w-full bg-[#2C2C2C] hover:bg-primary-orange text-white font-medium py-2.5 transition-colors group-hover:bg-primary-orange/90 flex items-center justify-center"
                                    onClick={() => window.Tawk_API?.toggle()}
                                >
                                    <span>Contact Support</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-2"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m12 5 7 7-7 7" />
                                    </svg>
                                </Button>
                            </div>

                            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-[#2C2C2C] hover:border-primary-orange/40 transition-colors group">
                                <div className="size-14 rounded-full bg-primary-orange/10 flex items-center justify-center mx-auto mb-5">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-primary-orange"
                                    >
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                </div>
                                <h4 className="font-medium text-white text-lg mb-3">
                                    Browse Documentation
                                </h4>
                                <p className="text-gray-400 mb-5">
                                    Find detailed guides and tutorials in our
                                    comprehensive documentation.
                                </p>
                                <Button
                                    as="a"
                                    href="https://selll.tawk.help"
                                    target="_blank"
                                    className="w-full bg-[#2C2C2C] hover:bg-primary-orange text-white font-medium py-2.5 transition-colors group-hover:bg-primary-orange/90 flex items-center justify-center"
                                >
                                    <span>View Documentation</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="ml-2"
                                    >
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                        <path d="M15 3h6v6" />
                                        <path d="m10 14 11-11" />
                                    </svg>
                                </Button>
                            </div>
                        </div>

                        <div className="mt-10 flex items-center justify-center gap-2 text-sm text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                <path d="M12 6v6l4 2" />
                            </svg>
                            <span>Average response time: 22 minutes</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Faqs;
