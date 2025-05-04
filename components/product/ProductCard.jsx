'use client';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ProductBuyDialog from '@/components/product/ProductBuyDialog';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';

const ProductCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBuyNowClick = () => {
    console.log('BuyNowClick');
    setIsDialogOpen(true);
  };

  const t = useTranslations('TerpeneShop.ProductCard');

  const pathname = usePathname();
  const cleanPath = pathname.replace(/^\/(en|fr|de|es|jp|ru)/, '').replace(/\/$/, '');

  const isShopPage =
    cleanPath.startsWith('/shop') || cleanPath.startsWith('/try-sample-pack') || cleanPath.startsWith('/account');

  return (
    <>
      <motion.div initial="rest" whileHover="hover" animate="rest" className="cursor-pointer">
        <motion.div
          transition={{ duration: 0.3 }}
          className="relative flex h-[408px] w-full min-w-[162px] flex-col justify-around border bg-[#F0F0F0] p-2.5 md:h-[372px] md:w-[305px]"
        >
          {/* Image Section */}
          <Link href={`/shop/1`} className="flex items-center justify-center overflow-hidden md:mt-16">
            <motion.div
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.1 },
              }}
              transition={{ duration: 0.4 }}
            >
              <Image
                className="h-[320px] w-auto object-cover md:h-[254px] md:w-[174px]"
                src="/assets/images/products/mother.png"
                alt="Product"
                width={411}
                height={548}
                priority={true}
              />
            </motion.div>
          </Link>

          {/* Tag Button (Hidden on mobile) */}
          <div className="ml- hidden md:block">
            <button className="border-umbra-100 rounded-[3px] border px-2 text-[9px] font-normal">{t('tag')}</button>
          </div>

          {/* Buy Now Button (Mobile - at the bottom) */}
          <div className="mt-auto mb-2 md:mb-0 md:hidden">
            <button
              className="main-button-black w-full rounded-full px-6 py-3 opacity-100 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
              onClick={handleBuyNowClick}
            >
              {t('buyNow')}
            </button>
          </div>

          {/* Buy Now Button (Desktop - top-right) */}
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
          <h2 className={clsx('text-[22px] font-normal', isShopPage ? 'text-black' : 'text-white-100')}>Mango OG</h2>
          <p className={clsx('text-[19px]', isShopPage ? 'text-umbra-40' : 'text-white-40')}>$10.00 – $2,999.00</p>
        </div>
      </motion.div>

      {/* ProductBuyDialog */}
      {isDialogOpen && <ProductBuyDialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)} />}
    </>
  );
};

export default ProductCard;
