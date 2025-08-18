import { Head } from "@inertiajs/react";
import Layout from "@/layouts/app-layout";

export default function Domain({ store }) {
    const currentDomain = store?.custom_domains?.[0]?.domain || "Not set";
    const isDomainVerified = store?.custom_domains?.[0]?.verified || false;
    const storeSlug = store?.slug;
    const defaultDomain = `${storeSlug}.selll.store`;

    return (
        <Layout
            variant="header"
            breadcrumbs={[
                { title: "Dashboard", href: "/dashboard" },
                { title: "Store Settings", href: "/store/customize" },
                { title: "Store Domain", href: "/store/domain" },
                { title: "Custom Domains" },
            ]}
        >
            <Head title="Custom Domain Setup" />

            <div className="max-w-4xl px-4 py-16">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Current Domain
                        </p>
                        <p className="text-lg font-medium">{currentDomain}</p>
                        {currentDomain === "Not set" && (
                            <p className="text-sm text-muted-foreground mt-1">
                                Default domain: {defaultDomain}
                            </p>
                        )}
                    </div>
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                            isDomainVerified
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                        {isDomainVerified ? "Verified" : "Not Verified"}
                    </span>
                </div>

                {!isDomainVerified && currentDomain !== "Not set" && (
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-blue-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-blue-700">
                                    We're waiting for your domain to be
                                    verified. This usually takes a few minutes
                                    after you've updated your DNS settings.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-medium mb-6">
                        How to set up your custom domain
                    </h3>

                    <div className="space-y-8">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                                    1
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-base font-medium">
                                    Go to your domain registrar
                                </h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Visit the website where you purchased your
                                    domain (e.g., GoDaddy, Namecheap, etc.). If
                                    you don't have a domain yet, you can
                                    purchase one from any domain registrar.
                                </p>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                                    2
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-base font-medium">
                                    Update your DNS settings
                                </h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    You need to add a CNAME record to your
                                    domain's DNS settings. This will point your
                                    domain to your store on Selll.
                                </p>
                                <div className="mt-2 bg-gray-100 dark:bg-black p-4 rounded-xl">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="font-medium text-muted-foreground">
                                                Type
                                            </p>
                                            <p className="mt-1 font-mono">
                                                CNAME
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-muted-foreground">
                                                Name/Host
                                            </p>
                                            <p className="mt-1 font-mono">
                                                {currentDomain}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="font-medium text-muted-foreground">
                                                Value
                                            </p>
                                            <p className="mt-1 font-mono">
                                                {defaultDomain}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <p className="mt-1 font-mono">CNAME</p>
                                        <p className="mt-1 font-mono">
                                            www
                                        </p>
                                        <p className="mt-1 font-mono">
                                            {defaultDomain}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Note: DNS changes can take up to 48 hours to
                                    propagate.
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Here are some guides for popular registrars:{" "}
                                    <a
                                        href="https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-to-create-a-cname-record-for-your-domain/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Namecheap
                                    </a>
                                    ,{" "}
                                    <a
                                        href="http://godaddy.com/help/add-a-cname-record-19236"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        GoDaddy
                                    </a>
                                    ,{" "}
                                    <a
                                        href="https://support.google.com/domains/answer/3290350?hl=en"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        Google Domains
                                    </a>
                                    , etc.
                                </p>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex-shrink-0">
                                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 font-semibold">
                                    3
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="text-base font-medium">
                                    Wait for verification
                                </h4>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Once you've added the DNS records, we'll
                                    automatically verify your domain. This
                                    usually happens within a few minutes but can
                                    take up to 24 hours.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {currentDomain === "Not set" && (
                    <div className="mt-8">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="yourdomain.com"
                                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <button
                                type="button"
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Add Domain
                            </button>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Enter your domain name without https:// or www
                        </p>
                    </div>
                )}
            </div>
        </Layout>
    );
}
