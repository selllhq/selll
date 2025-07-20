import { Head, Link } from "@inertiajs/react";
import { RotatingWords } from "@/utils";
import Button from "@/components/form/button";
import Navbar from "@/components/layout/navbar";
import SignUpMiniForm from "@/components/layout/sign-up-mini-form";

const testimonials = [
    {
        quote: "Made selling through DMs way easier — now customers just check out on their own.",
        author: "Desmond, @made_by_lucia__",
    },
    {
        quote: "I didn’t think I needed a store until I tried this. It’s so much simpler than I expected.",
        author: "Kwame, Fashion Seller",
    },
    {
        quote: "I got set up my product and made my first sale in under 10 minutes — and it’s free!",
        author: "FunGuy, @funguy_mbs",
    },
];

const faqs = [
    {
        question: "Do I need a website?",
        answer: "Nope. Selll works on its own and will give you a real website link to share with your customers.",
    },
    {
        question: "Is it really free?",
        answer: "Yes! You can create and share your store without paying anything. We only charge a 2% transaction fee on sales.",
    },
    {
        question: "Can I use this if I sell through WhatsApp too?",
        answer: "Definitely. Selll gives you an online store and takes care of payments, just share your store link in WhatsApp chats.",
    },
];

export default function SocialMediaPage({ auth }) {
    return (
        <div className="min-h-screen flex flex-col bg-background text-default">
            <Head>
                <title>
                    Turn Your Instagram Shop Into a Real Online Store — For Free
                    | Selll
                </title>
                <meta
                    name="description"
                    content="Sell anywhere, just your products, a clean checkout, and a link to share with your customers."
                />
            </Head>

            <Navbar auth={auth} />

            <main className="flex-1 flex flex-col items-center w-full pt-60">
                <section className="w-full pt-12 pb-16 text-center">
                    <div className="max-w-screen-lg mx-auto px-4">
                        <h1 className="text-4xl md:text-7xl tracking-[-1.44px] font-bold mx-auto mt-[14px] mb-6">
                            Turn your{" "}
                            <RotatingWords
                                words={["Instagram", "WhatsApp", "Facebook"]}
                                className="text-primary-orange dark:text-primary-orange font-semibold"
                            />{" "}
                            <br />
                            shop into a real website <br />
                            <span className="bg-[linear-gradient(315deg,var(--color-primary-orange)_25%,var(--color-primary-red))] bg-clip-text [-webkit-text-fill-color:transparent] inline-block italic pr-2">
                                for free
                            </span>
                        </h1>

                        <p className="max-w-2xl mx-auto md:text-xl text-gray-500 dark:text-gray-300">
                            Tired of managing orders through endless DMs? Selll
                            gives you a free, simple online store made for
                            sellers like you. Add your products, get a custom
                            link, and let customers browse and order on their
                            own.
                        </p>

                        <SignUpMiniForm auth={auth} />

                        <div className="text-xs text-gray-500 mb-4">
                            No upfront costs, 2% transaction fee on sales.
                        </div>
                    </div>

                    <div className="justify-center gap-4 mb-6 flex-nowrap overflow-hidden mt-24 hidden sm:flex">
                        <img
                            src="https://github.com/user-attachments/assets/9c7d7e29-7677-4535-ab3f-04796b26daf3"
                            alt="Mobile Store Mockup"
                            className="h-[480px] w-full max-w-xs rounded-lg shadow border bg-white hidden md:block"
                        />
                        <img
                            src="https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196"
                            alt="Mobile Store Mockup"
                            className="h-[400px] w-full max-w-2xl rounded-lg shadow border bg-white hidden 2xl:block"
                        />
                        <img
                            src="https://github.com/user-attachments/assets/58b88c09-6dc5-4f2d-8f49-f06e02b543a8"
                            alt="Mobile Store Mockup"
                            className="h-[480px] w-full max-w-xs rounded-lg shadow border bg-white hidden md:block"
                        />
                        <img
                            src="https://github.com/user-attachments/assets/989afd7c-32db-4bbf-99e6-1e0378816c60"
                            alt="Mobile Store Mockup"
                            className="h-[480px] w-full max-w-xs rounded-lg shadow border bg-white hidden sm:block"
                        />
                        <img
                            src="https://github.com/user-attachments/assets/71a15cc3-41fc-462a-9b5a-1acb8617e264"
                            alt="Mobile Store Mockup"
                            className="h-[480px] w-full max-w-xs rounded-lg shadow border bg-white"
                        />
                        <img
                            src="https://github.com/user-attachments/assets/4b1001d1-bedd-4181-b83f-29cbe6acccf1"
                            alt="Mobile Store Mockup"
                            className="h-96 w-full max-w-2xl rounded-lg shadow border bg-white hidden xl:block"
                        />
                    </div>
                </section>

                <section className="w-full px-4 py-24 max-w-7xl mx-auto relative">
                    <div className="text-left max-w-xl mb-16">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4 uppercase tracking-wider">
                            SELLL ANYWHERE
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Built for social media sellers{" "}
                            <span className="text-primary-orange dark:text-primary-orange">
                                like you
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300">
                            Free to start, No apps or website needed, and
                            designed to work perfectly with your Instagram,
                            WhatsApp, and Facebook shops.
                        </p>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-center">
                        <div className="lg:w-1/3">
                            <img
                                src="https://github.com/user-attachments/assets/e50d0774-35f5-4c88-8bc3-f4586e264a05"
                                alt="Instagram Store Mockup"
                                className="w-full rounded-2xl shadow-lg border border-ring/25"
                                onError={(e) => {
                                    e.target.src =
                                        "https://github.com/user-attachments/assets/d75b5b78-5f4f-4476-a439-ab4daaf66fbf";
                                }}
                            />
                        </div>

                        <div className="lg:w-2/3 lg:pl-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">
                                        Quick and easy setup, get started in 2
                                        minutes
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        No fancy or complicated setup. Just
                                        create your store, add products, and
                                        tell us where to send your payments from
                                        orders.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">
                                        Share your store link
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        Drop your store or product link in your
                                        bio, stories, or DMs. Your customers can
                                        easily browse your products, place
                                        orders, and complete payments — all
                                        without the endless back-and-forth in
                                        chat.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">
                                        Track your <br />
                                        orders & customers
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        Easily manage every order and see who’s
                                        buying from you — without spreadsheets,
                                        notebooks, or digging through old
                                        messages.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">
                                        Unlimited products, no restrictions
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        Add as many products as you want, with
                                        as many categories as you need. No
                                        limits on how many orders you can take
                                        or how many customers you can serve.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">
                                        See how your store is doing
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        Get insights on your sales, popular
                                        products, and customer activity. Know
                                        what’s working and what’s not, so you
                                        can focus on what matters most.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-semibold mb-3">
                                        Add your colours and logo
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                                        Make your store feel like yours. Add
                                        your brand colours, logo, and even
                                        update the layout if you want. It’s your
                                        store, your way.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-16">
                                <Button
                                    as={Link}
                                    href="/auth/register"
                                    variant="outline"
                                    size="lg"
                                    className="font-medium"
                                >
                                    Get your store link →
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="w-full px-4 py-24 bg-muted/90">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        What Selllers Are Saying
                    </h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-center max-w-4xl mx-auto">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-background rounded-xl shadow p-8"
                            >
                                <div className="italic text-lg text-primary/75 mb-2">
                                    “{t.quote}”
                                </div>
                                <div className="text-sm text-primary">
                                    {t.author}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full px-4 py-16 bg-primary-red text-white flex flex-col items-center text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready for a real online store?
                    </h2>
                    <p className="mb-8 max-w-xl mx-auto">
                        No more back-and-forth in DMs. Let customers shop on
                        their own while you focus on running your business.
                    </p>
                    <Button
                        as={Link}
                        href="/auth/register"
                        className="bg-white text-primary-red font-semibold px-8 py-3 rounded-full shadow mb-2 transition hover:bg-gray-100"
                    >
                        🚀 Create Your Free Store
                    </Button>
                    {/* <Button
                        as={Link}
                        href="/store/example"
                        variant="link"
                        className="text-white underline mt-2 text-sm"
                    >
                        🔍 See Example Store
                    </Button> */}
                </section>

                <section className="w-full px-4 py-16 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        FAQ
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <div
                                key={i}
                                className="bg-background rounded-xl shadow p-6"
                            >
                                <div className="font-semibold mb-1">
                                    {faq.question}
                                </div>
                                <div className="text-sm text-primary/75">
                                    {faq.answer}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <Button
                            as={Link}
                            variant="link"
                            href="/faqs"
                        >
                            Got more questions? - See all FAQs
                        </Button>
                    </div>
                </section>
            </main>

            <footer className="bg-[size:1540px] bg-left-top bg-no-repeat px-6 text-default">
                <div className="relative mx-auto w-full max-w-xl lg:container">
                    <div className="pb-10 pt-32">
                        <div className="grid grid-cols-1 gap-x-12 gap-y-20 lg:grid-cols-2 lg:gap-y-36">
                            <nav className="col-span-full flex items-center gap-6 sm:gap-10">
                                <a
                                    href="https://leafphp.dev"
                                    target="_blank"
                                    className="rounded transition-colors duration-100 hover:text-white focus:outline-none focus-visible:shadow-xs-selected"
                                >
                                    &copy; {new Date().getFullYear()} Leaf PHP
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
            </footer>
        </div>
    );
}
