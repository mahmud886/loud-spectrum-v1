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
        className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F5F5F5] p-2.5 md:h-[300px] md:min-h-[300px] md:w-full md:min-w-full"
        onClick={() => onOpenChange?.(false)}
      >
        {/* Image Section */}
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 },
          }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center overflow-hidden"
        >
          <Image
            className="h-[150px] w-auto object-cover md:h-[220px] md:w-[150px]"
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

        {/* Tag Button (Top of image, hidden on mobile) */}
        <div className="absolute top-1 left-2 z-10">
          <button
            className="border-umbra-100 rounded-[3px] border bg-white/90 px-2 text-[8px] font-normal"
            type="button"
            tabIndex={-1}
          >
            {product?.category?.name}
          </button>
        </div>
        {/* Product Title and Price */}
        <div className="absolute bottom-3 left-2 flex flex-col items-start text-left">
          <h2 className={clsx('text-[10px] font-normal text-black md:text-[10px]')}>{product.name}</h2>
          <p className={clsx('text-umbra-40 text-[8px] md:text-[9px]')}>
            {min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default SearchProductCard;
