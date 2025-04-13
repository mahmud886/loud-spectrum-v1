import React from 'react';
import ProductLineCard from '@/components/product/ProductLineCard';
import { useTranslations } from 'next-intl';

const ExploreTheSpectrum = () => {
  const t = useTranslations('Homepage')
  return (
    <div className='container py-[80px] mx-auto'>
      <h5 className='font-sans font-normal text-[16px] text-umbra-40 uppercase'>{t('Explore_The_Spectrum')}</h5>
      <h2 className='font-sans font-normal text-[44px] leading-[120%]'>{t('Find_Your_Perfect_Profile')}</h2>
      <div className='mt-12 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-5'>
        <ProductLineCard productVariant="Alive"/>
        <ProductLineCard productVariant="Sweet"/>
        <ProductLineCard productVariant="Dank"/>
        <ProductLineCard productVariant="Classic"/>
      </div>
    </div>
  );
};

export default ExploreTheSpectrum;