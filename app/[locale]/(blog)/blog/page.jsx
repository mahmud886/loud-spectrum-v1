import OrdinaryBlogSection from '@/components/containers/ordinary-blog/OrdinaryBlogSection';
import { getBlogs } from '@/services/get-blogs';

// Generate metadata for the blog listing page
export const metadata = {
  title: 'Beyond Ordinary Blog | Loud Spectrum',
  description:
    "Explore our collection of articles about terpenes, flavor science, and the extraordinary world of botanical extracts. Stay informed with Loud Spectrum's insights and expertise.",
  keywords: 'blog, terpenes, flavor science, botanical extracts, loud spectrum, articles, insights',
  authors: [{ name: 'Loud Spectrum' }],
  creator: 'Loud Spectrum',
  publisher: 'Loud Spectrum',

  // Open Graph metadata
  openGraph: {
    title: 'Beyond Ordinary Blog | Loud Spectrum',
    description:
      'Explore our collection of articles about terpenes, flavor science, and the extraordinary world of botanical extracts.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/blog`,
    siteName: 'Loud Spectrum',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/assets/images/blog/blog-image-featuted.png`,
        width: 1200,
        height: 630,
        alt: 'Beyond Ordinary Blog - Loud Spectrum',
      },
    ],
    locale: 'en_US',
    type: 'website',
    section: 'Blog',
  },

  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Beyond Ordinary Blog | Loud Spectrum',
    description:
      'Explore our collection of articles about terpenes, flavor science, and the extraordinary world of botanical extracts.',
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/assets/images/blog/blog-image-featuted.png`,
    ],
    creator: '@loudspectrum',
    site: '@loudspectrum',
  },

  // Additional metadata
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/blog`,
  },

  // Robots metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const BlogPage = async () => {
  const blogs = await getBlogs();
  return (
    <div className="container mt-[200px]">
      <div className="space-y-10">
        <h1 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal tracking-normal md:text-[60px]">
          Beyond Ordinary Blog
        </h1>
        <div className="border-1"></div>
      </div>
      <main className="">
        <OrdinaryBlogSection blogs={blogs} />
      </main>
    </div>
  );
};

export default BlogPage;
