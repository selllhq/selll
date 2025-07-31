import { Head, Link, useForm } from "@inertiajs/react";

import Input from "@/components/form/input";
import InputError from "@/components/form/input-error";
import Button from "@/components/form/button";
import { cn } from "@/utils";

export default function Login({ request }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: request?.email ?? "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post("/auth/login", {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="bg-[#141414] flex w-screen min-h-screen">
            <Head title="Log in" />

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
                            Welcome back
                        </h1>
                        <p className="text-white/70 text-sm">
                            Sign in to your account
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5 w-full">
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
                                    isFocused={true}
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
                                    autoComplete="current-password"
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

                        {/* <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-700 bg-[#2C2C2C] text-primary-orange focus:ring-primary-orange"
                                    checked={data.remember}
                                    onChange={(e) => setData("remember", e.target.checked)}
                                />
                                <label htmlFor="remember" className="ml-2 block text-sm text-white/70">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link href="/auth/forgot-password" className="text-primary-orange hover:text-primary-orange/80">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div> */}

                        <Button
                            className="cursor-pointer w-full bg-primary-orange hover:bg-primary-orange/90 text-white mt-2"
                            disabled={processing}
                        >
                            Sign In
                        </Button>

                        <div className="text-center mt-4">
                            <p className="text-white/70 text-sm">
                                Don't have an account?{" "}
                                <Link
                                    href="/auth/register"
                                    className="text-primary-orange hover:text-primary-orange/80"
                                >
                                    Sign Up Now
                                </Link>
                            </p>
                        </div>
                    </form>

                    <div className="mt-8 relative space-y-3 w-full">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-[#141414] text-white/70">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="w-full gap-3">
                            <Button
                                as="a"
                                href={
                                    request?.ref
                                        ? "/auth/google?ref=" + request.ref
                                        : "/auth/google"
                                }
                                className="py-2 space-x-2 h-auto w-full text-sm justify-center border border-gray-700 text-white/90 hover:bg-[#2C2C2C] bg-[#1e1e1e]"
                            >
                                <span className="w-5 h-5">
                                    <svg
                                        className="w-full h-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                    >
                                        <path
                                            fill="#4285F4"
                                            d="M24 19.636v9.295h12.916c-.567 2.989-2.27 5.52-4.822 7.222l7.79 6.043c4.537-4.188 7.155-10.341 7.155-17.65 0-1.702-.152-3.339-.436-4.91H24Z"
                                        ></path>
                                        <path
                                            fill="#34A853"
                                            d="m10.55 28.568-1.757 1.345-6.219 4.843C6.524 42.59 14.617 48 24 48c6.48 0 11.913-2.138 15.884-5.804l-7.79-6.043c-2.138 1.44-4.865 2.313-8.094 2.313-6.24 0-11.541-4.211-13.44-9.884l-.01-.014Z"
                                        ></path>
                                        <path
                                            fill="#FBBC05"
                                            d="M2.574 13.244A23.704 23.704 0 0 0 0 24c0 3.883.938 7.527 2.574 10.756 0 .022 7.986-6.196 7.986-6.196A14.384 14.384 0 0 1 9.796 24c0-1.593.284-3.12.764-4.56l-7.986-6.196Z"
                                        ></path>
                                        <path
                                            fill="#EA4335"
                                            d="M24 9.556c3.534 0 6.676 1.222 9.185 3.579l6.873-6.873C35.89 2.378 30.48 0 24 0 14.618 0 6.523 5.39 2.574 13.244l7.986 6.196c1.898-5.673 7.2-9.884 13.44-9.884Z"
                                        ></path>
                                    </svg>
                                </span>
                                <span>Google</span>
                            </Button>

                            {/* <Button
                                as={Link}
                                href="/auth/github"
                                className="py-2 space-x-2 h-auto text-sm justify-center border border-gray-700 text-white/90 hover:bg-[#2C2C2C] bg-[#1e1e1e]"
                            >
                                <span className="w-5 h-5">
                                    <svg
                                        className="w-full h-full"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        fill="none"
                                    >
                                        <path
                                            fill="#ffffff"
                                            fillRule="evenodd"
                                            d="M24.02 0C10.738 0 0 10.817 0 24.198 0 34.895 6.88 43.95 16.424 47.154c1.193.241 1.63-.52 1.63-1.161 0-.561-.039-2.484-.039-4.488-6.682 1.443-8.073-2.884-8.073-2.884-1.074-2.805-2.665-3.525-2.665-3.525-2.187-1.483.16-1.483.16-1.483 2.425.16 3.698 2.484 3.698 2.484 2.147 3.686 5.607 2.644 7 2.003.198-1.562.834-2.644 1.51-3.245-5.329-.56-10.936-2.644-10.936-11.939 0-2.644.954-4.807 2.466-6.49-.239-.6-1.074-3.085.239-6.41 0 0 2.028-.641 6.6 2.484 1.959-.53 3.978-.8 6.006-.802 2.028 0 4.095.281 6.005.802 4.573-3.125 6.601-2.484 6.601-2.484 1.313 3.325.477 5.81.239 6.41 1.55 1.683 2.465 3.846 2.465 6.49 0 9.295-5.607 11.338-10.976 11.94.876.76 1.63 2.202 1.63 4.486 0 3.245-.039 5.85-.039 6.65 0 .642.438 1.403 1.63 1.163C41.12 43.949 48 34.895 48 24.198 48.04 10.817 37.262 0 24.02 0Z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </span>
                                <span>GitHub</span>
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right column - Testimonial */}
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
                            <a href="https://big-unda.selll.store" target="_blank" className="text-primary-orange underline text-sm">
                                big-unda.selll.store
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
