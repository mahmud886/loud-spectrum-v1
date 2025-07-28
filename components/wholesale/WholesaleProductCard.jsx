'use client';

import WholesaleProductCarousel from '@/components/carousels/WholesaleProductCarousel';
import { addToCart } from '@/lib/store/slices/cartSlice';
import { MinusIcon, PlusIcon, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const WholesaleProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [flavor, setFlavor] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const t = useTranslations('ProductDetails');
  const validateFlavor = (value) => {
    setError(!value.trim());
  };

  const handleAddToCart = () => {
    if (!flavor.trim()) {
      toast.error('Please enter a flavor');
      setError(true);
      return;
    }
    setError(false);
    dispatch(
      addToCart({
        id: product._id,
        product: {
          ...product,
          name: product?.productDetails?.name,
          image: product?.productDetails?.image,
        },
        quantity,
        price: product?.price,
        selectedVolume: '1ml',
        isRegular: false,
        isWholesale: true,
        flavor,
      }),
    );
    setQuantity(1);
    setFlavor('');
  };

  return (
    <div className="bg-white-100 text-umbra-100 border-1 p-5 shadow-sm md:h-auto md:w-full">
      <div className="flex h-full w-full flex-col items-start justify-between gap-5">
        <div className="self-start">
          <div className="space-y-3">
            <div className="mx-auto overflow-hidden md:h-auto md:w-[371px]">
              <WholesaleProductCarousel>
                <Image
                  src={
                    product?.productDetails?.image
                      ? `${process.env.NEXT_PUBLIC_API_URL}/public${product?.productDetails?.image}`
                      : '/assets/images/products/product-line-1.png'
                  }
                  alt="wholesale product"
                  width={371}
                  height={503}
                  className="h-full w-full object-contain"
                />
              </WholesaleProductCarousel>
            </div>
            <div className="flex items-center justify-between gap-5">
              <button className="border-alive text-alive rounded-[3px] border-1 px-2 text-[12px] font-normal">
                {product?.productDetails?.category_name}
              </button>
              <p className="text-umbra-100 inline-flex items-center justify-start gap-2 font-mono text-[14px] leading-[130%] font-normal">
                <span className={'flex items-center justify-start'}>
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                  <Star size={15} fill={'#00000'} />
                </span>{' '}
                6 {t('Reviews')}
              </p>
            </div>
            <div className="space-y-2">
              <h2 className="text-umbra-100 font-sans text-[35px] leading-[120%] font-normal tracking-normal">
                {product?.productDetails?.name}
              </h2>
              <h6 className="text-umbra-100 inline-flex items-center font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                <span className="text-umbra-100 font-sans text-[22px] leading-[130%] font-normal tracking-normal">
                  ${product?.price}
                </span>
                <span className="text-umbra-100 font-sans text-[16px] leading-[130%] font-normal tracking-normal">
                  /ml
                </span>
              </h6>
            </div>
            <div className="space-y-3">
              <p className="text-umbra-40 font-mono text-[16px] leading-[140%] font-normal tracking-normal">
                Mango OG is a strain-specific, organically grown, and botanically derived terpene profile.
              </p>
            </div>
            <div className="space-y-1">
              <div>
                <input
                  id="flavor"
                  type="text"
                  placeholder="e.g., 710Terps"
                  value={flavor}
                  onChange={(e) => {
                    let value = e.target.value;
                    value = value.toLowerCase().replace(/\s+/g, '-');
                    setFlavor(value);
                    validateFlavor(value);
                  }}
                  onBlur={(e) => validateFlavor(e.target.value)}
                  className={`input-field w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                    error ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {error && <p className="mt-1 text-sm text-red-500">Please enter a flavor</p>}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex w-full items-center justify-between gap-5 md:flex-row">
            <div className="flex items-center gap-2">
              <button
                className="border-umbra-40 flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
              >
                <MinusIcon size={14} fill="#C2C2C2" />
              </button>

              <input
                type="number"
                value={quantity}
                min={1}
                max={99}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  if (!isNaN(val) && val >= 1 && val <= 99) {
                    setQuantity(val);
                  }
                }}
                onBlur={() => {
                  if (!quantity || quantity < 1) {
                    setQuantity(1);
                  } else if (quantity > 99) {
                    setQuantity(99);
                  }
                }}
                className="text-umbra-100 h-10 w-[60px] appearance-none text-center font-sans text-[17px] font-normal [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />

              <button
                className="border-umbra-40 bg-white-40/10 flex size-10 cursor-pointer items-center justify-center rounded-full border backdrop-blur-2xl hover:bg-green-100 disabled:cursor-not-allowed"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <PlusIcon size={14} fill="#000000" />
              </button>
            </div>
          </div>

          <button
            className="main-button-black w-full rounded-full px-2 py-2 md:max-w-[132px]"
            onClick={handleAddToCart}
          >
            {t('AddToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WholesaleProductCard;
