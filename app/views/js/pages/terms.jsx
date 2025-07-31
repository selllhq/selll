import { Link, Head } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const Terms = ({ auth }) => {
    return (
        <>
            <Head title="Terms of Service" />

            <Navbar auth={auth} />

            <div className="pb-20 pt-40 bg-white dark:bg-[#141414]">
                <div className="container mx-auto max-w-4xl px-6">
                    <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
                        Terms of Service
                    </h1>

                    <div className="space-y-8 text-gray-700 dark:text-gray-300">
                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                1. Acceptance of Terms
                            </h2>
                            <p className="mb-3">
                                By accessing or using Selll's services
                                (“Service,” “Us,” “Our,” “We”), you agree to be
                                bound by these Terms of Service (“Terms”). If
                                you do not agree to these terms, please do not
                                use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                2. Description of Service
                            </h2>
                            <p className="mb-3">
                                Selll provides an e-commerce platform that
                                enables merchants (“You,” “Your”) to create
                                online stores, manage orders, customers, process
                                payments, and manage general commerce
                                activities. We reserve the right to modify,
                                suspend, or discontinue any aspect of the
                                service at any time.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                3. Eligibility
                            </h2>
                            <p className="mb-3">
                                You must be at least 18 years old and have the
                                legal capacity to enter into contracts to use
                                our Service. By using our service, you represent
                                and warrant that you meet these requirements.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                4. User Accounts
                            </h2>
                            <p className="mb-3">
                                You are solely responsible for maintaining the
                                confidentiality of your account information and
                                password. You agree to accept responsibility for
                                all activities that occur under your account,
                                and compliance with consumer and data protection
                                laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                5. User Content
                            </h2>
                            <p className="mb-3">
                                You retain ownership of any content you upload
                                to Selll. By uploading content, you grant Selll
                                a worldwide, non-exclusive license to use,
                                reproduce, and display the content in connection
                                with providing the service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                6. Legal
                            </h2>
                            <p className="mb-3">
                                You must comply with all applicable laws,
                                regulations, and industry standards in the
                                region your store is owned, as well as obtaining
                                all necessary permits required for your
                                business.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                7. Merchant Activities
                            </h2>
                            <p className="mb-3">
                                You must provide accurate descriptions of your
                                products including images, and all other related
                                information. You must honor your stated terms
                                and conditions, including sales, returns,
                                disputes, refunds, and you are solely
                                responsible for providing support to your
                                customers.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                8. Prohibited Activities
                            </h2>
                            <p className="mb-3">
                                You agree not to use Selll for any crimes,
                                communication breeches, identity falsification,
                                illegal and fraudulent purposes or to sell
                                harmful, prohibited, or restricted items. You
                                also agree not to interfere with the proper
                                functioning of the service or attempt to gain
                                unauthorized access to any systems.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                9. Payment and Fees
                            </h2>
                            <p className="mb-3">
                                You agree to pay all applicable fees associated
                                with your use of the service. You are subject to
                                the terms and conditions of our payment
                                providers who process your payments. We reserve
                                the right to amend our fees with a 30 day
                                notice. You are solely responsible for complying
                                with all applicable tax laws set by the country
                                in your region of service, and Selll may be
                                required to collect certain taxes required by
                                law in the country of your region of service.
                                Tax records and compliance are solely your
                                responsibility.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                10. Termination
                            </h2>
                            <p className="mb-3">
                                We reserve the right to terminate or suspend
                                your account at our discretion, without notice,
                                for conduct that we believe violates these Terms
                                of Service or is harmful to other users, us, or
                                third parties. You can terminate your account
                                with us, without notice, providing you have no
                                outstanding orders or obligations. Certain
                                provisions of these terms survive termination.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                11. Disclaimer & Liability
                            </h2>
                            <p className="mb-3">
                                Selll is provided as-is, without any guarantees.
                                We do not guarantee an error-free or
                                uninterrupted use of our services. We are not
                                responsible for any indirect or accidental
                                damages, and our total liability, if any, is
                                limited to what you have paid us in the last 12
                                months. Some of these limitations might not
                                apply, depending on your local laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                12. Indemnification
                            </h2>
                            <p className="mb-3">
                                You agree to indemnify and hold us harmless from
                                any claims, losses, or liabilities arising from
                                your use of the Service, your violation of these
                                Terms, any third-party rights, or your business
                                activities. This obligation survives termination
                                of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                13. Disputes
                            </h2>
                            <p className="mb-3">
                                These Terms are governed by the laws of Ghana.
                                Any disputes will be resolved in Ghanaian courts
                                or, where possible, through mediation or
                                arbitration under Act 798. These Terms represent
                                the full agreement between you and Selll. If any
                                part is unenforceable, the rest still applies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                14. Changes to Terms
                            </h2>
                            <p className="mb-3">
                                We may update these Terms of Service from time
                                to time. We will notify you of any significant
                                changes by posting a notice on our website or
                                sending you an email. Continuing to use the
                                Service after changes are made constitutes your
                                acceptance of the new Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                15. Contact Information
                            </h2>
                            <p className="mb-3">
                                If you have any questions about these Terms,
                                please contact us at{" "}
                                <a
                                    href="mailto:support@selll.online"
                                    className="text-primary-orange hover:underline"
                                >
                                    support@selll.online
                                </a>{" "}
                                or visit our{" "}
                                <Link
                                    href="/contact"
                                    className="text-primary-orange hover:underline"
                                >
                                    contact page
                                </Link>
                                .
                            </p>
                        </section>
                    </div>

                    <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
                        <p>Last updated: July 28, 2025</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Terms;
