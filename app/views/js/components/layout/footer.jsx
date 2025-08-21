import { Link } from "@inertiajs/react";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";

const footerLinks = [
    [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "About Selll", href: "/about" },
        { name: "Affiliate Program", href: "/affiliates" },
    ],
    [
        { name: "Blog", href: "/blog" },
        { name: "FAQs", href: "/faqs" },
        // { name: "Careers", href: "/careers" },
        // { name: "Developers/SDK", href: "/developers" },
    ],
    [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of use", href: "/terms" },
    ],
    [
        {
            name: "Contact Support",
            href: "javascript:void(0)",
            onClick: (e) => {
                e.preventDefault();
                window.Tawk_API?.toggle();
            },
        },
        { name: "Feedback", href: "https://selll.canny.io/feature-requests" },
        { name: "Visit Help Centre", href: "https://selll.tawk.help" },
    ],
];

const socialLinks = [
    // { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "http://x.com/selllhq" },
    {
        name: "Instagram",
        icon: Instagram,
        href: "http://instagram.com/selllhq",
    },
    {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/company/selllhq/",
    },
    { name: "GitHub", icon: Github, href: "http://github.com/selllhq/" },
];

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-32">
                    {footerLinks.map((section, index) => (
                        <div key={index}>
                            <ul className="space-y-2">
                                {section.map((link) => (
                                    <li key={link.name}>
                                        {link.href.startsWith("http") ? (
                                            <a
                                                href={link.href}
                                                className="text-sm text-white hover:text-gray-300 transition-colors"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={link.name}
                                            >
                                                {link.name}
                                            </a>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-white hover:underline text-sm transition-all duration-150 cursor-pointer"
                                                onClick={(e) => {
                                                    if (link.onClick) {
                                                        link.onClick(e);
                                                    }
                                                }}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="pt-8 grid gap-20 md:gap-4 md:grid-cols-3">
                    <div className="flex items-center justify-start gap-6">
                        <img
                            src="/assets/img/logo/text-white-alt.png"
                            className="w-20"
                            alt="Selll"
                        />
                        <p className="text-sm text-white">
                            {currentYear}&copy;
                        </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                        {socialLinks.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="text-white hover:text-gray-300 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={item.name}
                            >
                                <item.icon className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                    <div className="hidden md:block"></div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
