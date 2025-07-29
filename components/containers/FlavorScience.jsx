import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const FlavorScience = () => {
  const t = useTranslations('FlavorScience');
  return (
    <div className="container">
      <div className="pt-[100px] pb-[80px] md:px-[200px]">
        <div className="flex flex-col items-center justify-center space-y-12">
          <h5 className="text-umbra-100 text-center font-sans text-[26px] leading-[135%] font-normal md:text-[35px]">
            {' '}
            {t.rich('Title', {
              strong: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </h5>
          <div>
            <Link href="/lab" className="main-button-black rounded-full p-2 px-6">
              {t('Button')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlavorScience;
