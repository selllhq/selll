import { Link, Head } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import { MessageCircleQuestion } from "lucide-react";

const Faqs = ({ auth }) => {
    const items = [
        {
            question: "What is a FAQ?",
            answer: "A FAQ is a list of frequently asked questions and answers on a particular topic.",
        },
        {
            question: "What is the purpose of a FAQ?",
            answer: "The purpose of a FAQ is to provide answers to common questions and help users find the information they need quickly and easily.",
        },
        {
            question: "How do I create a FAQ?",
            answer: "To create a FAQ, you need to compile a list of common questions and answers on a particular topic and organize them in a clear and easy-to-navigate format.",
        },
        {
            question: "What are the benefits of a FAQ?",
            answer: "The benefits of a FAQ include providing quick and easy access to information, reducing the number of support requests, and improving the overall user experience.",
        },
    ];

    return (
        <>
            <Head title="Faqs" />

            <Navbar auth={auth} />

            <div className="py-32">
                <div className="mx-auto container">
                    <div class="flex flex-col gap-6 border-l py-4 max-lg:border-l lg:py-8 lg:px-8">
                        <span
                            data-slot="badge"
                            class="inline-flex items-center justify-center rounded-md border py-0.5 whitespace-nowrap shrink-0 [&>svg]:size-3 [&>svg]:pointer-events-none ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 focus-visible:ring-4 focus-visible:outline-1 aria-invalid:focus-visible:ring-0 transition-[color,box-shadow] text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground w-fit gap-1 bg-card px-3 text-sm font-normal tracking-tight shadow-sm"
                        >
                            <MessageCircleQuestion />
                            <span>FAQ</span>
                        </span>
                        <h2 class="text-3xl leading-tight tracking-tight md:text-4xl lg:text-6xl">
                            Everything You Need to Know
                        </h2>
                        <p class="max-w-[600px] tracking-[-0.32px] text-muted-foreground">
                            Selll and Leaf have compiled a list of frequently asked questions to help you get started selling your products online.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Faqs;
