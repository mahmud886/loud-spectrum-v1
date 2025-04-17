import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ProductDetailsRightCard = () => {
  const t = useTranslations('ProductDetails');
  return (
    <div className="h-[560px] w-[306px]">
      <Image src="/assets/images/Product-image-gallery.png" alt="Product Image Right" width={306} height={354} />

      <div className="mt-6">
        <p className="font-mono text-[20px] leading-[140%] font-normal tracking-normal text-white">
          Mango OG is a strain-specific, organically grown, and botanically derived terpene profile.{' '}
        </p>
        <div className="mt-6">
          <button className="outline-button-black rounded-full px-5 py-2 !text-white">{t('SeePDF')}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsRightCard;
