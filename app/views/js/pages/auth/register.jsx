import { Head, Link, useForm } from "@inertiajs/react";

import Input from "@/components/form/input";
import InputError from "@/components/form/input-error";
import Button from "@/components/form/button";
import { cn } from "@/utils";

export default function Register({ request }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: request?.email || "",
        password: "",
        confirmPassword: "",
        ref: request?.ref || "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/auth/register", {
            onFinish: () => reset("password", "confirmPassword"),
        });
    };

    return (
        <div className="bg-[#141414] flex w-screen min-h-screen">
            <Head title="Sign up" />

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
                            Create your account
                        </h1>
                        <p className="text-white/70 text-sm">
                            Sign up to get started
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5 w-full">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Name
                            </label>
                            <div className="relative">
                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={data.name}
                                    className={cn(
                                        "mt-1 block w-full bg-[#2C2C2C] border-[#2C2C2C] text-white placeholder:text-white/50",
                                        "focus-visible:ring-primary-orange focus-visible:border-primary-orange",
                                    )}
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                            </div>
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <div className="relative">
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={data.email}
                                    className={cn(
                                        "mt-1 block w-full bg-[#2C2C2C] border-[#2C2C2C] text-white placeholder:text-white/50",
                                        "focus-visible:ring-primary-orange focus-visible:border-primary-orange",
                                    )}
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                            </div>
                            <InputError
                                message={errors.email || errors?.auth}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={data.password}
                                    className={cn(
                                        "mt-1 block w-full bg-[#2C2C2C] border-[#2C2C2C] text-white placeholder:text-white/50",
                                        "focus-visible:ring-primary-orange focus-visible:border-primary-orange",
                                    )}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            <InputError
                                message={errors?.password}
                                className="mt-2"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="sr-only"
                            >
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={data.confirmPassword}
                                    className={cn(
                                        "mt-1 block w-full bg-[#2C2C2C] border-[#2C2C2C] text-white placeholder:text-white/50",
                                        "focus-visible:ring-primary-orange focus-visible:border-primary-orange",
                                    )}
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData(
                                            "confirmPassword",
                                            e.target.value,
                                        )
                                    }
                                />
                            </div>
                            <InputError
                                message={errors?.confirmPassword}
                                className="mt-2"
                            />
                        </div>

                        <Button
                            className="cursor-pointer w-full bg-primary-red hover:bg-primary-red/80 text-white"
                            disabled={processing}
                        >
                            Sign Up
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-white/70 text-sm">
                                Already have an account?{" "}
                                <Link
                                    href="/auth/register"
                                    className="text-primary-red hover:text-primary-red/80"
                                >
                                    Sign In Now
                                </Link>
                            </p>
                        </div>
                    </form>
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
                        Selll made it super easy to set up my online store and
                        start selling digital products in minutes.
                    </blockquote>

                    <div className="flex items-center justify-center space-x-3">
                        <div className="flex-shrink-0">
                            <img
                                src="https://github.com/identicons/mychidarko.png"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                        <div className="text-left">
                            <p className="text-white font-medium">
                                @mychidarko
                            </p>
                            <p className="text-white/70 text-sm">
                                mychidarko.selll.store
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
