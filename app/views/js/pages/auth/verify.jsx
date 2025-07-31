import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

import Button from "@/components/form/button";
import { cn } from "@/utils";

export default function Verify({ auth }) {
    const [resending, setResending] = useState(false);
    const [resendSuccess, setResendSuccess] = useState(false);

    const resendVerificationEmail = () => {
        setResending(true);

        fetch("/api/auth/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content"),
            },
            body: JSON.stringify({ email: auth?.user?.email }),
        })
            .then((response) => response.json())
            .then(() => {
                setResendSuccess(true);
                setResending(false);

                setTimeout(() => {
                    setResendSuccess(false);
                }, 5000);
            })
            .catch(() => {
                setResending(false);
            });
    };

    return (
        <div className="bg-[#141414] flex w-screen min-h-screen">
            <Head title="Verify Email" />

            <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-10 py-8">
                <div className="max-w-md mx-auto w-full mb-16">
                    <div className="mb-8">
                        <Link href="/" className="inline-block">
                            <img
                                src="/assets/img/logo.png"
                                alt="Selll"
                                className="w-8"
                            />
                        </Link>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-white text-2xl lg:text-3xl font-semibold mb-1">
                            Check your email
                        </h1>
                        <p className="text-white/70 text-sm">
                            We've sent a verification link to{" "}
                            <span className="text-white font-medium">
                                {auth?.user?.email}
                            </span>
                        </p>
                    </div>

                    <div className="bg-[#1e1e1e] rounded-lg p-6 mb-8">
                        <div className="flex items-center mb-4">
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary-orange/10 text-primary-orange mr-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-white font-medium">
                                    Verification Required
                                </h3>
                                <p className="text-white/70 text-sm">
                                    Please verify your email to continue
                                </p>
                            </div>
                        </div>

                        <p className="text-white/70 text-sm mb-6">
                            Click the link in the email we sent to verify your
                            account. If you don't see it, check your spam
                            folder.
                        </p>

                        {resendSuccess && (
                            <div className="bg-green-500/10 text-green-400 p-3 rounded-md mb-4 text-sm">
                                Verification email resent successfully!
                            </div>
                        )}

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={resendVerificationEmail}
                                className={cn(
                                    "cursor-pointer bg-primary-red hover:bg-primary-red/80 text-white",
                                    resending &&
                                        "opacity-75 cursor-not-allowed",
                                )}
                                disabled={resending}
                            >
                                {resending ? "Resending..." : "Resend Email"}
                            </Button>

                            <Link href="/auth/logout" method="post">
                                <Button className="cursor-pointer w-full bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-white/70 text-sm">
                            Need help?{" "}
                            <a
                                href="mailto:support@selll.io"
                                className="text-primary-red hover:text-primary-red/80"
                            >
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>
            </div>

            <div className="hidden lg:flex lg:w-1/2 bg-[#1e1e1e] items-center justify-center relative">
                <div className="max-w-md px-8 py-12 text-center">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-orange/10 text-primary-orange">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                                />
                            </svg>
                        </div>
                    </div>

                    <blockquote className="text-xl font-medium text-white mb-6">
                        I just created my store and it's amazing! Already added
                        my products, and it's so easy to use.
                    </blockquote>

                    <div className="flex items-center justify-center space-x-3">
                        <div className="flex-shrink-0">
                            <img
                                src="https://cdn1.selll.online/stores/55/IMG_0190.webp"
                                alt="Big Unda"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                        <div className="text-left">
                            <p className="text-white font-medium">Big Unda</p>
                            <a
                                href="https://big-unda.selll.store"
                                target="_blank"
                                className="text-primary-orange underline text-sm"
                            >
                                big-unda.selll.store
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
