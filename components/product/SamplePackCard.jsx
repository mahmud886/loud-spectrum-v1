import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const SamplePackCard = ({ product }) => {
  const t = useTranslations('TerpeneShop.ProductCard');

  return (
    <div className="group cursor-pointer">
      <div className="group-hover:border-umbra-100 h-auto w-full border border-transparent transition-colors duration-200 ease-in-out">
        <div className="flex items-center justify-center overflow-hidden">
          <Image
            className="transition-scale h-full w-full object-cover duration-200 ease-in-out group-hover:scale-110 md:h-[372px] md:w-[305px]"
            // src="/assets/images/products/sample-pack-product.png"
            src={
              product?.image
                ? `${process.env.NEXT_PUBLIC_API_URL}/public${product?.image}`
                : '/assets/images/products/sample-pack-product.png'
            }
            alt="Product"
            width={305}
            height={372}
            priority={true}
          />
        </div>
      </div>

      <div className="mt-2.5 space-y-2">
        <h2 className={clsx('text-[22px] font-normal text-black')}>{product?.name}</h2>
        <button className="border-umbra-100 rounded-[3px] border px-2 text-[12px] font-normal">
          {product?.category_name || t('tag')}
        </button>
      </div>
    </div>
  );
};

export default SamplePackCard;
