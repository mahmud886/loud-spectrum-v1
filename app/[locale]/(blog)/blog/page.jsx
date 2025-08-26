import BlogCardShimmer from '@/components/containers/ordinary-blog/BlogCardShimmer';
import BlogPageTitle from '@/components/containers/ordinary-blog/BlogPageTitle';
import FeaturedBlogShimmer from '@/components/containers/ordinary-blog/FeaturedBlogShimmer';
import OrdinaryBlogSection from '@/components/containers/ordinary-blog/OrdinaryBlogSection';
import SideBlogsShimmer from '@/components/containers/ordinary-blog/SideBlogsShimmer';
import { getBlogs } from '@/services/get-blogs';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Generate metadata for the blog listing page
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

  // Check if blogs are available for metadata
  try {
    const result = await getBlogs();
    if (result.error || result.notFound) {
      // If blogs are not available, still return basic metadata
      return {
        title: 'Blog | Loud Spectrum',
        description: 'Explore our collection of articles about terpenes and flavor science.',
        alternates: {
          canonical: `${websiteUrl}/blog`,
        },
      };
    }
  } catch (error) {
    // If metadata generation fails, return basic metadata
    console.error('Error generating blog metadata:', error);
  }

  return {
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
      url: `${websiteUrl}/blog`,
      siteName: 'Loud Spectrum',
      images: [
        {
          url: `${websiteUrl}/images/blog/blog-image-featuted.png`,
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
      images: [`${websiteUrl}/images/blog/blog-image-featuted.png`],
      creator: '@loudspectrum',
      site: '@loudspectrum',
    },

    // Additional metadata
    alternates: {
      canonical: `${websiteUrl}/blog`,
      languages: {
        'en-US': `${websiteUrl}/en/blog`,
        'es-ES': `${websiteUrl}/es/blog`,
        'fr-FR': `${websiteUrl}/fr/blog`,
        'de-DE': `${websiteUrl}/de/blog`,
        'ja-JP': `${websiteUrl}/ja/blog`,
        'ru-RU': `${websiteUrl}/ru/blog`,
      },
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
}

// Blog content component that fetches data
async function BlogContent() {
  const result = await getBlogs();

  // Handle error cases
  if (result.error || result.notFound) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Blog content error:', result.message);
    }
    notFound();
  }

  return <OrdinaryBlogSection blogs={result.blogs} />;
}

// Shimmer fallback for the entire blog section
function BlogSectionShimmer() {
  return (
    <div className="mb-[100px]">
      <div className="my-10 grid grid-cols-1 gap-x-10 xl:grid-cols-[53.52%_42.58%]">
        <FeaturedBlogShimmer />
        <div className="">
          <SideBlogsShimmer />
        </div>
      </div>
      <div className="border-1"></div>

      <div className="my-10">
        <div className="flex flex-col-reverse items-start justify-between gap-4 sm:flex-row">
          <div className="h-8 w-40 animate-pulse rounded bg-gray-200"></div>
          <div className="h-8 w-32 animate-pulse rounded bg-gray-200"></div>
        </div>
      </div>

      <div className="mb-[50px] grid grid-cols-1 gap-6 gap-x-4 xl:grid-cols-3 xl:gap-y-20">
        {[...Array(6)].map((_, idx) => (
          <BlogCardShimmer key={idx} />
        ))}
      </div>
      <div className="border-1"></div>
    </div>
  );
}

const BlogPage = async () => {
  return (
    <div className="container mt-[200px]">
      <BlogPageTitle />
      <main className="">
        <Suspense fallback={<BlogSectionShimmer />}>
          <BlogContent />
        </Suspense>
      </main>
    </div>
  );
};

export default BlogPage;
