import { useState } from "react";
import { Head } from "@inertiajs/react";
import { Instagram, Mail, Twitter } from "lucide-react";
import Input from "@/components/form/input";
import Label from "@/components/form/label";
import Button from "@/components/form/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const Contact = ({ auth }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        companyEmail: "",
        phoneNumber: "",
        message: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const subject = `Contact Form Submission from ${formData.fullName}`;
        const body = `Name: ${formData.fullName}\nEmail: ${formData.companyEmail}\nPhone: ${formData.phoneNumber}\n\nMessage:\n${formData.message}`;

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitSuccess(true);

            window.location.href = `mailto:support@selll.online?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            setFormData({
                fullName: "",
                companyEmail: "",
                phoneNumber: "",
                message: "",
            });

            setTimeout(() => {
                setSubmitSuccess(false);
            }, 5000);
        }, 1000);
    };

    return (
        <>
            <Head title="Talk to Our Sales Team" />

            <Navbar auth={auth} />

            <div className="pb-10 pt-20 h-[calc(100vh-90px)] flex justify-center items-center bg-white dark:bg-[#141414]">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div class="max-w-3/4">
                            <div className="mb-10">
                                <h2 className="text-4xl font-medium mb-6 text-gray-900 dark:text-white">
                                    Talk to our sales team
                                </h2>

                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    Selll is here to help you reach customers
                                    from all over the world. If you'll be
                                    processing high volumes monthly, need bulk
                                    discounts, or you need help integrating
                                    Selll into your store's existing workflow,
                                    our sales team is here to help guide you.
                                </p>
                            </div>

                            <div className="mt-12">
                                <p className="text-base text-gray-800 dark:text-white mb-6">
                                    Provide your contact information to reach
                                    out.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Email us at
                                            </p>
                                            <a
                                                href="mailto:support@selll.online"
                                                className="text-gray-900 dark:text-white hover:text-primary-orange transition-colors"
                                            >
                                                support@selll.online
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Instagram className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Follow us on Instagram
                                            </p>
                                            <a
                                                target="_blank"
                                                href="https://instagram.com/selllhq"
                                                className="text-gray-900 dark:text-white hover:text-primary-orange transition-colors"
                                            >
                                                @selllhq
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Twitter className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Keep in touch on X
                                            </p>
                                            <a
                                                target="_blank"
                                                href="https://twitter.com/selllhq"
                                                className="text-gray-900 dark:text-white hover:text-primary-orange transition-colors"
                                            >
                                                @selllhq
                                            </a>
                                        </div>
                                    </div>

                                    {/* <div className="flex items-start gap-3">
                                        <div className="mt-1">
                                            <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Call us at
                                            </p>
                                            <a
                                                href="tel:+1-555-123-4567"
                                                className="text-gray-900 dark:text-white hover:text-primary-orange transition-colors"
                                            >
                                                +1-555-123-4567
                                            </a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-6">
                                Tell us how we can help
                            </h3>

                            {submitSuccess ? (
                                <div className="bg-green-900/20 border border-green-800 text-green-300 p-4 rounded mb-6">
                                    <p>
                                        Thank you for reaching out! Our team
                                        will contact you shortly.
                                    </p>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Label
                                        htmlFor="fullName"
                                        className="text-gray-600 dark:text-gray-400 mb-2"
                                    >
                                        Full name
                                    </Label>
                                    <Input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="bg-gray-100 dark:bg-[#2C2C2C] dark:border-[#3C3C3C] text-gray-900 dark:text-white focus-visible:ring-primary-orange"
                                        placeholder="John Smith"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="companyEmail"
                                        className="text-gray-600 dark:text-gray-400 mb-2"
                                    >
                                        Company email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="companyEmail"
                                        name="companyEmail"
                                        value={formData.companyEmail}
                                        onChange={handleChange}
                                        className="bg-gray-100 dark:bg-[#2C2C2C] dark:border-[#3C3C3C] text-gray-900 dark:text-white focus-visible:ring-primary-orange"
                                        placeholder="email@company.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="phoneNumber"
                                        className="text-gray-600 dark:text-gray-400 mb-2"
                                    >
                                        Phone number
                                    </Label>
                                    <Input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        className="bg-gray-100 dark:bg-[#2C2C2C] dark:border-[#3C3C3C] text-gray-900 dark:text-white focus-visible:ring-primary-orange"
                                        placeholder="+1-222-333-4444"
                                        required
                                    />
                                </div>

                                <div>
                                    <Label
                                        htmlFor="message"
                                        className="text-gray-600 dark:text-gray-400 mb-2"
                                    >
                                        How can we help?
                                    </Label>
                                    <Input
                                        as="textarea"
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="4"
                                        className="bg-gray-100 dark:bg-[#2C2C2C] dark:border-[#3C3C3C] text-gray-900 dark:text-white focus-visible:ring-primary-orange min-h-[100px] resize-none"
                                        placeholder="I'm interested in Selll for my business. Let me know more about..."
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-primary-orange hover:bg-primary-orange/90 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <svg
                                                className="animate-spin h-4 w-4 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending...
                                        </>
                                    ) : (
                                        <>Send message</>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Contact;
