import { Link, Head } from '@inertiajs/react';
import Navbar from '@/components/layout/navbar';

const Terms = ({ auth }) => {
    return (
        <>
            <Head title="Terms of Service" />
            
            <Navbar auth={auth} />
            
            <div className="pb-20 pt-40 bg-white dark:bg-[#141414]">
                <div className="container mx-auto max-w-4xl px-6">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Terms of Service</h1>
                    
                    <div className="space-y-8 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">1. Acceptance of Terms</h2>
                            <p className="mb-3">
                                By accessing or using Selll's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">2. Description of Service</h2>
                            <p className="mb-3">
                                Selll provides an e-commerce platform that allows users to create online stores, list products, and process payments. We reserve the right to modify, suspend, or discontinue any aspect of the service at any time.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">3. User Accounts</h2>
                            <p className="mb-3">
                                You are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">4. User Content</h2>
                            <p className="mb-3">
                                You retain ownership of any content you upload to Selll. By uploading content, you grant Selll a worldwide, non-exclusive license to use, reproduce, and display the content in connection with providing the service.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">5. Prohibited Activities</h2>
                            <p className="mb-3">
                                You agree not to use Selll for any illegal purposes or to sell prohibited items. You also agree not to interfere with the proper functioning of the service or attempt to gain unauthorized access to any systems.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">6. Payment and Fees</h2>
                            <p className="mb-3">
                                Selll charges fees for certain services as outlined in our pricing information. You agree to pay all applicable fees and taxes associated with your use of the service.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">7. Termination</h2>
                            <p className="mb-3">
                                We reserve the right to terminate or suspend your account at our discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">8. Changes to Terms</h2>
                            <p className="mb-3">
                                We may update these Terms of Service from time to time. We will notify you of any significant changes by posting a notice on our website or sending you an email.
                            </p>
                        </section>
                        
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">9. Contact Information</h2>
                            <p className="mb-3">
                                If you have any questions about these Terms, please contact us at <a href="mailto:legal@selll.online" className="text-primary-orange hover:underline">legal@selll.online</a> or visit our <Link href="/contact" className="text-primary-orange hover:underline">contact page</Link>.
                            </p>
                        </section>
                    </div>
                    
                    <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                        <p>Last updated: March 20, 2025</p>
                    </div>
                </div>
            </div>
            
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
                                <a
                                    href="/privacy"
                                    target="_blank"
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:underline focus:outline-none"
                                >
                                    Privacy Policy
                                </a>
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

export default Terms;
