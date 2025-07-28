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
        className="relative flex h-[384px] w-full flex-col justify-around overflow-hidden border bg-[#F5F5F5] p-2.5 md:h-[384px] md:w-full"
        onClick={() => onOpenChange?.(false)}
      >
        {/* Image Section */}
        <div className="flex h-full w-full items-center justify-center overflow-hidden">
          <motion.div
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.1 },
            }}
            transition={{ duration: 0.4 }}
            className="z-[1] flex h-full w-full items-center justify-center"
          >
            <Image
              className="h-[280px] w-auto object-contain md:h-[300px] md:w-[280px]"
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
        </div>

        {/* Tag Button (Top of image, hidden on mobile) */}
        <div className="absolute top-2 left-3 z-10 w-full">
          <button
            className="border-umbra-100 rounded-[3px] border bg-white/90 px-2 text-[11px] font-normal md:text-[12px]"
            type="button"
            tabIndex={-1}
          >
            {product?.category?.name}
          </button>
        </div>
        {/* Product Title and Price */}
        <div className="absolute bottom-3 left-3 z-10 flex w-full flex-col items-start bg-[#F5F5F5] text-left">
          <h2 className={clsx('text-[16px] font-normal text-black md:text-[18px]')}>{product.name}</h2>
          <p className={clsx('text-umbra-40 text-[11px] md:text-[12px]')}>
            {min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default SearchProductCard;
