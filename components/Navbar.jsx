import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Navbar = () => {
  const t = useTranslations('');
  return (
    <nav className="fixed top-0 left-0 z-20 w-full bg-transparent text-white">
      <div className="mx-auto flex items-center justify-between px-[80px] py-4">
        <Image src="/assets/svgs/logos/logo-light.svg" alt="Logo" width={221} height={36} />
        <div className="flex items-center gap-[30px]">
          <button className="mx-[5px] font-sans text-[17px] font-normal hover:underline">{t('Log_in')}</button>
          <button className="mx-[5px] font-sans text-[17px] font-normal hover:underline">
            {t('Cart')} <span className="text-white/60">(0)</span>
          </button>
          <div className="cursor-pointer">
            <PlusIcon width={20} height={20} color="white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
