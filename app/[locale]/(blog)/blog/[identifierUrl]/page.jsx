import BlogContents from '@/components/containers/ordinary-blog/BlogContents';
import BlogContentsShimmer from '@/components/containers/ordinary-blog/BlogContentsShimmer';
import BlogHeader from '@/components/containers/ordinary-blog/BlogHeader';
import BlogHeaderShimmer from '@/components/containers/ordinary-blog/BlogHeaderShimmer';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import { getBlogDetailsBySlug } from '@/services/get-blog-details-by-slug';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Generate JSON-LD structured data
function generateBlogJsonLd(blog) {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.meta_description || blog.content?.replace(/<[^>]*>/g, '').substring(0, 160),
    image: blog.image ? `${baseUrl}${blog.image}` : null,
    author: {
      '@type': 'Organization',
      name: 'Loud Spectrum',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Loud Spectrum',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/assets/svgs/logos/logo-dark.svg`,
      },
    },
    datePublished: blog.created_at,
    dateModified: blog.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${blog._id}`,
    },
    articleSection: 'Blog',
    keywords: blog.tags,
    url: `${baseUrl}/blog/${blog._id}`,
  };
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { identifierUrl } = await params;

  try {
    const blogData = await getBlogDetailsBySlug(identifierUrl);
    const blog = blogData;
    const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || websiteUrl;
    const fullImageUrl = blog.image ? `${apiBaseUrl}${blog.image}` : null;

    return {
      title: blog.meta_title || blog.title || 'Blog Post',
      description:
        blog.meta_description || blog.content?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Read this blog post',
      keywords: blog.tags || '',
      authors: [{ name: 'Loud Spectrum' }],
      creator: 'Loud Spectrum',
      publisher: 'Loud Spectrum',

      // Open Graph metadata
      openGraph: {
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.content?.replace(/<[^>]*>/g, '').substring(0, 160),
        url: `${websiteUrl}/blog/${identifierUrl}`,
        siteName: 'Loud Spectrum',
        images: [
          {
            url: `${websiteUrl}/api/og?title=${encodeURIComponent(blog.meta_title || blog.title)}&subtitle=${encodeURIComponent('Premium Terpene Products')}`,
            width: 1200,
            height: 630,
            alt: blog.alt_tag || blog.title,
          },
        ],
        locale: 'en_US',
        type: 'article',
        publishedTime: blog.created_at,
        modifiedTime: blog.updated_at,
        section: 'Blog',
        tags: blog.tags ? [blog.tags] : [],
      },

      // Twitter Card metadata
      twitter: {
        card: 'summary_large_image',
        title: blog.meta_title || blog.title,
        description: blog.meta_description || blog.content?.replace(/<[^>]*>/g, '').substring(0, 160),
        images: [
          `${websiteUrl}/api/og?title=${encodeURIComponent(blog.meta_title || blog.title)}&subtitle=${encodeURIComponent('Premium Terpene Products')}`,
        ],
        creator: '@loudspectrum',
        site: '@loudspectrum',
      },

      // Additional metadata
      alternates: {
        canonical: `${websiteUrl}/blog/${identifierUrl}`,
      },

      // Robots metadata
      robots: {
        index: blog.status === 'Published',
        follow: blog.status === 'Published',
        googleBot: {
          index: blog.status === 'Published',
          follow: blog.status === 'Published',
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post',
      description: 'Read this blog post on Loud Spectrum',
    };
  }
}

// Async component for blog header
async function BlogHeaderContent({ identifierUrl }) {
  const blogData = await getBlogDetailsBySlug(identifierUrl);

  if (!blogData || blogData.error || blogData.notFound) {
    notFound();
  }

  return <BlogHeader blogData={blogData} />;
}

// Async component for blog contents
async function BlogContentsContent({ identifierUrl }) {
  const blogData = await getBlogDetailsBySlug(identifierUrl);

  if (!blogData || blogData.error || blogData.notFound) {
    notFound();
  }

  return <BlogContents blogData={blogData} />;
}

const BlogPage = async ({ params }) => {
  const { identifierUrl } = await params;

  return (
    <div className="container mt-[200px]">
      <div className="">
        <div className="pb-10">
          <DynamicBreadcrumb />
        </div>
        <Suspense fallback={<BlogHeaderShimmer />}>
          <BlogHeaderContent identifierUrl={identifierUrl} />
        </Suspense>
        <Suspense fallback={<BlogContentsShimmer />}>
          <BlogContentsContent identifierUrl={identifierUrl} />
        </Suspense>
      </div>
    </div>
  );
};

export default BlogPage;
