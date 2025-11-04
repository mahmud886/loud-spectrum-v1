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
              const fallbackHtml = `
<p>Alive It\'s the pinnacle of terpene luxury—pure, rare, and perfected over years of production. Extracted from fresh flower within an hour of picking, this premium line preserves the delicate, full-bodied aroma and complexity of each strain. Never diluted or cut with other products, every batch is a unique vintage, making it a sought-after choice for those who demand the finest. Many customers secure their supply annually to ensure consistency across their products.</p><p><br></p><p><strong>Quick Facts:</strong></p><ul><li>Invented in 2018</li><li>Premium pricing</li><li>Can be CDT (cannabis derived terpene) or HDT (hemp derived terpene)</li><li>Extracted in-house through exclusive partnerships with growers</li></ul><p><br></p>`;

              const rawDescription =
                category?.description && category.description.trim().length > 0 ? category.description : fallbackHtml;

              const sanitizedHtml = rawDescription.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();

              return (
                <div className="text-white">
                  <div
                    className="max-w-[90%] font-mono text-[12px] leading-[120%] font-normal text-white md:text-[10px] xl:text-[16px]"
                    dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                  />
                </div>
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
