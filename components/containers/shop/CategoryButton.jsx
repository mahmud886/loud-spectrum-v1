'use client';

import { encodeCategoryForUrl, getCategoryFromPathname } from '@/helpers/url-category-utils';
import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CategoryButton({ categories, totalCategoryProducts }) {
  const pathname = usePathname();
  const currentCategory = getCategoryFromPathname(pathname);

  const sortedCategories = [
    { name: 'All', _id: 'all', productCount: totalCategoryProducts },
    ...categories
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((category) => ({
        ...category,
        productCount: category.productCount || 0,
      })),
  ];

  return (
    <div className="mx-auto w-full max-w-md space-y-2" role="group" aria-label="Filter Options">
      {sortedCategories.map((category) => {
        const isActive = category.name.toLowerCase() === currentCategory;

        return (
          <div key={category.name}>
            {category?.productCount > 0 && (
              <Link href={`/shop/${encodeCategoryForUrl(category.name)}`} className="block w-full">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={clsx(
                    'group relative flex w-full cursor-pointer items-center justify-between rounded-sm border px-3 py-2 text-white transition',
                    isActive ? 'bg-stardust' : 'bg-white-100',
                  )}
                  aria-pressed={isActive}
                  layout
                >
                  <p className="text-umbra-100 font-mono text-[16px] leading-[140%]">
                    {category?.name} <span className="text-umbra-40 text-[12px]">({category?.productCount})</span>
                  </p>

                  <span
                    className={clsx(
                      'flex h-[9px] w-[9px] items-center justify-center rounded-full border transition-all duration-300',
                      isActive ? 'border-[#0D1117]' : 'border-gray-400',
                    )}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          className="h-[5px] w-[5px] rounded-full bg-[#0D1117]"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
