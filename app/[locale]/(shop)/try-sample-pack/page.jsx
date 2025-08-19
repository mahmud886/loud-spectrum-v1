import RelatedProducts from '@/components/containers/product/RelatedProducts';
import SpectrumAccordion from '@/components/containers/SpectrumAccordion';
import MeetYourSampleSelectionProducts from '@/components/containers/try-sample-pack/MeetYourSampleSelectionProducts';
import SamplePackReviews from '@/components/containers/try-sample-pack/SamplePackReviews';
import { getCategories } from '@/services/get-categories';
import { getCategoryProducts } from '@/services/get-category-products';
import { getTranslations } from 'next-intl/server';

const TrySamplePackPage = async () => {
  const [categories, listOfProducts] = await Promise.all([getCategories(), getCategoryProducts()]);

  const samplePackCategory = categories?.data?.categories?.filter((category) => category.name.includes('Sample Pack'));

  const filteredSamplePackProducts =
    (await listOfProducts?.data?.filter((product) =>
      samplePackCategory?.some((category) => product.category_id === category._id),
    )) || [];

  const t = await getTranslations('ProductDetailsAccordion');

  const accordionData = [
    {
      title: t('AboutTheProduct.title'),
      description: samplePackCategory?.[0]?.description || 'No Description',
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

  return (
    <>
      <MeetYourSampleSelectionProducts samplePackCategory={samplePackCategory} />
      <SpectrumAccordion items={accordionData} />
      <SamplePackReviews />
      {/* <SamplePackAddAReview /> */}
      <RelatedProducts productDetails={filteredSamplePackProducts?.[0]} />
    </>
  );
};

export default TrySamplePackPage;
