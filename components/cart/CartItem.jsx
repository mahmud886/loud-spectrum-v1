'use client';
import { removeFromCart, updateQuantity } from '@/lib/store/slices/cartSlice';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`flex items-center gap-4 rounded-md border-1 py-2.5 pr-5 pl-2.5 ${
        item?.isRegular ? 'border-alive/50' : item?.isWholesale ? 'border-red-100' : 'border-umbra-10'
      }`}
    >
      <Image
        src={item.image ? `${process.env.NEXT_PUBLIC_API_URL}/public${item.image}` : '/assets/images/cart-item.jpg'}
        alt={item.name}
        width={96}
        height={96}
        className="h-[100px] w-[80px] rounded"
      />
      <div className="flex w-full flex-col justify-between gap-2">
        <div className="flex flex-col items-start justify-between gap-1">
          <h6 className="text-umbra-100 font-sans text-[18px] leading-[120%] font-normal">{item.name}</h6>
          <div className="flex items-center gap-2">
            <p className="bg-umbra-5 text-umbra-100 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal">
              {item.selectedVolume}
            </p>
            {item?.isRegular && (
              <p className="text-umbra-100 bg-alive/50 rounded-[10px] px-2 py-1 font-sans text-[10px] leading-[120%] font-normal capitalize">
                Regular
              </p>
            )}
            {item?.isWholesale && (
              <p className="text-umbra-100 rounded-[10px] bg-red-100 px-2 py-1 font-sans text-[10px] leading-[120%] font-normal whitespace-nowrap capitalize">
                Wholesale
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
                className={`group text-umbra-100 hover:text-white-100 flex items-center justify-center px-2 py-1 transition hover:bg-red-500 ${
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
                <MinusIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
              </button>

              {/* Quantity */}
              <div className="text-umbra-100 flex items-center justify-center px-3 py-1 font-medium">
                {item.quantity}
              </div>

              {/* Plus Button */}
              <button
                className={`group text-umbra-100 hover:text-white-100 hover:bg-alive flex items-center justify-center px-2 py-1 transition ${
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
                <PlusIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
              </button>
            </div>

            {/* Remove Button */}
            <button
              className="group text-umbra-100 hover:text-white-100 bg-umbra-5 flex cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-red-500"
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
              <TrashIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
            </button>
          </div>
          <div>
            <p className="text-umbra-100 font-sans text-[18px] leading-[120%] font-normal">
              ${item?.totalPrice?.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
