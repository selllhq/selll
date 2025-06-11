<?php

namespace App\Controllers;

class BlogController extends Controller
{
    public function index()
    {
        $posts = $this->getSamplePosts();

        response()->inertia('blog', [
            'posts' => $posts
        ]);
    }

    public function show($slug)
    {
        $posts = $this->getSamplePosts();

        $post = null;
        foreach ($posts as $p) {
            if ($p['slug'] === $slug) {
                $post = $p;
                break;
            }
        }

        response()->inertia('blog/post', [
            'post' => $post
        ]);
    }

    /**
     * Get sample blog posts data
     * In a real implementation, this would come from a database
     */
    private function getSamplePosts()
    {
        return [
            [
                'title' => 'How to Set Up Your First Online Store in 10 Minutes',
                'slug' => 'how-to-set-up-your-first-online-store',
                'excerpt' => 'Learn how to quickly set up your online store with Selll and start selling your products without any technical knowledge.',
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => 'Selll Team',
                'date' => 'June 9, 2025',
                'readTime' => '5 min read',
                'category' => 'product-updates',
                'categoryName' => 'Product Updates'
            ],
            [
                'title' => '5 Ways to Optimize Your Product Pages',
                'slug' => '5-ways-to-optimize-your-product-pages',
                'excerpt' => 'Discover how to create product pages that convert visitors into customers with these proven optimization techniques.',
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => 'Selll Team',
                'date' => 'June 7, 2025',
                'readTime' => '4 min read',
                'category' => 'marketing',
                'categoryName' => 'Marketing'
            ],
            [
                'title' => 'New Features: Custom Domains and Advanced Analytics',
                'slug' => 'new-features-custom-domains-and-advanced-analytics',
                'excerpt' => "We've just released two powerful new features to help you grow your online business: custom domains and advanced analytics.",
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => 'Selll Team',
                'date' => 'June 5, 2025',
                'readTime' => '3 min read',
                'category' => 'product-updates',
                'categoryName' => 'Product Updates'
            ],
            [
                'title' => 'How to Drive Traffic to Your Online Store',
                'slug' => 'how-to-drive-traffic-to-your-online-store',
                'excerpt' => 'Learn effective strategies to increase traffic to your online store and boost your sales with these proven marketing techniques.',
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => 'Selll Team',
                'date' => 'June 3, 2025',
                'readTime' => '6 min read',
                'category' => 'marketing',
                'categoryName' => 'Marketing'
            ],
            [
                'title' => 'From Zero to $10K: A Seller Success Story',
                'slug' => 'from-zero-to-10k-a-seller-success-story',
                'excerpt' => "Read how one of our sellers went from zero to $10,000 in monthly sales using Selll's platform and smart marketing strategies.",
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => 'Selll Team',
                'date' => 'June 1, 2025',
                'readTime' => '7 min read',
                'category' => 'success-stories',
                'categoryName' => 'Success Stories'
            ],
            [
                'title' => 'Setting Up Secure Payments with Selll',
                'slug' => 'setting-up-secure-payments-with-selll',
                'excerpt' => 'A comprehensive guide to setting up secure payment methods for your online store to build customer trust and increase conversions.',
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => 'Selll Team',
                'date' => 'May 29, 2025',
                'readTime' => '5 min read',
                'category' => 'product-updates',
                'categoryName' => 'Product Updates'
            ],
            [
                'title' => 'Creating Effective Product Descriptions',
                'slug' => 'creating-effective-product-descriptions',
                'excerpt' => 'Learn how to write compelling product descriptions that engage customers and drive sales for your online store.',
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => 'Selll Team',
                'date' => 'May 27, 2025',
                'readTime' => '4 min read',
                'category' => 'marketing',
                'categoryName' => 'Marketing'
            ]
        ];
    }
}
