'use client';
import { getCurrentMonth } from '@/helpers/get-current-month';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const TopNavLeft = () => {
  const t = useTranslations('Navbar.TopNav');

  return (
    <div className="space-y-12">
      <div>
        <Link href={`/`}>
          <Image src="/assets/svgs/logos/logo-dark.svg" alt="Logo" width={221} height={36} />
        </Link>
      </div>
      <div className="flex h-full flex-col items-start justify-between gap-4">
        <div>
          <Image
            src="/assets/images/sweet_bottle.png"
            alt="Product Highlight"
            width={300}
            height={206}
            className="h-[206px] w-[300px]"
          />
          <div className="mt-2 flex items-center justify-between">
            <p className="text-umbra-100 font-sans text-[13px] font-normal">Sweet Blue Razz</p>
            <p className="text-umbra-40 font-sans text-[13px] font-normal">
              {t('productOfMonth', {
                month: getCurrentMonth(),
                defaultValue: `Product of ${getCurrentMonth()}`,
              })}
            </p>
          </div>
        </div>
        {/* <div className="group relative mt-4 w-full">
          <input
            type="text"
            placeholder="Search products"
            className="border-umbra-20 group-hover:text-umbra-100 text-umbra-100 placeholder-text-umbra-20 w-full border-b bg-transparent py-5 pr-10 text-sm transition duration-300 focus:outline-none"
          />
          <div className="border-umbra-5/10 bg-umbra-5 text-umbra-10 group-hover:border-umbra-10 group-hover:bg-umbra-10 group-hover:text-umbra-100 absolute top-1/2 right-0 -translate-y-1/2 rounded-full border p-3 transition duration-300">
            <Search width={13} height={13} color="currentColor" />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default TopNavLeft;
