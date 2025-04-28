import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ShopHero = () => {
  const t = useTranslations('TerpeneShop.ShopHero');

  return (
    <div className="relative h-[510px] overflow-hidden bg-black md:h-[797px]">
      <Image
        src="/assets/images/shop-hero.png"
        alt="Background"
        width={1440}
        height={797}
        className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover md:w-[1440px]"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[610px] w-full overflow-hidden">
        <div className="relative z-10 flex h-[610px] w-full flex-col items-center justify-center gap-[40px] md:h-full md:w-[42%]">
          <div>
            <h1 className="pb-5 font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white md:text-[60px]">
              {t('title')}
            </h1>
            <p className="font-mono text-[20px] leading-[120%] font-normal text-white">{t('description')}</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 z-20 w-full -translate-x-1/2 md:w-[1440px]">
        <Image
          src="/assets/images/hero-section-mask.png"
          alt="Shop Hero"
          width={1440}
          height={195}
          className="h-[50px] w-full object-cover md:h-[195px] md:w-[1440px]"
        />
      </div>
    </div>
  );
};

export default ShopHero;
