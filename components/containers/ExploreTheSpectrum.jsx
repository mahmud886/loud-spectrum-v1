import ProductLineCard from '@/components/product/ProductLineCard';
import { useTranslations } from 'next-intl';

const ExploreTheSpectrum = () => {
  const t = useTranslations('Homepage');
  return (
    <div className="container mx-auto py-[80px]">
      <div className="space-y-4 lg:space-y-6 xl:space-y-6">
        <h5 className="text-umbra-40 font-sans text-[14px] font-normal uppercase md:text-[14px] lg:text-[14px] xl:text-[16px]">
          {t('Explore_The_Spectrum')}
        </h5>
        <h2 className="font-sans text-[32px] leading-[120%] font-normal md:text-[32px] lg:text-[36px] xl:text-[44px]">
          {t('Find_Your_Perfect_Profile')}
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-5">
        <ProductLineCard productVariant="Alive" />
        <ProductLineCard productVariant="Sweet" />
        <ProductLineCard productVariant="Dank" />
        <ProductLineCard productVariant="Classic" />
      </div>
    </div>
  );
};

export default ExploreTheSpectrum;
