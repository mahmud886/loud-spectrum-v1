import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ProductDetailsRightCard = ({ product }) => {
  const t = useTranslations('ProductDetails');
  return (
    <div className="h-[560px] w-[306px]">
      <Image
        // src="/assets/images/Product-image-gallery.png"
        src={
          product?.image
            ? `${process.env.NEXT_PUBLIC_API_URL}/public${product.image}`
            : '/assets/images/Product-image-gallery.png'
        }
        alt={product?.name || 'Product Image Right'}
        width={306}
        height={354}
      />

      <div className="mt-6">
        {product?.meta_description && (
          <p className="font-mono text-[20px] leading-[140%] font-normal tracking-normal text-white">
            {product?.meta_description}
          </p>
        )}
        <div className="mt-6">
          <button className="outline-button-black rounded-full px-5 py-2 !text-white">{t('SeePDF')}</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsRightCard;
