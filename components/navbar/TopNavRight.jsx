import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

import CloseButton from '@/components/navbar/CloseButton';

const TopNavRight = ({ onClose }) => {
  const t = useTranslations('Navbar');
  const topNav = t.raw('TopNav');
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex w-full items-center justify-end gap-[30px]">
        <Link
          href={`/login`}
          className="text-umbra-100 hover:text-umbra-40 mx-[5px] font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out"
        >
          {t('Log_in')}
        </Link>
        <Link
          href={`/cart`}
          className="text-umbra-100 hover:text-umbra-40 mx-[5px] font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out"
        >
          {t('Cart')} <span className="text-inherit/60">(0)</span>
        </Link>
        <CloseButton onClose={onClose} />
      </div>
      <div className="flex h-[372px] flex-col justify-between gap-4">
        <p className="text-umbra-10 font-sans text-[15px] font-normal">{topNav.Shop_by}</p>

        <div>
          {[
            { title: topNav.Line, items: [topNav.Alive, topNav.Dank, topNav.Sweet, topNav.Classic] },
            { title: topNav.Mood, items: [topNav.Active, topNav.Relaxed] },
            { title: topNav.Mood, items: [topNav.Sample_packs] },
          ].map((section, index) => (
            <div
              key={index}
              className={`flex items-start justify-between gap-4 border-b-[1px] border-gray-300 ${
                index === 0 ? 'border-t-[1px]' : ''
              } py-2`}
            >
              <div className="flex flex-col items-start justify-between">
                {section.items.map((name, idx) => (
                  <Link
                    key={idx}
                    href="/"
                    className="text-umbra-100 hover:text-umbra-40 mx-[5px] font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              <button className="rounded-sm border border-gray-300 px-3 py-[2px]">{section.title}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavRight;
