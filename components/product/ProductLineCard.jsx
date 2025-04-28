'use client';

import ArrowRight from '@/components/svgs/arrow-right';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const ProductLineCard = ({ productVariant = 'Default' }) => {
  const t = useTranslations();

  const variantClasses = {
    Alive: 'bg-alive border-alive',
    Sweet: 'bg-sweet border-sweet',
    Classic: 'bg-classic border-classic',
    Dank: 'bg-dank border-dank',
    Default: 'bg-gray-500 border-gray-500',
  };

  const bgClass = variantClasses[productVariant]?.split(' ')[0] || variantClasses.Default.split(' ')[0];
  const borderClass = variantClasses[productVariant]?.split(' ')[1] || variantClasses.Default.split(' ')[1];

  return (
    <div className="group cursor-pointer">
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className={cn(
          'border-umbra-10 md:h-h-[408px] relative h-[400px] w-full overflow-hidden border bg-[#F0F0F0] p-5 transition-colors duration-500 ease-in-out md:w-full lg:h-[408px] lg:w-full xl:h-[408px]',
          'group-hover:border-transparent',
          `group-hover:${borderClass}`,
        )}
      >
        {/* Background Color Slide Up */}
        <motion.div
          variants={{
            rest: { y: '100%' },
            hover: { y: '0%' },
          }}
          transition={{ duration: 0.2 }}
          className={cn('absolute inset-0 transform transition-transform', bgClass)}
        />

        {/* Top Button */}
        <div className="relative z-20 flex justify-center md:justify-end lg:justify-end">
          <motion.button
            variants={{
              rest: { opacity: 1 },
              hover: { opacity: 1 },
            }}
            transition={{ duration: 0.2 }}
            className="outline-button-white border-umbra-10 group-hover:border-white-100 relative h-[44px] w-full cursor-pointer overflow-hidden rounded-full border px-6 py-3 opacity-100 transition-all duration-200 ease-in-out group-hover:text-white md:h-[37px] md:max-w-1/2 md:min-w-[150px] lg:h-[37px] lg:max-w-1/2 lg:min-w-[150px]"
          >
            <motion.span
              variants={{
                rest: { opacity: 1 },
                hover: { opacity: 0 },
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              {t('buttons.shopTheLine')} <ArrowRight />
            </motion.span>
            <motion.span
              variants={{
                rest: { opacity: 0 },
                hover: { opacity: 1 },
              }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-2"
            >
              {t('buttons.wholesale')} <ArrowRight />
            </motion.span>
          </motion.button>
        </div>

        {/* Product Image */}
        <motion.div
          variants={{
            rest: { opacity: 1, scale: 1 },
            hover: { opacity: 0, scale: 0.5 },
          }}
          transition={{ duration: 0.4 }}
          className="relative z-10 my-4 flex items-center justify-center overflow-hidden"
        >
          <Image
            className="h-[250px] w-[161px] object-cover md:h-[282px] md:w-[211px] lg:h-[282px] lg:w-[211px]"
            src="/assets/images/products/product-line-1.png"
            alt="Product"
            width={422}
            height={565}
            priority
          />
        </motion.div>

        {/* Hover Description */}
        <motion.div
          variants={{
            rest: { y: '100%', opacity: 0 },
            hover: { y: '0%', opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-[66px] left-5 z-20 w-[60%]"
        >
          <p className="mb-2 text-[14px] font-normal text-white">{t(`descriptions.${productVariant}.line1`)}</p>
          <p className="text-[14px] font-normal text-white">{t(`descriptions.${productVariant}.line2`)}</p>
        </motion.div>

        {/* Rotated Variant Label */}
        <motion.div
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          className="absolute right-5 bottom-5 z-20 w-[70px]"
        >
          <p className="rotate-[-90deg] text-[70px] leading-none font-bold text-white">
            {t(`productVariants.${productVariant}`, { default: productVariant })}
          </p>
        </motion.div>

        {/* Bottom Left Button */}
        <motion.div
          variants={{
            rest: { opacity: 1 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-5 left-5 z-20"
        >
          <button className="border-umbra-100 text-umbra-100 relative z-[100px] min-w-[114px] rounded-[3px] border px-2 py-[2px] text-[12px] font-normal transition-all duration-200 ease-in-out group-hover:border-white group-hover:text-white">
            {t('buttons.cannabisDerived')}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProductLineCard;
