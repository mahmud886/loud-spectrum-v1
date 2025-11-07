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
<h1 class="pb-5 font-sans text-[35px] leading-[120%] font-normal tracking-normal text-white md:text-[40px] xl:text-[60px]">The Full Spectrum,<br>at Your Fingertips</h1>
<p class="font-mono text-[12px] leading-[120%] font-normal text-white md:text-[12px] xl:text-[16px]">Shop our full range of strain-specific terpenes and flavor-packed profiles that maximize your products and help your business grow.</p>`;

              const rawDescription =
                category?.description && category.description.trim().length > 0 ? category.description : fallbackHtml;

              const sanitizedHtml = rawDescription.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').trim();

              return (
                <div className="text-white [&_h1]:pb-5 [&_h1]:font-sans [&_h1]:text-[35px] [&_h1]:leading-[120%] [&_h1]:font-normal [&_h1]:tracking-normal [&_h1]:text-white [&_h1]:md:text-[40px] [&_h1]:xl:text-[60px] [&_li]:font-mono [&_li]:text-[12px] [&_li]:leading-[120%] [&_li]:text-white [&_li]:md:text-[12px] [&_li]:xl:text-[16px] [&_p]:font-mono [&_p]:text-[12px] [&_p]:leading-[120%] [&_p]:font-normal [&_p]:text-white [&_p]:md:text-[12px] [&_p]:xl:text-[16px] [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
                  <div className="max-w-[90%]" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
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
