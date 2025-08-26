import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const ExploreTerpeneGuide = () => {
  const t = useTranslations('Homepage');

  return (
    <div className="container">
      <div className="py-20 text-center lg:px-[188px] lg:py-[140px] xl:px-[188px] xl:py-[140px]">
        <h5 className="text-umbra-40 font-sans text-[16px] font-normal tracking-normal uppercase">
          {t('Explore_Our_Terpene_Guide')}
        </h5>
        <h6 className="text-umbra-100 mt-6 px-2.5 font-sans text-[26px] leading-[130%] font-normal lg:px-0 lg:text-[35px] xl:px-0 xl:text-[35px]">
          {t(
            'Discover_the_perfect_terpene_profile_for_your_products_The_right_blend_doesnt_just_enhance_the_experience_it_creates_lasting_loyalty_and_keeps_customers_coming_back',
          )}
        </h6>
        <div className="mt-12 w-full">
          <Link href={`/terpene-guide`} className="main-button-black rounded-full px-6 py-2">
            {t('TerpeneGuide')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreTerpeneGuide;
