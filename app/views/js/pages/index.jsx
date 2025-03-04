import { Head, Link } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import Button from "@/components/form/button";
import { CheckCircle, MailCheckIcon } from "lucide-react";

const Lander = ({ auth }) => {
    return (
        <>
            <Head title="Selll online for free" />

            <Navbar auth={auth} />

            <section className="relative pt-60 bg-[url(/assets/img/bg-vector.svg)] bg-cover bg-[20px_-1000px] bg-rota bg-no-repeat">
                <div className="max-w-screen-xl mx-auto px-2 sm:px-4 text-center">
                    <h1 className="text-7xl tracking-[-1.44px] font-bold max-w-[766px] mx-auto mt-[14px] mb-6">
                        Skip the Setup, Start Selling{" "}
                        <span className="bg-[linear-gradient(315deg,var(--color-primary-orange)_25%,var(--color-primary-red))] bg-clip-text [-webkit-text-fill-color:transparent] inline-block italic pr-2">
                            for free
                        </span>
                    </h1>

                    <p className="max-w-[667px] mx-auto text-xl text-gray-500 dark:text-gray-300">
                        No complex setup. No Stripe account required. No
                        technical headaches. Just create your storefront, add
                        your products, share your link, and start
                        selling—wherever you are, in just a few clicks.
                    </p>

                    <form
                        className="my-16 rounded-full p-[6px] max-w-[508px] bg-background w-full border border-gray500 mx-auto flex items-center"
                        method="get"
                        action="/auth/register"
                    >
                        <div className="flex items-center h-full flex-1 px-3 gap-3">
                            <label
                                htmlFor="email"
                                className="h-6 w-6 grid place-content-center"
                            >
                                <MailCheckIcon className="text-gray-400 dark:text-gray-500" />
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="flex-1 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-black dark:text-gray-300 h-full border-none outline-none text-lg"
                                placeholder="Enter email to claim your free store"
                            />
                        </div>
                        <Button className="p-4 font-medium rounded-full active:scale-95 transition-all duration-150 ease-in-out border-none bg-primary-orange hover:bg-primary-red/80 text-white flex-shrink-0">
                            Start Selling
                        </Button>
                    </form>

                    <ul className="flex w-fit mx-auto gap-12 mb-[100px]">
                        <li>
                            <p className="flex items-center gap-[10px] text-sm font-medium">
                                <CheckCircle className="text-primary-orange" />
                                <span>No credit card required</span>
                            </p>
                        </li>
                        {/* <li>
                            <p className="flex items-center gap-[10px] text-sm font-medium">
                                <CheckCircle className="text-primary-orange" />
                                <span>No hidden Fees</span>
                            </p>
                        </li> */}
                        <li>
                            <p className="flex items-center gap-[10px] text-sm font-medium">
                                <CheckCircle className="text-primary-orange" />
                                <span>Free website</span>
                            </p>
                        </li>
                        <li>
                            <p className="flex items-center gap-[10px] text-sm font-medium">
                                <CheckCircle className="text-primary-orange" />
                                <span>Free analytics</span>
                            </p>
                        </li>
                    </ul>

                    <div className="relative">
                        <img
                            src="https://invoice-wise.vercel.app/assets/Dashboard.svg"
                            alt=""
                            className="max-w-[947px] w-full mx-auto block rounded-xl"
                        />
                        <div className="h-96 absolute -bottom-10 w-full left-0 bg-gradient-to-br from-transparent to-background blur-2xl bg-cover"></div>
                    </div>
                </div>
            </section>

            <section
                className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-20"
                data-zero-component="ClientShowcase"
            >
                <div className="mx-auto mt-10 flex flex-wrap items-center justify-between gap-10 text-center text-gray-400">
                    <h2 className="text-lg font-semibold leading-8">
                        Trusted by
                    </h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 702 200"
                        fill="none"
                        className="hidden md:block h-5"
                    >
                        <path
                            fill="currentColor"
                            d="M81.1 85.91c-1.374 0-2.75 1.375-2.75 2.75v28.178c0 1.375 1.376 2.75 2.75 2.75h22.68v35.051s-4.81 2.062-19.243 2.062c-16.495 0-39.176-6.186-39.176-57.045s24.055-57.044 46.736-57.044c19.931 0 28.178 3.436 33.677 4.81 1.374.688 3.436-1.374 3.436-2.748l6.186-27.492c0-.687 0-1.374-1.375-2.062-2.062-1.374-15.12-8.934-48.797-8.934-39.176 0-77.663 15.807-77.663 95.532 0 79.038 45.36 90.722 83.161 90.722 31.615 0 50.859-13.059 50.859-13.059.687-.687.687-1.374.687-2.061V88.66c0-1.375-1.374-2.75-2.749-2.75M436.426 15.807c0-1.374-1.374-2.749-2.749-2.749h-32.302c-1.375 0-2.749 1.375-2.749 2.75V78.35h-50.859V15.808c0-1.375-1.375-2.75-2.75-2.75h-32.302c-1.375 0-2.749 1.375-2.749 2.75v169.759c0 1.375 1.374 2.749 2.749 2.749h32.302c1.375 0 2.75-1.374 2.75-2.749v-72.852h50.859v72.852c0 1.375 1.374 2.749 2.749 2.749h32.302c1.375 0 2.749-1.374 2.749-2.749V15.807ZM179.381 59.794c11.767 0 21.306-9.54 21.306-21.306 0-11.767-9.539-21.306-21.306-21.306-11.767 0-21.306 9.54-21.306 21.306 0 11.767 9.539 21.306 21.306 21.306ZM197.938 71.478c0-1.375-1.374-2.75-2.749-2.75h-32.302c-1.375 0-2.749 1.375-2.749 2.75v112.714c0 3.437 2.062 4.124 4.811 4.124h29.553c3.436 0 4.124-1.374 4.124-4.124M527.835 69.416c-1.375 0-2.749 1.374-2.749 2.749v83.161s-8.248 6.186-19.931 6.186c-11.684 0-14.433-5.498-14.433-16.495V72.165c0-1.375-1.375-2.75-2.75-2.75H455.67c-1.375 0-2.749 1.375-2.749 2.75v78.35c0 33.677 18.557 41.925 44.673 41.925 21.306 0 38.488-11.684 38.488-11.684s.688 6.186 1.375 6.873c.687.687 1.375 1.374 2.062 1.374h20.618c1.375 0 2.75-1.374 2.75-2.749V72.164c0-1.374-1.375-2.748-2.75-2.748M636.426 162.199c-13.746 0-19.932-6.185-19.932-6.185v-54.296s7.561-4.81 16.495-5.498c11.684-1.375 22.681 2.749 22.681 30.24 0 29.554-3.437 35.739-19.932 35.739h.688Zm-18.557-88.66V15.807c0-1.374-1.375-2.749-2.749-2.749h-32.302c-1.375 0-2.75 1.375-2.75 2.75v169.759c0 1.374 1.375 2.749 2.75 2.749h22.68c.687 0 2.062-.687 2.062-1.375.687-.687 1.374-7.56 1.374-7.56s13.059 13.059 38.488 13.059c29.554 0 46.736-15.12 46.736-67.354s-26.804-59.107-45.361-59.107-30.928 8.248-30.928 8.248v-.688ZM267.354 68.728V36.426c0-1.375-.687-2.062-2.062-2.062h-33.677c-1.374 0-2.062.688-2.062 2.75V70.79s-16.495 4.124-17.869 4.124c-1.375.687-2.062 1.375-2.062 2.75v21.305c0 1.375 1.375 2.749 2.749 2.749h17.182v50.172c0 37.801 26.117 41.237 43.987 41.237 8.247 0 17.869-2.749 19.244-3.436.687-.688 1.374-1.375 1.374-2.749v-22.681c0-1.374-1.374-2.749-2.749-2.749s-4.811.687-8.935.687c-11.684 0-15.807-5.498-15.807-13.058v-47.423h24.055c1.374 0 2.749-1.374 2.749-2.749V71.478c0-1.375-1.375-2.75-2.749-2.75"
                        ></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 732 230"
                        fill="none"
                        className="h-3 md:h-6"
                    >
                        <path
                            fill="currentColor"
                            d="M91.4 81.9v24.6h58.8c-1.8 13.8-6.4 23.9-13.4 31-8.6 8.6-22 18-45.4 18-36.2 0-64.5-29.2-64.5-65.4s28.3-65.4 64.5-65.4c19.5 0 33.8 7.7 44.3 17.6L153 25C138.4 10.8 118.8 0 91.4 0 41.8 0 .1 40.4.1 90s41.7 90 91.3 90c26.8 0 47-8.8 62.8-25.2 16.2-16.2 21.3-39.1 21.3-57.5 0-5.7-.4-11-1.3-15.4H91.4Zm157.6-20c-32.1 0-58.3 24.4-58.3 58.1 0 33.4 26.2 58.1 58.3 58.1 32.1 0 58.3-24.6 58.3-58.1 0-33.7-26.2-58.1-58.3-58.1Zm0 93.3c-17.6 0-32.8-14.5-32.8-35.2 0-20.9 15.2-35.2 32.8-35.2 17.6 0 32.8 14.3 32.8 35.2 0 20.7-15.2 35.2-32.8 35.2Zm285.8-80.3h-.9c-5.7-6.8-16.7-13-30.6-13-29 0-54.3 25.3-54.3 58.1 0 32.6 25.3 58.1 54.3 58.1 13.9 0 24.9-6.2 30.6-13.2h.9v8.1c0 22.2-11.9 34.1-31 34.1-15.6 0-25.3-11.2-29.3-20.7l-22.2 9.2c6.4 15.4 23.3 34.3 51.5 34.3 29.9 0 55.2-17.6 55.2-60.5V64.9h-24.2v10Zm-29.3 80.3c-17.6 0-31-15-31-35.2 0-20.5 13.4-35.2 31-35.2 17.4 0 31 15 31 35.4.1 20.3-13.6 35-31 35ZM379 61.9c-32.1 0-58.3 24.4-58.3 58.1 0 33.4 26.2 58.1 58.3 58.1 32.1 0 58.3-24.6 58.3-58.1 0-33.7-26.2-58.1-58.3-58.1Zm0 93.3c-17.6 0-32.8-14.5-32.8-35.2 0-20.9 15.2-35.2 32.8-35.2 17.6 0 32.8 14.3 32.8 35.2 0 20.7-15.2 35.2-32.8 35.2ZM579 2.4h25.1v175.7H579V2.4Zm102.6 152.8c-13 0-22.2-5.9-28.2-17.6l77.7-32.1-2.6-6.6c-4.8-13-19.6-37-49.7-37-29.9 0-54.8 23.5-54.8 58.1 0 32.6 24.6 58.1 57.6 58.1 26.6 0 42-16.3 48.4-25.7l-19.8-13.2c-6.6 9.6-15.6 16-28.6 16Zm-1.8-71.5c10.3 0 19.1 5.3 22 12.8l-52.5 21.7c0-24.4 17.3-34.5 30.5-34.5Z"
                        ></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 872 240"
                        fill="none"
                        className="h-3 md:h-6"
                    >
                        <path
                            fill="currentColor"
                            d="M273.982 115.381c0 39.24 25.2 66.6 60.12 66.6s60.12-27.36 60.12-66.6c0-39.24-25.2-66.6-60.12-66.6s-60.12 27.36-60.12 66.6Zm97.2 0c0 28.08-15.3 46.26-37.08 46.26-21.78 0-37.08-18.18-37.08-46.26s15.3-46.26 37.08-46.26c21.78 0 37.08 18.18 37.08 46.26ZM459.105 181.981c26.46 0 41.58-22.32 41.58-49.14s-15.12-49.14-41.58-49.14c-12.24 0-21.24 4.86-27.18 11.88v-10.08h-21.6v126.9h21.6v-42.3c5.94 7.02 14.94 11.88 27.18 11.88Zm-27.72-51.84c0-17.82 10.08-27.54 23.4-27.54 15.66 0 24.12 12.24 24.12 30.24s-8.46 30.24-24.12 30.24c-13.32 0-23.4-9.9-23.4-27.36v-5.58ZM559.14 181.981c18.9 0 33.84-9.9 40.5-26.46l-18.54-7.02c-2.88 9.72-11.34 15.12-21.96 15.12-13.86 0-23.58-9.9-25.2-26.1h66.24v-7.2c0-25.92-14.58-46.62-41.94-46.62s-45 21.42-45 49.14c0 29.16 18.9 49.14 45.9 49.14Zm-1.08-80.1c13.68 0 20.16 9 20.34 19.44h-43.38c3.24-12.78 11.88-19.44 23.04-19.44ZM616.388 180.001h21.6v-55.44c0-13.5 9.9-20.7 19.62-20.7 11.88 0 16.56 8.46 16.56 20.16v55.98h21.6v-62.28c0-20.34-11.88-34.02-31.68-34.02-12.24 0-20.7 5.58-26.1 11.88v-10.08h-21.6v94.5ZM759.03 50.76l-48.96 129.241h22.86l10.98-29.52h55.8l11.16 29.52h23.22l-48.96-129.24h-26.1Zm12.6 25.56 20.52 54.001h-40.68l20.16-54ZM871.17 51.136h-23.04v129.24h23.04V51.136ZM221.198 98.229a59.782 59.782 0 0 0-5.138-49.11c-13.095-22.8-39.42-34.53-65.13-29.01A59.81 59.81 0 0 0 105.833 0c-26.28-.06-49.598 16.86-57.683 41.865A59.815 59.815 0 0 0 8.168 70.87c-13.193 22.74-10.185 51.405 7.44 70.905a59.784 59.784 0 0 0 5.137 49.11c13.095 22.8 39.42 34.53 65.13 29.01a59.767 59.767 0 0 0 45.098 20.1c26.295.067 49.62-16.868 57.705-41.895a59.815 59.815 0 0 0 39.982-29.003c13.178-22.74 10.163-51.382-7.455-70.882l-.007.015Zm-90.21 126.082a44.826 44.826 0 0 1-28.793-10.41 29.394 29.394 0 0 0 1.418-.802l47.79-27.6a7.77 7.77 0 0 0 3.93-6.803v-67.372l20.197 11.662c.218.105.36.315.39.555v55.793c-.03 24.81-20.122 44.925-44.932 44.977Zm-96.63-41.272a44.783 44.783 0 0 1-5.363-30.135c.353.21.975.592 1.418.847l47.79 27.6a7.78 7.78 0 0 0 7.852 0l58.343-33.69v23.325a.749.749 0 0 1-.285.623l-48.308 27.892c-21.517 12.39-48.997 5.025-61.44-16.462h-.007ZM21.78 78.721a44.826 44.826 0 0 1 23.408-19.717c0 .412-.023 1.14-.023 1.65v55.207a7.775 7.775 0 0 0 3.923 6.795l58.342 33.683-20.197 11.662a.713.713 0 0 1-.683.06l-48.315-27.915c-21.472-12.435-28.837-39.907-16.462-61.417l.007-.008Zm165.945 38.618-58.342-33.69 20.197-11.655a.715.715 0 0 1 .683-.06l48.315 27.892c21.51 12.428 28.882 39.945 16.455 61.455a44.958 44.958 0 0 1-23.4 19.71v-56.857a7.764 7.764 0 0 0-3.9-6.795h-.008Zm20.1-30.255a64.724 64.724 0 0 0-1.417-.848l-47.79-27.6a7.783 7.783 0 0 0-7.853 0l-58.342 33.69V69.001a.747.747 0 0 1 .285-.622l48.307-27.87c21.518-12.413 49.028-5.025 61.433 16.5a44.962 44.962 0 0 1 5.362 30.075h.015ZM81.443 128.656l-20.205-11.662a.707.707 0 0 1-.39-.555V60.646c.015-24.84 20.167-44.97 45.007-44.955a44.963 44.963 0 0 1 28.755 10.41c-.367.195-.997.548-1.417.803l-47.79 27.6a7.757 7.757 0 0 0-3.93 6.795l-.03 67.342v.015Zm10.972-23.655 25.988-15.007 25.987 15v30.007l-25.987 15-25.988-15v-30Z"
                        ></path>
                    </svg>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 720 200"
                        fill="none"
                        className="h-2 md:h-4"
                    >
                        <path
                            fill="currentColor"
                            d="M130.329 147.742c2.232 8.412 5.835 11.664 12.202 11.664 6.601 0 10.062-3.949 10.062-11.664V4.516h41.346v143.226c0 20.189-2.629 28.937-12.906 39.176-7.407 7.378-21.069 13.082-38.319 13.082-13.937 0-27.273-4.595-35.777-13.081-7.457-7.441-11.553-15.083-17.953-39.178L63.612 52.258c-2.234-8.412-5.835-11.663-12.202-11.663-6.602 0-10.063 3.948-10.063 11.663v143.228H0V52.258C0 32.07 2.63 23.32 12.908 13.082 20.312 5.707 33.975 0 51.227 0 65.164 0 78.5 4.596 87.004 13.081c7.457 7.44 11.552 15.083 17.953 39.178l25.372 95.483ZM677.263 195.486l-47.75-148.784c-.527-1.642-1.025-3.036-1.79-3.966-1.312-1.59-3.127-2.426-5.569-2.426-2.441 0-4.256.835-5.569 2.426-.764.928-1.263 2.322-1.788 3.966l-47.749 148.784h-42.739l52.157-162.528c2.718-8.467 6.602-15.655 11.531-20.444C596.457 4.3 606.425 0 622.155 0c15.731 0 25.7 4.3 34.157 12.512 4.929 4.791 8.813 11.978 11.532 20.445l52.157 162.527h-42.738v.002ZM469.189 195.486c27.088 0 40.301-5.732 50.739-16.071 11.551-11.437 17.076-23.951 17.076-42.634 0-16.509-6.068-31.8-15.306-40.95-12.079-11.964-27.083-15.735-51.547-15.735l-34.267-.001c-13.094 0-18.312-1.576-22.44-5.616-2.835-2.772-4.164-6.894-4.164-11.752 0-5.022 1.214-9.982 4.679-13.37 3.076-3.008 7.268-4.388 15.324-4.388h99.035V4.516h-91.471c-27.088 0-40.3 5.733-50.74 16.07-11.549 11.438-17.076 23.95-17.076 42.633 0 16.512 6.068 31.801 15.307 40.949 12.081 11.965 27.083 15.737 51.547 15.737l34.268.003c13.094 0 18.312 1.573 22.44 5.615 2.835 2.773 4.164 6.893 4.164 11.752 0 5.022-1.214 9.982-4.678 13.37-3.077 3.007-7.269 4.387-15.325 4.387H374.615L335.44 32.958c-2.717-8.467-6.602-15.655-11.531-20.444C315.45 4.3 305.481 0 289.751 0s-25.7 4.3-34.155 12.512c-4.93 4.791-8.814 11.978-11.531 20.445l-52.158 162.527h42.738l47.75-148.783c.527-1.643 1.025-3.037 1.79-3.967 1.312-1.59 3.128-2.425 5.569-2.425s4.256.835 5.569 2.425c.765.929 1.263 2.323 1.788 3.967l47.75 148.783h124.328v.002Z"
                        ></path>
                    </svg>
                </div>
            </section>

            <section className="bg-black">
                <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[125px] py-[141px]">
                        <div className="h-[595px] bg-[#1f1f1f] rounded-[20px] flex items-center justify-end">
                            <img src="/assets/img/example-store.svg" alt="" />
                        </div>
                        <div className="text-white">
                            <div className="space-y-6 mb-12">
                                <h2 className="text-4xl font-bold">
                                    Instant Storefronts, <br /> No Coding Needed
                                </h2>
                                <p>
                                    Set up your personalized online store in
                                    minutes and start accepting payments, track
                                    your sales, and more—without the usual
                                    headaches. No complex setup, no developer
                                    required. Whether you're a creator,
                                    freelancer, or small business, Selll makes
                                    online selling fast, easy, and accessible
                                    worldwide.
                                </p>
                            </div>
                            <ul className="space-y-6">
                                <li>
                                    <div className="flex gap-5 items-center">
                                        <div className="grid place-content-center flex-shrink-0 bg-[#262626] h-[71px] w-[71px] rounded-md">
                                            <img
                                                src="/assets/icons/receipt.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-[10px] leading-[21.56px]">
                                                Invoices
                                            </h3>
                                            <p className="leading-[22.88px]">
                                                Use invoiceWise to convert
                                                unbilled time into professional
                                                looking invoices.
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex gap-5 items-center">
                                        <div className="grid place-content-center flex-shrink-0 bg-[#262626] h-[71px] w-[71px] rounded-md">
                                            <img
                                                src="/assets/icons/profile-users.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-[10px] leading-[21.56px]">
                                                Client Management
                                            </h3>
                                            <p className="leading-[22.88px]">
                                                All the invoicing features neede
                                                is presentAll the invoicing
                                                features neede is present
                                            </p>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex gap-5 items-center">
                                        <div className="grid place-content-center flex-shrink-0 bg-[#262626] h-[71px] w-[71px] rounded-md">
                                            <img
                                                src="/assets/icons/wallet.svg"
                                                alt=""
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-[10px] leading-[21.56px]">
                                                Payment Integration
                                            </h3>
                                            <p className="leading-[22.88px]">
                                                All the invoicing features neede
                                                is presentAll the invoicing
                                                features neede is present
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="w-full py-32">
                    <h2 className="max-w-[720px] mx-auto text-xl sm:text-5xl text-center">
                        Sell to anyone, anywhere, with multiple currencies
                        supported
                    </h2>
                    <div className="relative flex justify-center items-center my-4 sm:my-12">
                        <div
                            className="rounded-3xl bg-black/5 p-2 outline outline-white/15 backdrop-blur-md dark:bg-white/10 w-full container transform-none"
                            style={{ transformOrigin: "50% 50% 0px" }}
                        >
                            <iframe
                                src="https://www.youtube.com/embed/wvDELSI7fHg?si=SJNoV_HMcjeRWoI8"
                                title="YouTube video player"
                                frameborder="0"
                                className="rounded-2xl w-full h-full aspect-video bg-black/5 dark:bg-white/10"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                            ></iframe>
                        </div>
                    </div>

                    <div class="flex flex-col items-center gap-16 w-full text-center">
                        <div>
                            <h3 class="font-medium text-xl sm:text-3xl">
                                Turn Your Idea into Income—Fast
                            </h3>
                            <p class="mt-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Skip the complicated setup and start selling
                                today. Your storefront, payments, and sales—all
                                in one place.
                            </p>
                        </div>
                        <div class="font-medium text-[96px] text-primary-orange leading-none">
                            {Intl.NumberFormat().format(123456)}
                            <p class="text-lg font-normal text-black dark:text-white">
                                Purchases made on Selll stores
                            </p>
                        </div>
                        <div class="flex justify-center gap-8 text-black dark:text-white">
                            <div class="font-medium text-[56px] leading-none">
                                {Intl.NumberFormat().format(1234)}
                                <p class="text-lg font-normal">Active Stores</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="flex justify-center items-center bg-primary-red/80 py-32">
                <div class="container">
                    <h2 class="text-3xl lg:text-5xl text-center">
                        Let's get you started in 3 easy steps
                    </h2>

                    <div class="mt-16 grid-container grid gap-x-md gap-y-xl grid-cols-4 sm:items-end md:grid-cols-12">
                        <div class="grid-images-container w-full h-full hidden sm:flex gap-sm justify-self-end col-span-4 items-end ml-10 order-2 sm:col-span-2 sm:ml-0 sm:order-1 md:col-span-5 lg:col-span-6">
                            Something
                        </div>
                        <div class="col-span-4 sm:col-span-2 sm:order-2 md:col-span-7 lg:col-span-6 lg:pl-lg">
                            <div class="mb-2xl" role="list">
                                <p
                                    class="w-full text-left items-center flex text-4xl"
                                    role="listitem"
                                    tabindex="0"
                                >
                                    <span class="block text-body-lg text-primary-orange w-10 md:w-16">
                                        01
                                    </span>
                                    <span class="block grow border-b dark:border-b-primary-orange pb-2 md:py-3 transition-color duration-300 text-pretty text-white">
                                        Add your first product
                                    </span>
                                </p>
                                <p
                                    class="w-full text-left items-center flex text-4xl"
                                    role="listitem"
                                    tabindex="0"
                                >
                                    <span class="block text-body-lg text-primary-orange w-10 md:w-16">
                                        02
                                    </span>
                                    <span class="block grow border-b dark:border-b-primary-orange pb-2 md:py-3 transition-color duration-300 text-pretty text-white">
                                        Customize your store
                                    </span>
                                </p>
                                <p
                                    class="w-full text-left items-center flex text-4xl"
                                    role="listitem"
                                    tabindex="0"
                                >
                                    <span class="block text-body-lg text-primary-orange w-10 md:w-16">
                                        03
                                    </span>
                                    <span class="block grow border-b dark:border-b-primary-orange pb-2 md:py-3 transition-color duration-300 text-pretty border-transparent text-white">
                                        Set up payments
                                    </span>
                                </p>
                            </div>
                            <div class="sm:pl-10 md:pl-16 mt-10">
                                <Button as={Link} href="/auth/register">
                                    Let's do it
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer class="bg-[size:1540px] bg-left-top bg-no-repeat px-6 text-default">
                <div class="relative mx-auto w-full max-w-xl lg:container">
                    <div class="pb-10 pt-32">
                        <div class="grid grid-cols-1 gap-x-12 gap-y-20 lg:grid-cols-2 lg:gap-y-36">
                            <nav class="col-span-full flex items-center gap-6 sm:gap-10">
                                <a
                                    href="https://leafphp.dev"
                                    target="_blank"
                                    class="rounded transition-colors duration-100 hover:text-white focus:outline-none focus-visible:shadow-xs-selected"
                                >
                                    © {(new Date()).getFullYear()} Leaf PHP
                                </a>
                                <a
                                    href="/privacy"
                                    target="_blank"
                                    class="rounded transition-colors duration-100 hover:underline focus:outline-none focus-visible:shadow-xs-selected"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    href="/terms"
                                    target="_blank"
                                    class="rounded transition-colors duration-100 hover:underline focus:outline-none focus-visible:shadow-xs-selected"
                                >
                                    Terms of use
                                </a>
                            </nav>
                        </div>
                    </div>
                    <div class="flex w-full items-end justify-center text-white">
                        <div className="mx-auto w-full container font-bold text-[120px]">
                            <a
                                href="https://leafphp.dev"
                                className="flex items-center gap-2"
                            >
                                <img
                                    src="https://zero.leafphp.dev/assets/img/logo.png"
                                    className="size-36 mr-4"
                                    alt=""
                                />
                                <span className="text-[180px] font-semibold">Selll</span>
                                <small className="italic ml-6">by Leaf PHP</small>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Lander;
