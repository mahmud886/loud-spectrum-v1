'use client';

import ProductBuyDialog from '@/components/product/ProductBuyDialog';
import DiscountPriceDisplay from '@/components/ui/DiscountPriceDisplay';
import { getCategoryColorClasses } from '@/helpers/get-category-color-classes';
import { getProductPriceRange } from '@/helpers/get-product-price-ranges';
import { encodeCategoryForUrl } from '@/helpers/url-category-utils';
import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const ProductGridCard = ({ product }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { min, max } = getProductPriceRange(product?.subProducts);

  const handleBuyNowClick = () => {
    setIsDialogOpen(true);
  };

  const t = useTranslations('TerpeneShop.ProductCard');

  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|fr|de|es|ja|ru)/, '').replace(/\/$/, '');
  const isShopPage = cleanPath.startsWith('/shop') || cleanPath.startsWith('/try-sample-pack');

  return (
    <>
      <motion.div initial="rest" whileHover="hover" animate="rest" className="cursor-pointer">
        <motion.div
          transition={{ duration: 0.3 }}
          className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F5F5F5] p-2.5 xl:h-[384px] xl:min-h-[384px] xl:w-[305px] xl:min-w-[305px]"
        >
          {/* Image Section */}
          <Link
            href={`/shop/${encodeCategoryForUrl(product?.category_name)}/${product.slug}`}
            className="flex items-center justify-center overflow-hidden xl:mt-16"
          >
            <motion.div
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.1 },
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                className="h-[150px] w-auto object-cover xl:h-[254px] xl:w-[174px]"
                // src="/assets/images/products/mother.png"
                src={
                  product?.image
                    ? `${process.env.NEXT_PUBLIC_API_URL}/public${product.image}`
                    : '/assets/images/products/mother.png'
                }
                alt="Product"
                width={256}
                height={256}
                // Remove priority={true} - only use for above-the-fold images
              />
            </motion.div>
          </Link>

          {/* Tag Button (Hidden on mobile) */}
          <div className="ml-3 hidden xl:block">
            <button
              className={`${getCategoryColorClasses(product?.category?.name)} rounded-[3px] border-1 px-2 text-[12px] font-normal capitalize`}
            >
              {product?.category?.name}
            </button>
          </div>

          {/* Buy Now Button (Mobile) */}
          <div className="mt-auto xl:hidden">
            <button
              className="main-button-black w-full rounded-full px-3 py-2.5 opacity-100 transition-opacity duration-200 ease-in-out"
              onClick={handleBuyNowClick}
            >
              {t('buyNow')}
            </button>
          </div>

          {/* Buy Now Button (Desktop) */}
          <motion.div
            variants={{
              rest: { opacity: 0, y: -10 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.4 }}
            className="absolute top-5 right-5 hidden xl:flex xl:justify-end"
          >
            <button className="main-button-black w-auto rounded-full px-6 py-2" onClick={handleBuyNowClick}>
              {t('buyNow')}
            </button>
          </motion.div>
        </motion.div>

        {/* Product Title and Price */}
        <div className="mt-[15px]">
          <h2 className={clsx('text-[18px] font-normal xl:text-[22px]', isShopPage ? 'text-black' : 'text-white-100')}>
            {product.name}
          </h2>

          {/* Price Display with Discount */}
          <DiscountPriceDisplay
            category={product?.category}
            minPrice={min}
            maxPrice={max}
            originalPriceClass={clsx(
              'text-[13px] xl:text-[19px] line-through opacity-60',
              isShopPage ? 'text-umbra-40' : 'text-white-40',
            )}
            // discountedPriceClass={clsx(
            //   'text-[13px] xl:text-[19px] font-normal',
            //   getCategoryTextClasses(product?.category?.name),
            // )}
            discountedPriceClass={clsx('text-[13px] xl:text-[19px] font-normal', 'text-umbra-100')}
            regularPriceClass={clsx('text-[13px] xl:text-[19px]', isShopPage ? 'text-umbra-40' : 'text-white-40')}
            discountTextClass={clsx('text-[8px] xl:text-xs font-bold', 'text-umbra-100')}
            containerClass="flex flex-col gap-1"
            showOriginalPrice={true}
            showDiscountText={true}
          />
        </div>
      </motion.div>

      {/* ProductBuyDialog */}
      {isDialogOpen && (
        <ProductBuyDialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)} product={product} />
      )}
    </>
  );
};

export default ProductGridCard;
