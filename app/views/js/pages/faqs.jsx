import React, { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/form/button";
import { cn } from "@/utils";
import {
    MessageCircleQuestion,
    ChevronDown,
    ShoppingBag,
    CreditCard,
    Store,
    Truck,
    Settings,
    Users,
    Shield,
    Wallet,
    HelpCircle,
    BarChart,
    Globe
} from "lucide-react";

const Faqs = ({ auth }) => {
    const [activeCategory, setActiveCategory] = useState("general");
    const [openQuestions, setOpenQuestions] = useState({});

    const toggleQuestion = (id) => {
        setOpenQuestions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const categories = [
        { id: "general", name: "General", icon: HelpCircle },
        { id: "account", name: "Account & Setup", icon: Users },
        { id: "products", name: "Products", icon: ShoppingBag },
        { id: "payments", name: "Payments", icon: CreditCard },
        { id: "store", name: "Store Customization", icon: Store },
        { id: "shipping", name: "Shipping & Delivery", icon: Truck },
        { id: "analytics", name: "Analytics & Reports", icon: BarChart },
        { id: "international", name: "International Selling", icon: Globe },
        { id: "security", name: "Security & Privacy", icon: Shield },
        { id: "payouts", name: "Payouts", icon: Wallet },
    ];

    const faqs = {
        general: [
            {
                id: "what-is-selll",
                question: "What is Selll?",
                answer: "Selll is an all-in-one e-commerce platform that allows you to create an online store, sell products, and manage your business without any technical knowledge. It's designed to be simple, fast, and affordable for businesses of all sizes."
            },
            {
                id: "how-much-does-it-cost",
                question: "How much does Selll cost?",
                answer: "Selll offers a free plan that allows you to create a store and start selling right away. We also offer premium plans with additional features starting at $9.99/month. There are no setup fees or hidden charges. You only pay a small transaction fee on sales."
            },
            {
                id: "technical-knowledge",
                question: "Do I need technical knowledge to use Selll?",
                answer: "Not at all! Selll is designed to be user-friendly and requires no coding or technical skills. Our intuitive interface makes it easy to set up your store, add products, and start selling in minutes."
            },
            {
                id: "sell-physical-digital",
                question: "Can I sell both physical and digital products?",
                answer: "Yes, Selll supports both physical and digital products. You can easily set up your store to sell physical items with shipping options or digital downloads that customers can access immediately after purchase."
            },
            {
                id: "customer-support",
                question: "What kind of customer support does Selll offer?",
                answer: "We offer 24/7 customer support via email and chat. Our support team is always ready to help you with any questions or issues you might have. Premium plans also include priority support and dedicated account managers."
            },
        ],
        account: [
            {
                id: "create-account",
                question: "How do I create a Selll account?",
                answer: "Creating a Selll account is simple. Just visit our homepage, enter your email address, and follow the signup process. You'll be asked to provide some basic information about your business, and then you can start setting up your store right away."
            },
            {
                id: "multiple-stores",
                question: "Can I manage multiple stores with one account?",
                answer: "Yes, with our premium plans, you can create and manage multiple stores from a single Selll account. This is perfect for businesses with different brands or product lines that require separate storefronts."
            },
            {
                id: "delete-account",
                question: "How do I delete my account?",
                answer: "You can delete your account by going to Account Settings and selecting the 'Delete Account' option. Please note that this action is irreversible and will permanently delete all your store data, products, and sales history."
            },
            {
                id: "change-email",
                question: "Can I change my email address?",
                answer: "Yes, you can change your email address in your Account Settings. After updating your email, you'll need to verify the new address before the change takes effect."
            },
        ],
        products: [
            {
                id: "add-products",
                question: "How do I add products to my store?",
                answer: "To add products, go to the Products section in your dashboard and click 'Add New Product'. You can then enter product details, upload images, set pricing, add variants, and configure inventory settings. Once saved, the product will be available in your store."
            },
            {
                id: "product-limit",
                question: "Is there a limit to how many products I can add?",
                answer: "Free accounts can add up to 10 products. Premium plans allow for unlimited products, making them suitable for businesses with larger inventories."
            },
            {
                id: "product-categories",
                question: "Can I organize my products into categories?",
                answer: "Yes, you can create custom categories and subcategories to organize your products. This helps customers navigate your store and find what they're looking for more easily."
            },
            {
                id: "product-variants",
                question: "How do I set up product variants like sizes and colors?",
                answer: "When creating or editing a product, you'll find a 'Variants' section where you can add different options like sizes, colors, or materials. You can set specific prices and inventory levels for each variant combination."
            },
            {
                id: "bulk-import",
                question: "Can I import products in bulk?",
                answer: "Yes, Selll supports bulk product imports via CSV files. This feature is available on all premium plans and makes it easy to migrate from another platform or add multiple products at once."
            },
        ],
        payments: [
            {
                id: "payment-methods",
                question: "What payment methods can I offer my customers?",
                answer: "Selll supports various payment methods including credit/debit cards, PayPal, Apple Pay, Google Pay, and bank transfers. You can enable the payment methods that work best for your business and customers."
            },
            {
                id: "transaction-fees",
                question: "What are the transaction fees?",
                answer: "Selll charges a small transaction fee of 2.9% + $0.30 per transaction on the free plan. Premium plans have reduced transaction fees starting at 2.5% + $0.30. There are no hidden fees or monthly charges beyond your subscription plan."
            },
            {
                id: "payment-security",
                question: "How secure are the payments?",
                answer: "All payments are processed through PCI-compliant payment processors. We use industry-standard encryption and security measures to protect customer payment information. Your store is automatically equipped with SSL encryption to ensure secure transactions."
            },
            {
                id: "refund-process",
                question: "How do I process refunds?",
                answer: "You can process refunds directly from your Selll dashboard. Go to the Orders section, find the order you want to refund, and click the 'Refund' button. You can choose to refund the full amount or a partial amount."
            },
        ],
        store: [
            {
                id: "customize-store",
                question: "How can I customize my store's appearance?",
                answer: "Selll offers a range of customization options. You can choose from various themes, customize colors and fonts, add your logo, and arrange content blocks to create a unique store that matches your brand identity."
            },
            {
                id: "custom-domain",
                question: "Can I use my own domain name?",
                answer: "Yes, all Selll plans allow you to connect your own custom domain. Free plans get a yourbusiness.selll.io subdomain, while premium plans can use fully custom domains like yourbusiness.com."
            },
            {
                id: "mobile-friendly",
                question: "Are Selll stores mobile-friendly?",
                answer: "Absolutely! All Selll stores are fully responsive and optimized for mobile devices. Your customers will have a seamless shopping experience whether they're on a desktop, tablet, or smartphone."
            },
            {
                id: "seo-optimization",
                question: "How can I optimize my store for search engines?",
                answer: "Selll includes built-in SEO features that allow you to customize page titles, meta descriptions, URLs, and image alt tags. We also automatically generate sitemaps and use proper HTML structure to help your store rank better in search results."
            },
        ],
        shipping: [
            {
                id: "shipping-options",
                question: "What shipping options can I offer?",
                answer: "Selll allows you to set up various shipping options including flat rate, weight-based, price-based, and location-based shipping. You can also offer free shipping based on certain conditions like minimum order value."
            },
            {
                id: "shipping-labels",
                question: "Can I print shipping labels directly from Selll?",
                answer: "Yes, premium plans include integrated shipping label printing. You can generate and print shipping labels for major carriers directly from your dashboard, saving you time and reducing errors."
            },
            {
                id: "international-shipping",
                question: "Can I ship internationally?",
                answer: "Yes, Selll supports international shipping. You can define shipping zones and set specific rates for different countries or regions. You can also display shipping costs in local currencies to provide a better customer experience."
            },
            {
                id: "order-tracking",
                question: "How do customers track their orders?",
                answer: "When you fulfill an order and add a tracking number, customers automatically receive an email with their tracking information. They can also log in to their account on your store to view order status and tracking details."
            },
        ],
        analytics: [
            {
                id: "sales-reports",
                question: "What kind of sales reports are available?",
                answer: "Selll provides comprehensive sales reports including daily, weekly, and monthly sales summaries, product performance, customer acquisition, and revenue breakdowns. These insights help you understand your business performance and make informed decisions."
            },
            {
                id: "traffic-analytics",
                question: "Can I see where my store traffic is coming from?",
                answer: "Yes, Selll includes traffic analytics that show you where your visitors are coming from, which pages they visit, and how they navigate your store. This helps you optimize your marketing efforts and improve conversion rates."
            },
            {
                id: "export-data",
                question: "Can I export my sales data?",
                answer: "Yes, you can export your sales data, customer information, and product reports in CSV format for further analysis or accounting purposes. This feature is available on all plans."
            },
            {
                id: "conversion-tracking",
                question: "Does Selll support conversion tracking for ads?",
                answer: "Yes, Selll integrates with major advertising platforms like Google Ads and Facebook Ads. You can easily add conversion tracking pixels to measure the effectiveness of your ad campaigns and optimize your marketing spend."
            },
        ],
        international: [
            {
                id: "multi-currency",
                question: "Can I sell in multiple currencies?",
                answer: "Yes, premium plans support multi-currency selling. You can display prices in your customers' local currencies, which helps increase conversion rates and provides a better shopping experience for international customers."
            },
            {
                id: "language-translation",
                question: "Can my store be available in multiple languages?",
                answer: "Yes, with our premium plans, you can create a multilingual store. This allows you to reach customers in different countries and provide them with a localized shopping experience in their preferred language."
            },
            {
                id: "international-taxes",
                question: "How does Selll handle international taxes and duties?",
                answer: "Selll automatically calculates the appropriate taxes based on your customer's location. For premium plans, we also provide tools to help you manage and display import duties and taxes, ensuring transparency for your international customers."
            },
            {
                id: "international-compliance",
                question: "How can I ensure my store complies with international regulations?",
                answer: "Selll helps you stay compliant with major international regulations like GDPR, CCPA, and VAT requirements. Our system automatically applies the necessary legal notices and tax calculations based on where your customers are located."
            },
        ],
        security: [
            {
                id: "data-security",
                question: "How does Selll keep my store and customer data secure?",
                answer: "Selll employs industry-leading security measures including SSL encryption, regular security audits, and secure data centers. All customer data is encrypted and stored according to the highest security standards to protect against unauthorized access."
            },
            {
                id: "backups",
                question: "Does Selll back up my store data?",
                answer: "Yes, we perform automatic daily backups of your store data. This ensures that your product information, customer data, and sales history are safe and can be restored if needed."
            },
            {
                id: "fraud-protection",
                question: "Does Selll offer fraud protection?",
                answer: "Yes, all Selll stores come with basic fraud detection tools. Premium plans include advanced fraud protection features that automatically flag suspicious orders based on various risk indicators, helping you prevent chargebacks and fraud losses."
            },
            {
                id: "gdpr-compliance",
                question: "Is Selll GDPR compliant?",
                answer: "Yes, Selll is fully GDPR compliant. We provide the necessary tools and features to help you collect, store, and process customer data in accordance with GDPR requirements, including consent management and data export capabilities."
            },
        ],
        payouts: [
            {
                id: "payout-schedule",
                question: "When will I receive my payouts?",
                answer: "Payouts are processed on a rolling basis. For new accounts, there's an initial 7-day holding period. After that, payouts are processed every 2 business days for premium plans and every 7 days for free plans. Funds typically appear in your bank account within 1-3 business days after processing."
            },
            {
                id: "payout-methods",
                question: "What payout methods are available?",
                answer: "Selll supports payouts via bank transfer, PayPal, and mobile money services in supported countries. You can select your preferred payout method in your account settings."
            },
            {
                id: "minimum-payout",
                question: "Is there a minimum payout amount?",
                answer: "Yes, the minimum payout amount is $20 for bank transfers and $5 for PayPal and mobile money transfers. If your available balance is below the minimum, it will roll over to the next payout period."
            },
            {
                id: "payout-fees",
                question: "Are there any fees for payouts?",
                answer: "Standard payouts to bank accounts in your local currency are free. International transfers and currency conversions may incur a small fee depending on your bank and location. PayPal payouts may be subject to PayPal's standard fees."
            },
        ],
    };

    return (
        <>
            <Head title="Frequently Asked Questions" />

            <Navbar auth={auth} />

            <div className="py-32">
                <div className="mx-auto container">
                    <div class="flex flex-col gap-6 py-4 lg:py-8">
                        <h2 class="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
                            Everything You Need to Know
                        </h2>
                        <p class="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
                            Selll and Leaf have compiled a list of frequently asked questions to help you get started selling your products online.
                        </p>
                    </div>

                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Category Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 space-y-2">
                                <h3 className="text-lg font-medium text-white mb-4">Categories</h3>
                                <div className="space-y-1">
                                    {categories.map((category) => {
                                        const Icon = category.icon;
                                        return (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                className={cn(
                                                    "flex items-center w-full px-4 py-2 text-sm rounded-lg transition-colors",
                                                    activeCategory === category.id
                                                        ? "bg-[#2C2C2C] text-white"
                                                        : "text-gray-400 hover:bg-[#2C2C2C]/50 hover:text-white"
                                                )}
                                            >
                                                <Icon className="h-4 w-4 mr-2 flex-shrink-0" />
                                                <span>{category.name}</span>
                                                <span className="ml-auto bg-[#141414] text-gray-500 text-xs rounded-full px-2 py-0.5">
                                                    {faqs[category.id]?.length || 0}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* FAQ Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-[#1A1A1A] rounded-xl p-6 shadow-sm">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                                    {categories.find(c => c.id === activeCategory)?.icon &&
                                        React.createElement(categories.find(c => c.id === activeCategory)?.icon, {
                                            className: "h-5 w-5 mr-2 text-primary-orange"
                                        })}
                                    {categories.find(c => c.id === activeCategory)?.name || "General"} Questions
                                </h2>

                                <div className="space-y-4">
                                    {faqs[activeCategory]?.map((faq) => (
                                        <div
                                            key={faq.id}
                                            className={cn(
                                                "border border-[#2C2C2C] rounded-lg overflow-hidden transition-all",
                                                openQuestions[faq.id] ? "bg-[#2C2C2C]/30" : "bg-transparent"
                                            )}
                                        >
                                            <button
                                                className="flex items-center justify-between w-full p-4 text-left"
                                                onClick={() => toggleQuestion(faq.id)}
                                            >
                                                <h3 className="text-base font-medium text-white">{faq.question}</h3>
                                                <ChevronDown
                                                    className={cn(
                                                        "h-5 w-5 text-gray-400 transition-transform",
                                                        openQuestions[faq.id] ? "transform rotate-180" : ""
                                                    )}
                                                />
                                            </button>
                                            {openQuestions[faq.id] && (
                                                <div className="px-4 pb-4 pt-0">
                                                    <p className="text-gray-400">{faq.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-orange/10 to-primary-orange/5 dark:from-primary-orange/20 dark:to-primary-orange/10 z-0"></div>
                
                <div className="relative z-10 mx-auto container py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left md:max-w-md">
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Still have questions?</h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                            Our support team is here to help you with any questions you might have about Selll's platform and services.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                                as={Link}
                                href="/contact"
                                className="bg-primary-orange hover:bg-primary-orange/90 text-white font-medium px-6 py-2.5"
                            >
                                Contact Support
                            </Button>
                            <Button
                                as="a"
                                href="https://docs.selll.online"
                                target="_blank"
                                variant="outline"
                                className="border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 font-medium px-6 py-2.5"
                            >
                                Browse Documentation
                            </Button>
                        </div>
                    </div>
                    
                    <div className="hidden md:block relative">
                        <div className="absolute -top-6 -right-6 size-24 rounded-full bg-primary-orange/20 blur-xl"></div>
                        <div className="relative bg-white dark:bg-[#2C2C2C] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 max-w-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="size-10 rounded-full bg-primary-orange/20 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-orange">
                                        <circle cx="12" cy="12" r="10"/>
                                        <path d="M12 16v-4"/>
                                        <path d="M12 8h.01"/>
                                    </svg>
                                </div>
                                <h4 className="font-medium text-gray-900 dark:text-white">Quick Support</h4>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">Get answers to your questions within 24 hours from our dedicated support team.</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
                                    <path d="M12 6v6l4 2"/>
                                </svg>
                                <span>Average response time: 4 hours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-background border-t border-gray-200 dark:border-gray-800 px-12 text-default">
                <div className="relative mx-auto w-full container">
                    <div className="py-8">
                        <div className="flex flex-wrap justify-between">
                            <nav className="flex items-center gap-6 sm:gap-8">
                                <a
                                    href="https://leafphp.dev"
                                    target="_blank"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none"
                                >
                                    © {new Date().getFullYear()} Leaf PHP
                                </a>
                                <Link
                                    href="/privacy"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:underline focus:outline-none"
                                >
                                    Privacy Policy
                                </Link>
                                <Link
                                    href="/terms"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:underline focus:outline-none"
                                >
                                    Terms of use
                                </Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Faqs;
