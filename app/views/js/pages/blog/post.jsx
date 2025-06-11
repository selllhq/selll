import { Head } from "@inertiajs/react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ArrowLeft, BookOpen, CalendarIcon, Clock, Share2, User } from "lucide-react";
import Button from "@/components/form/button";
import { Link } from "@inertiajs/react";

const BlogPost = ({ auth, post }) => {
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                    <Link href="/blog" className="text-primary-orange hover:underline inline-flex items-center gap-2">
                        <ArrowLeft size={16} />
                        Back to blog
                    </Link>
                </div>
            </div>
        );
    }

    post.content = `<div class="prose dark:prose-invert">
        <p class="lead">Learn how to quickly set up your online store with Selll and start selling your products without any technical knowledge.</p>
        <p>Selll is designed to help you create a professional online store in minutes, without needing any coding skills.</p>
        <p>With Selll, you can easily manage your products, customize your store's design, and start selling online.</p>
        <h2>Getting Started</h2>
        <p>Setting up your store is simple:</p>
        <ol>
            <li>Sign up for a Selll account</li>
            <li>Choose your store name and branding</li>
            <li>Add your products with descriptions and images</li>
            <li>Set up payment methods</li>
            <li>Launch your store!</li>
        </ol>
        <p>Whether you're a small business owner or an individual looking to sell your products, Selll provides the tools you need to succeed.</p>
        <blockquote>
            <p>"Selll helped me launch my online business in just one afternoon. The platform is incredibly intuitive and powerful." — Sarah K.</p>
        </blockquote>
    </div>`;

    return (
        <>
            <Head title={post.title} />

            <Navbar auth={auth} />

            {/* Hero section with gradient overlay */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 dark:from-black/80 dark:to-black/50" />
                <div className="absolute inset-0 flex items-end">
                    <div className="container mx-auto px-4 sm:px-6 pb-16 md:pb-24">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-orange/90 text-white text-sm font-medium mb-4">
                                {post.categoryName}
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center text-sm text-white/80 gap-6">
                                <div className="flex items-center">
                                    <User size={16} className="mr-2" />
                                    <span>{post.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <CalendarIcon size={16} className="mr-2" />
                                    <span>{post.date}</span>
                                </div>
                                <div className="flex items-center">
                                    <Clock size={16} className="mr-2" />
                                    <span>{post.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <main className="py-16 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="max-w-3xl mx-auto">
                        {/* Back to blog link */}
                        <Link 
                            href="/blog" 
                            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-orange dark:hover:text-primary-orange mb-8 transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-2" />
                            Back to all articles
                        </Link>

                        {/* Article content */}
                        <div
                            className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-primary-orange prose-a:no-underline hover:prose-a:underline prose-blockquote:border-primary-orange prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-md max-w-none mb-12"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Author bio */}
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-12 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex-shrink-0">
                                <img 
                                    src="/assets/img/avatar.jpg" 
                                    alt={post.author}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(post.author) + '&background=random';
                                    }}
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{post.author}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">Content Writer at Selll</p>
                                <p className="text-sm mt-1">Expert in e-commerce and digital marketing with over 5 years of experience helping businesses grow online.</p>
                            </div>
                        </div>

                        {/* Share section with modern design */}
                        <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 mb-12 bg-white dark:bg-gray-900 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="text-primary-orange" />
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Share this article</p>
                                        <h3 className="font-medium">Help others learn about Selll</h3>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2] transition-colors"
                                    >
                                        <svg
                                            className="size-4"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                        </svg>
                                        Twitter
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 hover:bg-[#1877F2]/10 hover:text-[#1877F2] transition-colors"
                                    >
                                        <svg
                                            className="size-4"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                        >
                                            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                                        </svg>
                                        Facebook
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-2 hover:bg-primary-orange/10 hover:text-primary-orange transition-colors"
                                    >
                                        <Share2 className="size-4" />
                                        Copy Link
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter with modern gradient */}
                        <div className="relative overflow-hidden rounded-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-orange to-yellow-500 opacity-90"></div>
                            <div className="relative p-8 md:p-10 text-white">
                                <div className="max-w-md mx-auto text-center">
                                    <h2 className="text-2xl font-bold mb-3">
                                        Get e-commerce tips in your inbox
                                    </h2>
                                    <p className="text-white/90 mb-6">
                                        Join our newsletter for the latest trends, tutorials, and updates
                                        to grow your online business.
                                    </p>
                                    <form className="flex flex-col sm:flex-row gap-3">
                                        <input
                                            type="email"
                                            placeholder="Your email address"
                                            className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
                                            required
                                        />
                                        <Button 
                                            type="submit"
                                            className="bg-white text-primary-orange hover:bg-white/90 border-0 py-3"
                                        >
                                            Subscribe
                                        </Button>
                                    </form>
                                    <p className="text-xs mt-4 text-white/80">
                                        We respect your privacy. Unsubscribe at any time.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default BlogPost;
