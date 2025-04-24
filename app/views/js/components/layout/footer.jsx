import { Link } from "@inertiajs/react";

const Footer = () => {
    return (
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
    );
};

export default Footer;
