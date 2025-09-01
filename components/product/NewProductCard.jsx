'use client';

// import ProductBuyDialog from '@/components/product/ProductBuyDialog';
import DiscountPriceDisplay from '@/components/ui/DiscountPriceDisplay';
import { getTranslatedCategoryName } from '@/helpers/dynamic-translations';
import { getProductPriceRange } from '@/helpers/get-product-price-ranges';
import { encodeCategoryForUrl } from '@/helpers/url-category-utils';
import { Link } from '@/i18n/navigation';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
// import { useState } from 'react';

const NewProductCard = ({ product }) => {
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { min, max } = getProductPriceRange(product?.subProducts);

  // const handleBuyNowClick = () => {
  //   setIsDialogOpen(true);
  // };

  const t = useTranslations('TerpeneShop.ProductCard');
  const tCategories = useTranslations('ProductCategories');

  // Get translated category name using utility function
  const categoryDisplayName = getTranslatedCategoryName(tCategories, t, product?.category, 'tag');

  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|fr|de|es|ja|ru)/, '').replace(/\/$/, '');

  const isShopPage =
    cleanPath.startsWith('/shop') || cleanPath.startsWith('/try-sample-pack') || cleanPath.startsWith('/account');

  return (
    <>
      <motion.div initial="rest" whileHover="hover" animate="rest" className="cursor-pointer">
        <motion.div
          transition={{ duration: 0.3 }}
          className="relative flex h-[408px] w-full min-w-[162px] flex-col justify-around border bg-[#F5F5F5] p-2.5 xl:h-[372px] xl:w-auto"
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
                className="h-[320px] w-auto object-cover xl:h-[254px] xl:w-[174px]"
                src={
                  product?.image
                    ? `${process.env.NEXT_PUBLIC_API_URL}/public${product.image}`
                    : '/assets/images/products/mother.png'
                }
                alt="Product"
                width={411}
                height={548}
                priority={true}
              />
            </motion.div>
          </Link>

          {/* Tag Button (Hidden on mobile) */}
          <div className="ml- hidden xl:block">
            <button className="border-umbra-100 rounded-[3px] border px-2 text-[9px] font-normal">
              {categoryDisplayName}
            </button>
          </div>

          {/* Buy Now Button (Mobile - at the bottom) - COMMENTED OUT */}
          {/* <div className="mt-auto mb-2 xl:mb-0 xl:hidden">
            <button
              className="main-button-black w-full rounded-full px-6 py-3 opacity-100 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
              onClick={handleBuyNowClick}
            >
              {t('buyNow')}
            </button>
          </div> */}

          {/* Buy Now Button (Desktop - top-right) - COMMENTED OUT */}
          {/* <motion.div
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
          </motion.div> */}
        </motion.div>

        {/* Product Title and Price */}
        <div className="mt-[15px]">
          <h2 className={clsx('text-[22px] font-normal', isShopPage ? 'text-black' : 'text-white-100')}>
            {product?.name}
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
            // discountTextClass={clsx('text-[8px] xl:text-xs font-bold', getCategoryTextClasses(product?.category?.name))}
            discountTextClass={clsx('text-[8px] xl:text-xs font-bold', 'text-umbra-100')}
            containerClass="flex flex-col gap-1"
            showOriginalPrice={true}
            showDiscountText={true}
          />
        </div>
      </motion.div>

      {/* ProductBuyDialog - COMMENTED OUT */}
      {/* {isDialogOpen && (
        <ProductBuyDialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)} product={product} />
      )} */}
    </>
  );
};

export default NewProductCard;
