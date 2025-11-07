'use client';
import { removeFromCart, updateQuantity } from '@/lib/store/slices/cartSlice';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const t = useTranslations('OrderConfirmation');
  return (
    <div
      className={`flex items-center gap-2 rounded-md border-1 py-2.5 pr-5 pl-2.5 md:gap-4 ${
        item?.isRegular ? 'border-alive/50' : item?.isWholesale ? 'border-red-100' : 'border-umbra-10'
      }`}
    >
      <Image
        src={
          item?.image
            ? `${process.env.NEXT_PUBLIC_API_URL}/public${item.image}`
            : '/assets/images/default-cartItems.jpg'
        }
        alt={item?.name}
        width={96}
        height={96}
        className="h-[80px] w-[60px] rounded object-cover sm:h-[100px] sm:w-[80px] xl:h-[100px] xl:w-[100px]"
      />
      <div className="flex w-full flex-col justify-between gap-2">
        <div className="flex flex-col items-start justify-between gap-1">
          <h6 className="text-umbra-100 font-sans text-[18px] leading-[120%] font-normal">{item.name}</h6>
          <div className="flex items-center gap-2">
            <p className="bg-umbra-5 text-umbra-100 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal">
              {item?.selectedVolume}
            </p>
            {item?.isRegular && (
              <p className="text-umbra-100 bg-alive/50 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal capitalize">
                {t('fields.typeRegular')}
              </p>
            )}
            {item?.isWholesale && (
              <p className="text-umbra-100 rounded-[10px] bg-red-100 px-2 py-1 font-sans text-[10px] leading-[120%] font-normal whitespace-nowrap capitalize">
                {t('fields.typeWholesale')}
              </p>
            )}
            {item?.flavor && (
              <p className="text-umbra-100 bg-dank/10 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal whitespace-nowrap capitalize">
                {item?.flavor}
              </p>
            )}
            {item?.category_name && (
              <p className="text-umbra-100 bg-dank/30 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal whitespace-nowrap capitalize">
                {item?.category_name}
              </p>
            )}
          </div>
          {item?.remarks && (
            <div className="space-y-1">
              {item.remarks.includes(',') ? (
                // Multiple items - split by comma
                item.remarks.split(',').map((remark, index) => (
                  <p
                    key={index}
                    className="text-umbra-100 bg-classic/10 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal whitespace-nowrap capitalize"
                  >
                    {remark.trim()}
                  </p>
                ))
              ) : (
                // Single item - display as is
                <p className="text-umbra-100 bg-classic/10 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal whitespace-nowrap capitalize">
                  {item.remarks}
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex w-full items-end justify-between gap-5">
          <div className="mt-2 flex items-center gap-2">
            {/* Quantity Control */}
            <div
              className={`bg-umbra-5 inline-flex overflow-hidden rounded-full ${item?.isWholesale ? 'opacity-50' : ''}`}
            >
              {/* Minus Button */}
              <button
                className={`group text-umbra-100 hover:text-white-100 flex items-center justify-center px-2 py-1 text-[12px] leading-[120%] font-normal transition hover:bg-red-500 sm:text-[14px] md:text-[16px] md:font-medium ${
                  item?.isWholesale ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={item?.isWholesale}
                onClick={() => {
                  if (!item?.isWholesale) {
                    dispatch(
                      updateQuantity({
                        id: item.originalId,
                        selectedVolume: item.selectedVolume,
                        quantity: item.quantity - 1,
                        flavor: item.flavor,
                      }),
                    );
                  }
                }}
              >
                <MinusIcon size={14} className="text-umbra-100 group-hover:text-white-100 transition sm:size-4" />
              </button>

              {/* Quantity */}
              <div className="text-umbra-100 flex items-center justify-center px-2 py-1 text-[12px] leading-[120%] font-normal sm:text-[14px] md:px-3 md:text-[16px] md:font-medium">
                {item.quantity}
              </div>

              {/* Plus Button */}
              <button
                className={`group text-umbra-100 hover:text-white-100 hover:bg-alive flex items-center justify-center px-2 py-1 text-[12px] leading-[120%] font-normal transition sm:text-[14px] md:text-[16px] md:font-medium ${
                  item?.isWholesale ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                disabled={item?.isWholesale}
                onClick={() => {
                  if (!item?.isWholesale) {
                    dispatch(
                      updateQuantity({
                        id: item.originalId,
                        selectedVolume: item.selectedVolume,
                        quantity: item.quantity + 1,
                        flavor: item.flavor,
                      }),
                    );
                  }
                }}
              >
                <PlusIcon size={14} className="text-umbra-100 group-hover:text-white-100 transition sm:size-4" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              className="group text-umbra-100 hover:text-white-100 bg-umbra-5 flex cursor-pointer items-center justify-center rounded-full p-1.5 text-[12px] leading-[120%] font-normal transition hover:bg-red-500 sm:p-2 sm:text-[14px] md:text-[16px] md:font-medium"
              onClick={() =>
                dispatch(
                  removeFromCart({
                    id: item.originalId,
                    selectedVolume: item.selectedVolume,
                    flavor: item.flavor,
                  }),
                )
              }
            >
              <TrashIcon size={14} className="text-umbra-100 group-hover:text-white-100 transition sm:size-4" />
            </button>
          </div>
          <div>
            <p className="text-umbra-100 font-sans text-[18px] leading-[120%] font-normal sm:text-[18px]">
              ${item?.totalPrice?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
