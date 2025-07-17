import RelatedProducts from '@/components/containers/product/RelatedProducts';
import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import MeetYourSampleSelectionProducts from '@/components/containers/try-sample-pack/MeetYourSampleSelectionProducts';
import SamplePackAddAReview from '@/components/containers/try-sample-pack/SamplePackAddAReview';
import SamplePackReviews from '@/components/containers/try-sample-pack/SamplePackReviews';
import { getCategories } from '@/services/get-categories';
import { getCategoryProducts } from '@/services/get-category-products';

const TrySamplePackPage = async () => {
  const [categories, listOfProducts] = await Promise.all([getCategories(), getCategoryProducts()]);

  const samplePackCategory = categories?.data?.categories?.filter((category) => category.name.includes('Sample Pack'));

  const filteredSamplePackProducts =
    (await listOfProducts?.data?.filter((product) =>
      samplePackCategory?.some((category) => product.category_id === category._id),
    )) || [];
  return (
    <>
      <MeetYourSampleSelectionProducts samplePackCategory={samplePackCategory} />
      <SpectrumAccordion items={accordionData} />
      <SamplePackReviews />
      <SamplePackAddAReview />
      <RelatedProducts productDetails={filteredSamplePackProducts?.[0]} />
    </>
  );
};

export default TrySamplePackPage;

const accordionData = [
  {
    title: 'About the Product',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Features & Benefits',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'How to Use',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Details',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
  {
    title: 'Certificate of Analysis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
  },
];
