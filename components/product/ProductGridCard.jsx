'use client';

import ProductBuyDialog from '@/components/product/ProductBuyDialog';
import { getProductPriceRange } from '@/helpers/get-product-price-ranges';
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
  const cleanPath = pathname.replace(/^\/(en|fr|de|es|jp|ru)/, '').replace(/\/$/, '');
  const isShopPage = cleanPath.startsWith('/shop') || cleanPath.startsWith('/try-sample-pack');

  return (
    <>
      <motion.div initial="rest" whileHover="hover" animate="rest" className="cursor-pointer">
        <motion.div
          transition={{ duration: 0.3 }}
          className="relative flex h-[220px] min-h-[220px] w-full min-w-[162px] flex-col justify-around border bg-[#F0F0F0] p-2.5 md:h-[384px] md:min-h-[384px] md:w-[305px] md:min-w-[305px]"
        >
          {/* Image Section */}
          <Link href={`/shop/${product.slug}`} className="flex items-center justify-center overflow-hidden md:mt-16">
            <motion.div
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.1 },
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                className="h-[150px] w-auto object-cover md:h-[254px] md:w-[174px]"
                src="/assets/images/products/mother.png"
                alt="Product"
                width={411}
                height={548}
                priority={true}
              />
            </motion.div>
          </Link>

          {/* Tag Button (Hidden on mobile) */}
          <div className="ml-3 hidden md:block">
            <button className="border-umbra-100 rounded-[3px] border px-2 text-[9px] font-normal">
              {product?.category?.name}
            </button>
          </div>

          {/* Buy Now Button (Mobile) */}
          <div className="mt-auto md:hidden">
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
            className="absolute top-5 right-5 hidden md:flex md:justify-end"
          >
            <button className="main-button-black w-auto rounded-full px-6 py-2" onClick={handleBuyNowClick}>
              {t('buyNow')}
            </button>
          </motion.div>
        </motion.div>

        {/* Product Title and Price */}
        <div className="mt-[15px]">
          <h2 className={clsx('text-[18px] font-normal md:text-[22px]', isShopPage ? 'text-black' : 'text-white-100')}>
            {product.name}
          </h2>
          <p className={clsx('text-[15px] md:text-[19px]', isShopPage ? 'text-umbra-40' : 'text-white-40')}>
            {min === max ? `$${min.toFixed(2)}` : `$${min.toFixed(2)} – $${max.toFixed(2)}`}
          </p>
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
