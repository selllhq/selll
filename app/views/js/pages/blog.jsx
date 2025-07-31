import { useState } from "react";
import { Search } from "lucide-react";
import { Head, Link } from "@inertiajs/react";
import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import Button from "../components/form/button";

const Blog = ({ auth, posts = [] }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");

    const categories = [
        { id: "all", name: "ALL" },
        { id: "product-updates", name: "PRODUCT UPDATES" },
        { id: "marketing", name: "MARKETING" },
        { id: "company", name: "COMPANY NEWS" },
        { id: "engineering", name: "ENGINEERING & DESIGN" },
        { id: "success-stories", name: "SUCCESS STORIES" },
    ];

    const filteredPosts = posts
        .filter(
            (post) =>
                activeCategory === "all" || post.category === activeCategory,
        )
        .filter((post) => {
            if (!searchQuery) {
                return true;
            }

            const query = searchQuery.toLowerCase();

            return (
                post.title?.toLowerCase().includes(query) ||
                post.excerpt?.toLowerCase().includes(query) ||
                post.author?.toLowerCase().includes(query)
            );
        });

    return (
        <>
            <Head>
                <title>The Selll Blog</title>
                <meta
                    name="description"
                    content="Updates and announcements from Team Selll"
                />
            </Head>

            <Navbar auth={auth} />

            <div className="mt-24 py-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/wave-pattern.svg')] opacity-10 bg-repeat-x bg-bottom"></div>
                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            The Selll Blog
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">
                            Updates and announcements from Team Selll!
                        </p>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full py-3 pl-10 pr-4 border border-gray-200 dark:border-gray-700 bg-muted dark:text-white rounded-full focus:ring-primary-orange focus:border-primary-orange"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="border-t border-b border-gray-200 dark:border-gray-800">
                <div className="md:mx-auto">
                    <div className="flex overflow-x-auto py-3 gap-8 justify-center px-10">
                        {categories.map((category, index) => (
                            <button
                                key={category.id}
                                onClick={() => setActiveCategory(category.id)}
                                className={`text-xs font-medium whitespace-nowrap transition-colors ${
                                    activeCategory === category.id
                                        ? "text-primary-orange"
                                        : "text-gray-600 dark:text-gray-400 hover:text-primary-orange"
                                } ${index === 0 ? "ml-72 sm:ml-0" : ""}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div> */}

            <main className="py-12">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto">
                        {filteredPosts.length > 0 ? (
                            filteredPosts.map((post, index) => (
                                <div key={post.slug || index} className="mb-20">
                                    <div className="mb-2">
                                        <span className="text-xs font-medium text-primary-orange">
                                            {post.categoryName ||
                                                categories.find(
                                                    (c) =>
                                                        c.id === post.category,
                                                )?.name}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                            {post.date}
                                        </span>
                                    </div>

                                    {/* Article layout */}
                                    <div className="flex flex-col md:flex-row gap-8 items-start">
                                        <div className="md:w-2/3">
                                            <Link
                                                href={`/blog/${post.slug || `post-${index + 1}`}`}
                                                className="group"
                                            >
                                                <h2 className="text-3xl font-bold mb-4 group-hover:text-primary-orange transition-colors">
                                                    {post.title ||
                                                        (index === 0
                                                            ? "How we manage vulnerabilities at Selll"
                                                            : index === 1
                                                              ? "Everything you need to know about Selll"
                                                              : "Setting Up Secure Payments with Selll")}
                                                </h2>
                                            </Link>

                                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                                {post.excerpt ||
                                                    (index === 0
                                                        ? "How Selll uses Static Application Security Testing (SAST) to detect and manage vulnerabilities early"
                                                        : "A complete breakdown of how Selll works, who can use it, and what makes it unique.")}
                                            </p>
                                        </div>

                                        <div className="md:w-1/3">
                                            <Link
                                                href={`/blog/${post.slug || `post-${index + 1}`}`}
                                                className="block overflow-hidden"
                                            >
                                                <img
                                                    src={
                                                        post.image ||
                                                        (index === 0
                                                            ? "https://via.placeholder.com/500x300?text=Security+Image"
                                                            : "https://via.placeholder.com/500x300?text=Selll+Features")
                                                    }
                                                    alt={post.title}
                                                    className="w-full rounded-lg"
                                                />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                                    No posts found matching your criteria.
                                </p>
                                <Button
                                    onClick={() => setActiveCategory("all")}
                                    className="bg-primary-orange hover:bg-primary-orange/90 text-white"
                                >
                                    View All Posts
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* No pagination or footer links in the reference image */}
                    <iframe
                        src="https://selllhq.substack.com/embed"
                        width="100%"
                        height="320"
                        frameborder="0"
                        className="border border-gray-200 dark:border-neutral-900 rounded-lg mb-12"
                        scrolling="no"
                    ></iframe>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Blog;
