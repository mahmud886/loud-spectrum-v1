import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import SpectrumAccordionShimmer from '@/components/containers/SpectrumAccordionShimmer';
import AddAReview from '@/components/containers/product/AddAReview';
import AddAReviewShimmer from '@/components/containers/product/AddAReviewShimmer';
import ProductReviews from '@/components/containers/product/ProductReviews';
import ProductReviewsShimmer from '@/components/containers/product/ProductReviewsShimmer';
import RelatedProducts from '@/components/containers/product/RelatedProducts';
import RelatedProductsShimmer from '@/components/containers/product/RelatedProductsShimmer';
import { getProductDetails } from '@/services/get-product-details';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://loudspectrum.com';

  try {
    const productDetails = await getProductDetails(slug);
    if (!productDetails || productDetails.error || productDetails.notFound) {
      return {
        title: 'Product | Loud Spectrum',
        description: 'Premium terpene product',
      };
    }

    const title = productDetails?.name || 'Product';
    const description = productDetails?.short_description || 'Premium terpene product';
    const ogTitle = `${title} | Loud Spectrum`;

    return {
      title: ogTitle,
      description,
      metadataBase: new URL(websiteUrl),
      openGraph: {
        title: ogTitle,
        description,
        type: 'website',
        url: `${websiteUrl}/shop/${productDetails?.category?.slug || 'all'}/${slug}`,
        siteName: 'Loud Spectrum',
        locale: 'en_US',
        images: [
          {
            url: `${websiteUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Premium Terpene Products')}`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description,
        images: [
          `${websiteUrl}/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent('Premium Terpene Products')}`,
        ],
        creator: '@loudspectrum',
        site: '@loudspectrum',
      },
      alternates: {
        canonical: `${websiteUrl}/shop/${productDetails?.category?.slug || 'all'}/${slug}`,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (e) {
    return {
      title: 'Product | Loud Spectrum',
      description: 'Premium terpene product',
    };
  }
}

// Async component for spectrum accordion
async function SpectrumAccordionContent({ productDetails }) {
  const t = await getTranslations('ProductDetailsAccordion');

  const accordionData = [
    {
      title: t('AboutTheProduct.title'),
      description: productDetails?.short_description,
    },
    {
      title: t('FeaturesAndBenefits.title'),
      description: (
        <>
          <h6 className="mb-2 font-normal">{t('FeaturesAndBenefits.ProductFeatures')}</h6>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>{t('FeaturesAndBenefits.features.cGMPFacility')}</li>
            <li>{t('FeaturesAndBenefits.features.naturalIngredients')}</li>
            <li>{t('FeaturesAndBenefits.features.pureTerpenes')}</li>
            <li>{t('FeaturesAndBenefits.features.incredibleFlavors')}</li>
            <li>{t('FeaturesAndBenefits.features.strainSpecific')}</li>
            <li>{t('FeaturesAndBenefits.features.fullSpectrum')}</li>
            <li>{t('FeaturesAndBenefits.features.botanicallyDerived')}</li>
            <li>{t('FeaturesAndBenefits.features.oilSoluble')}</li>
            <li>{t('FeaturesAndBenefits.features.enhancesEffect')}</li>
            <li>{t('FeaturesAndBenefits.features.wholesalePricing')}</li>
            <li>{t('FeaturesAndBenefits.features.ultraConcentrated')}</li>
            <li>{t('FeaturesAndBenefits.features.madeInUSA')}</li>
          </ul>
          <h6 className="mb-1 font-normal">{t('FeaturesAndBenefits.PotentialBenefits')}</h6>
          <p className="mb-2">{t('FeaturesAndBenefits.benefitsDescription')}</p>
          <p className="text-xs font-normal italic">{t('FeaturesAndBenefits.fdaDisclaimer')}</p>
        </>
      ),
    },
    {
      title: t('HowToUse.title'),
      description: (
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('HowToUse.instructions.dilution')}</li>
          <li>{t('HowToUse.instructions.drinks')}</li>
          <li>{t('HowToUse.instructions.gummies')}</li>
        </ul>
      ),
    },
    {
      title: t('Details.title'),
      description: (
        <div className="space-y-4 font-mono text-[16px] leading-[140%] font-normal">
          <div>
            <strong>{t('Details.availableSizes')}</strong> {t('Details.sizesDescription')}
            <br />
            <span>{t('Details.transparencyNote')}</span>
          </div>
          <div>
            <strong>{t('Details.natural')}</strong> {t('Details.naturalDescription')}
          </div>
          <div>
            <strong>{t('Details.technology')}</strong> {t('Details.technologyDescription')}
          </div>
          <div>
            <strong>{t('Details.userExperience')}</strong> {t('Details.userExperienceDescription')}
          </div>
        </div>
      ),
    },
    {
      title: t('CertificateOfAnalysis.title'),
      description: t('CertificateOfAnalysis.description'),
    },
  ];

  return <SpectrumAccordion items={accordionData} />;
}

// Async component for product reviews
async function ProductReviewsContent({ productId }) {
  return <ProductReviews productId={productId} />;
}

// Async component for add a review
async function AddAReviewContent({ productId, authToken, categoryId }) {
  return <AddAReview productId={productId} authToken={authToken} categoryId={categoryId} />;
}

// Async component for related products
async function RelatedProductsContent({ productDetails }) {
  return <RelatedProducts productDetails={productDetails} />;
}

// Main async component that fetches product data
async function ProductDetailsContent({ params }) {
  const { slug } = await params;

  // Validate the product (category is already validated in layout)
  const productDetails = await getProductDetails(slug);
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken');

  // Check for API errors or not found responses for product
  if (!productDetails || productDetails.error || productDetails.notFound) {
    notFound();
  }

  return (
    <div className="xl:mt-[160px]">
      <Suspense fallback={<SpectrumAccordionShimmer />}>
        <SpectrumAccordionContent productDetails={productDetails} />
      </Suspense>

      <Suspense fallback={<ProductReviewsShimmer />}>
        <ProductReviewsContent productId={productDetails._id} />
      </Suspense>

      <Suspense fallback={<AddAReviewShimmer />}>
        <AddAReviewContent
          productId={productDetails._id}
          authToken={authToken?.value}
          categoryId={productDetails?.category?._id}
        />
      </Suspense>

      <Suspense fallback={<RelatedProductsShimmer />}>
        <RelatedProductsContent productDetails={productDetails} />
      </Suspense>
    </div>
  );
}

const ProductDetailsPage = async ({ params }) => {
  return (
    <Suspense
      fallback={
        <div className="xl:mt-[160px]">
          <SpectrumAccordionShimmer />
          <ProductReviewsShimmer />
          <AddAReviewShimmer />
          <RelatedProductsShimmer />
        </div>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
};

export default ProductDetailsPage;
