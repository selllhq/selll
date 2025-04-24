import { Link, Head } from '@inertiajs/react';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const Privacy = ({ auth }) => {
    return (
        <>
            <Head title="Privacy Policy" />

            <Navbar auth={auth} />

            <div className="pb-20 pt-40 bg-white dark:bg-[#141414]">
                <div className="container mx-auto max-w-4xl px-6">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>

                    <div className="space-y-8 text-gray-700 dark:text-gray-300">
                        <section>
                            <p className="mb-6">
                                At Selll, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform. Please read this policy carefully. By using Selll, you consent to the data practices described in this statement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">1. Information We Collect</h2>
                            <p className="mb-3">
                                We collect several types of information from and about users of our platform, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Personal information (such as name, email address, phone number, and payment information)</li>
                                <li>Store information (such as store name, description, and customization settings)</li>
                                <li>Transaction data (such as products purchased, sales history, and customer information)</li>
                                <li>Usage data (such as how you interact with our platform, IP address, browser type, and device information)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">2. How We Use Your Information</h2>
                            <p className="mb-3">
                                We use the information we collect to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Provide, maintain, and improve our platform</li>
                                <li>Process transactions and send related information</li>
                                <li>Respond to your comments, questions, and requests</li>
                                <li>Send you technical notices, updates, security alerts, and support messages</li>
                                <li>Communicate with you about products, services, offers, and events</li>
                                <li>Monitor and analyze trends, usage, and activities in connection with our platform</li>
                                <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">3. Sharing of Your Information</h2>
                            <p className="mb-3">
                                We may share your personal information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Service providers who perform services on our behalf</li>
                                <li>Payment processors to complete transactions</li>
                                <li>Business partners with whom we jointly offer products or services</li>
                                <li>Law enforcement or other governmental officials, in response to a verified request</li>
                            </ul>
                            <p className="mt-3">
                                We do not sell your personal information to third parties for their marketing purposes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">4. Data Security</h2>
                            <p className="mb-3">
                                We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">5. Cookies and Tracking Technologies</h2>
                            <p className="mb-3">
                                We use cookies and similar tracking technologies to track activity on our platform and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">6. Your Data Protection Rights</h2>
                            <p className="mb-3">
                                Depending on your location, you may have the following rights regarding your personal information:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access and receive a copy of your personal information</li>
                                <li>Rectify inaccurate personal information</li>
                                <li>Request deletion of your personal information</li>
                                <li>Restrict or object to the processing of your personal information</li>
                                <li>Data portability</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">7. Children's Privacy</h2>
                            <p className="mb-3">
                                Our platform is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">8. Changes to This Privacy Policy</h2>
                            <p className="mb-3">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">9. Contact Us</h2>
                            <p className="mb-3">
                                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:legal@selll.online" className="text-primary-orange hover:underline">legal@selll.online</a> or visit our <Link href="/contact" className="text-primary-orange hover:underline">contact page</Link>.
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                        <p>Last updated: April 23, 2025</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Privacy;
