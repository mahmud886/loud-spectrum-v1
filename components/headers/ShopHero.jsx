import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ShopHero = ({ category }) => {
  const t = useTranslations('TerpeneShop.ShopHero');

  return (
    <div className="relative h-[510px] overflow-hidden bg-black xl:h-[797px]">
      <Image
        // src="/assets/images/shop-hero.png"
        src={
          category?.image
            ? `${process.env.NEXT_PUBLIC_API_URL}/public${category?.image}`
            : '/assets/images/shop-hero.png'
        }
        alt={category?.name || 'Category Background'}
        width={1920}
        height={1291}
        className="absolute top-0 left-1/2 z-0 h-full w-full -translate-x-1/2 object-cover xl:w-full"
        priority
      />

      <div className="absolute inset-0 z-10 container h-[610px] w-full overflow-hidden md:h-[550px] xl:h-[610px]">
        <div className="relative z-10 flex h-[610px] w-full flex-col items-center justify-center gap-[40px] md:h-[450px] md:items-start md:justify-center xl:h-full xl:w-[42%]">
          <div>
            {(() => {
              const rawDescription = category?.description || '';
              const cleanDescription = rawDescription
                .replace(/<\/?[^>]+(>|$)/g, '')
                .replace(/\s+/g, ' ')
                .trim();

              const words = cleanDescription.split(' ');

              const titleWordCount = 3;
              const titlePart = words.slice(0, titleWordCount).join(' ');
              const remainingPart = words.slice(titleWordCount).join(' ');

              return (
                <>
                  <h1 className="pb-5 font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white md:text-[40px] xl:text-[60px]">
                    {titlePart || t('title')}
                  </h1>
                  <p className="font-mono text-[12px] leading-[120%] font-normal text-white md:text-[12px] xl:text-[16px]">
                    {remainingPart || t('description')}
                  </p>
                </>
              );
            })()}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-screen">
        <div className="w-full">
          <div className="flex h-[25px] md:h-[50px] xl:h-[100px]">
            <div className="w-[70%] bg-transparent"></div>
            <div className="w-[30%] bg-white"></div>
          </div>
          <div className="flex h-[25px] md:h-[50px] xl:h-[100px]">
            <div className="w-[15%] bg-white"></div>
            <div className="w-[35%] bg-transparent"></div>
            <div className="w-[50%] bg-white"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHero;
