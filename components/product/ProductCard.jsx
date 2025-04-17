import Image from 'next/image';
import { useTranslations } from 'next-intl';

const ProductCard = () => {
  const t = useTranslations('TerpeneShop.ProductCard');
  return (
    <div className="group cursor-pointer">
      <div className="group-hover:border-umbra-100 h-[384px] w-[305px] border border-transparent bg-[#F0F0F0] p-5 transition-colors duration-200 ease-in-out 2xl:h-[510px] 2xl:w-[382px]">
        <div className="flex justify-end">
          <button className="main-button-black rounded-full px-6 py-3 opacity-0 transition-opacity duration-200 ease-in-out group-hover:opacity-100">
            {t('buyNow')}
          </button>
        </div>
        <div className="flex items-center justify-center overflow-hidden">
          <Image
            className="transition-scale h-[274px] w-[205px] object-cover duration-200 ease-in-out group-hover:scale-110"
            src="/assets/images/products/mother.png"
            alt="Product"
            width={411}
            height={548}
            priority={true}
          />
        </div>
        <button className="border-umbra-100 rounded-[3px] border px-2 text-[12px] font-normal">{t('tag')}</button>
      </div>
      <div className="mt-[15px]">
        <h2 className="text-[22px] font-normal">Mango OG</h2>
        <p className="text-umbra-40 text-[19px]">$10.00 – $2,999.00</p>
      </div>
    </div>
  );
};

export default ProductCard;
