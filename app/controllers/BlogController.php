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
                'title' => '🎉🎉 Introducing Selll Links - The Easiest Way to Get Paid Online',
                'slug' => 'selll-links',
                'excerpt' => 'Selll links provide a stress-free way to bill your customers on the fly. This unlocks a whole new way of handling your customer payments',
                'content' => '<p>At Selll, we believe selling online should be simple. No setup stress. No tech headaches. Just a clean way to get paid — fast. That’s why we’re excited to introduce Selll Payment Links — the easiest way to collect payments online, anywhere your customers are.</p><h3>What is a Selll Link?</h3><p>A Selll Payment Link is a smart link you can share with anyone, anywhere — WhatsApp, Instagram, Twitter, email — and they can instantly pay you.</p><p>You can:<ul><li>Select one or more products from your store to sell</li><li>Or skip products entirely and just enter the amount and description manually</li></ul><p>It’s perfect for selling, billing, or even collecting contributions — without needing a full product catalogue.</p><h3>Who is this for?</h3><p>Selll Links are designed for anyone who needs to collect payments instantly, no matter where their customers are:<ul><li>Creators selling content or digital products</li><li>Service providers collecting quick invoices</li><li>Small shops taking custom orders</li><li>Freelancers collecting deposits</li><li>Anyone who wants to get paid — fast and easily</li></ul></p><h3>How does it work?</h3><p>Creating a Selll Link is simple:</p><ol><li>Go to your Selll dashboard</li><li>Click “Payment Link”</li><li>Select products or enter an amount manually</li><li>Share the link via any channel — email, social media, messaging apps</li></ol><p>Your customers can pay instantly using their preferred payment method.</p><h3>Ready to Try?</h3><p>Selll Links are available now for all Selll users. Just log in to your dashboard and start creating links today.</p><p>We can’t wait to see how you use Selll Links to make selling online even easier!</p>',
                'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
                'author' => [
                    'name' => 'Michael Darko',
                    'role' => 'CEO at Selll',
                    'tagline' => 'Full-stack developer and entrepreneur with a passion for building products that make life easier.'
                ],
                'date' => 'July 28, 2025',
                'readTime' => '5 min read',
                'category' => 'product-updates',
                'categoryName' => 'Product Updates'
            ],
            // [
            //     'title' => '5 Ways to Optimize Your Product Pages',
            //     'slug' => '5-ways-to-optimize-your-product-pages',
            //     'excerpt' => 'Discover how to create product pages that convert visitors into customers with these proven optimization techniques.',
            //     'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
            //     'author' => 'Selll Team',
            //     'date' => 'June 7, 2025',
            //     'readTime' => '4 min read',
            //     'category' => 'marketing',
            //     'categoryName' => 'Marketing'
            // ],
            // [
            //     'title' => 'New Features: Custom Domains and Advanced Analytics',
            //     'slug' => 'new-features-custom-domains-and-advanced-analytics',
            //     'excerpt' => "We've just released two powerful new features to help you grow your online business: custom domains and advanced analytics.",
            //     'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
            //     'author' => 'Selll Team',
            //     'date' => 'June 5, 2025',
            //     'readTime' => '3 min read',
            //     'category' => 'product-updates',
            //     'categoryName' => 'Product Updates'
            // ],
            // [
            //     'title' => 'How to Drive Traffic to Your Online Store',
            //     'slug' => 'how-to-drive-traffic-to-your-online-store',
            //     'excerpt' => 'Learn effective strategies to increase traffic to your online store and boost your sales with these proven marketing techniques.',
            //     'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
            //     'author' => 'Selll Team',
            //     'date' => 'June 3, 2025',
            //     'readTime' => '6 min read',
            //     'category' => 'marketing',
            //     'categoryName' => 'Marketing'
            // ],
            // [
            //     'title' => 'From Zero to $10K: A Seller Success Story',
            //     'slug' => 'from-zero-to-10k-a-seller-success-story',
            //     'excerpt' => "Read how one of our sellers went from zero to $10,000 in monthly sales using Selll's platform and smart marketing strategies.",
            //     'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
            //     'author' => 'Selll Team',
            //     'date' => 'June 1, 2025',
            //     'readTime' => '7 min read',
            //     'category' => 'success-stories',
            //     'categoryName' => 'Success Stories'
            // ],
            // [
            //     'title' => 'Setting Up Secure Payments with Selll',
            //     'slug' => 'setting-up-secure-payments-with-selll',
            //     'excerpt' => 'A comprehensive guide to setting up secure payment methods for your online store to build customer trust and increase conversions.',
            //     'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
            //     'author' => 'Selll Team',
            //     'date' => 'May 29, 2025',
            //     'readTime' => '5 min read',
            //     'category' => 'product-updates',
            //     'categoryName' => 'Product Updates'
            // ],
            // [
            //     'title' => 'Creating Effective Product Descriptions',
            //     'slug' => 'creating-effective-product-descriptions',
            //     'excerpt' => 'Learn how to write compelling product descriptions that engage customers and drive sales for your online store.',
            //     'image' => 'https://github.com/user-attachments/assets/f086399c-5268-4792-951b-66376e504196',
            //     'author' => 'Selll Team',
            //     'date' => 'May 27, 2025',
            //     'readTime' => '4 min read',
            //     'category' => 'marketing',
            //     'categoryName' => 'Marketing'
            // ]
        ];
    }
}
