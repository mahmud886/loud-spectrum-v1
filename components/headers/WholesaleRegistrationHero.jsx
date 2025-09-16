import { useTranslations } from 'next-intl';
import Image from 'next/image';

const WholesaleRegistrationHero = () => {
  const t = useTranslations('Wholesale');
  return (
    <div className="container mt-[200px]">
      <div className="mb-6 flex items-center justify-center">
        <div className="w-full space-y-10 text-center xl:w-[1/2]">
          <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal xl:text-[60px]">
            {t('wholesaleRegistrationHero.title')}
          </h2>
          <button className="main-button-black rounded-full px-6 py-2">
            {t('wholesaleRegistrationHero.registerButton')}
          </button>
        </div>
      </div>
      <div className="space-y-20 py-16">
        <div className="bg-umbra-100 relative h-[631px] overflow-hidden">
          <div className="absolute top-0 left-0 w-full">
            <div className="w-full">
              <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
                <div className="w-[15%] bg-white"></div>
                <div className="w-[70%] bg-transparent"></div>
                <div className="w-[15%] bg-white"></div>
              </div>
            </div>
          </div>
          {/* Background Image */}
          <Image
            src="/assets/images/wholesale/wholesale-hero.png"
            alt="Background"
            width={1280}
            height={631}
            className="h-full w-full object-cover xl:h-[631px] xl:w-full"
            priority
          />
          {/* Wave Image Overlay at Bottom Center */}
          <div className="absolute bottom-0 left-0 w-full">
            <div className="w-full">
              <div className="flex h-[25px] lg:h-[100px] xl:h-[100px]">
                <div className="w-[50%] bg-white"></div>
                <div className="w-[50%] bg-transparent"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start">
          <div className="w-full space-y-4 xl:w-[550px] xl:space-y-6">
            <h2 className="text-umbra-40 font-sans text-[14px] leading-[120%] font-normal uppercase xl:text-[16px]">
              {t('wholesaleRegistrationHero.whyWholesaleTitle')}
            </h2>
            <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
              {t('wholesaleRegistrationHero.para1')}
            </p>
            <p className="text-umbra-100 font-mono text-[20px] leading-[140%] font-normal tracking-normal">
              {t('wholesaleRegistrationHero.para2')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WholesaleRegistrationHero;
