import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const FlavorThatSetsYouApart = () => {
  const t = useTranslations('FlavorThatSetsYouApart');
  return (
    <div className="container">
      <div className="py-12 xl:px-[100px] xl:py-[160px]">
        <div className="flex flex-col items-center justify-between gap-[100px] xl:flex-row">
          <div className="flex w-full flex-col space-y-12 xl:min-w-[411px]">
            <h5 className="text-umbra-100 pb-2 text-center font-sans text-[44px] leading-[120%] xl:text-left">
              {t('title')}
            </h5>
            <div className="block w-full xl:hidden xl:min-w-[552px]">
              <Image
                src="/assets/images/about-us/Flavor-That-Sets-You-Apart.png"
                width={553}
                height={540}
                alt={t('title')}
              />
            </div>
            <div className="text-center xl:text-left">
              <Link href={`/shop`} className="main-button-black rounded-full px-6 py-2">
                {t('button')}
              </Link>
            </div>
          </div>
          <div className="hidden w-full xl:block xl:min-w-[552px]">
            <Image
              src="/assets/images/about-us/Flavor-That-Sets-You-Apart.png"
              width={553}
              height={540}
              alt={t('title')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorThatSetsYouApart;
