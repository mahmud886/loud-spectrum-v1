import BlogHeader from '@/components/containers/ordinary-blog/BlogHeader';
import DynamicBreadcrumb from '@/components/DynamicBreadcrumb';
import { getBlogDetails } from '@/services/get-blog-details';
import BlogContents from '../../../../../components/containers/ordinary-blog/BlogContents';

// Generate JSON-LD structured data
function generateBlogJsonLd(blog) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';

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
  const { blogId } = await params;

  try {
    const blogData = await getBlogDetails(blogId);

    if (!blogData || blogData.error) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    const blog = blogData;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
    const fullImageUrl = blog.image ? `${baseUrl}${blog.image}` : null;

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
        url: `${baseUrl}/blog/${blogId}`,
        siteName: 'Loud Spectrum',
        images: fullImageUrl
          ? [
              {
                url: fullImageUrl,
                width: 1200,
                height: 630,
                alt: blog.alt_tag || blog.title,
              },
            ]
          : [],
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
        images: fullImageUrl ? [fullImageUrl] : [],
        creator: '@loudspectrum',
        site: '@loudspectrum',
      },

      // Additional metadata
      alternates: {
        canonical: `${baseUrl}/blog/${blogId}`,
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

const BlogPage = async ({ params }) => {
  const { blogId } = await params;

  // Fetch blog data for the page
  const blogData = await getBlogDetails(blogId);
  console.log('blogData', blogData);

  // Handle error or missing blog
  if (!blogData || blogData.error) {
    return (
      <div className="container mt-[200px]">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Blog Post Not Found</h1>
          <p>The requested blog post could not be found.</p>
        </div>
      </div>
    );
  }

  const jsonLd = generateBlogJsonLd(blogData);

  return (
    <>
      {/* JSON-LD structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="">
        <div className="pb-10">
          <DynamicBreadcrumb />
        </div>
        <BlogHeader blogData={blogData} />
        <BlogContents blogData={blogData} />
      </div>
    </>
  );
};

export default BlogPage;
