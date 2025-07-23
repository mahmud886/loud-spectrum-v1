'use client';

import { getProductPriceRange } from '@/helpers/get-product-price-ranges';
import { encodeCategoryForUrl } from '@/helpers/url-category-utils';
import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SearchProductCard = ({ product, onOpenChange }) => {
  const { min, max } = getProductPriceRange(product?.subProducts);
  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|fr|de|es|ja|ru)/, '').replace(/\/$/, '');
  const isShopPage = cleanPath.startsWith('/shop') || cleanPath.startsWith('/try-sample-pack');

  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="cursor-pointer">
      <Link
        href={`/shop/${encodeCategoryForUrl(product?.category_name)}/${product.slug}`}
        className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F5F5F5] p-2.5 md:h-[384px] md:min-h-[384px] md:w-[305px] md:min-w-[305px]"
        onClick={() => onOpenChange?.(false)}
      >
        {/* Image Section */}
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 },
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center overflow-hidden md:mt-16"
        >
          <Image
            className="h-[150px] w-auto object-cover md:h-[254px] md:w-[174px]"
            src={
              product?.image
                ? `${process.env.NEXT_PUBLIC_API_URL}/public${product.image}`
                : '/assets/images/products/mother.png'
            }
            alt="Product"
            width={256}
            height={256}
          />
        </motion.div>

        {/* Tag Button (Hidden on mobile) */}
        <div className="ml-3 hidden md:block">
          <button
            className="border-umbra-100 rounded-[3px] border px-2 text-[9px] font-normal"
            type="button"
            tabIndex={-1}
          >
            {product?.category?.name}
          </button>
        </div>
      </Link>
      {/* Product Title and Price */}
      <div className="mt-[15px]">
        <h2 className={clsx('text-[18px] font-normal text-black md:text-[22px]')}>{product.name}</h2>
        <p className={clsx('text-umbra-40 text-[15px] md:text-[19px]')}>
          {min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`}
        </p>
      </div>
    </motion.div>
  );
};

export default SearchProductCard;
