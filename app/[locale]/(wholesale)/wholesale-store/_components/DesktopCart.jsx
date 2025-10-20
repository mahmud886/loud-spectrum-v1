'use client';

import { calculateCartTotal, formatPrice } from '@/helpers/wholesale-product-price-calculations';
import { toast } from 'sonner';

const DesktopCart = ({ cart, updateCartItemQty, setCart, t }) => {
  const calculation = calculateCartTotal(cart);

  console.log('calculation:', calculation);

  const handleCalculatePrice = () => {
    if (calculation.totalItems === 0) {
      toast.error('Cart is empty');
      return;
    }

    // Show detailed calculation in toast
    const itemDetails = calculation.items
      .map((item) => `${item.name} (${item.qty}ml): ${formatPrice(item.itemTotal)}`)
      .join('\n');

    toast.success(`Total: ${formatPrice(calculation.subtotal)}\n\n${itemDetails}`, {
      duration: 5000,
    });
  };

  return (
    <div className="hidden xl:block">
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="mb-3 text-[15px] font-semibold text-gray-900 sm:text-[16px]">{t('cart.title')}</div>
        {cart.length === 0 ? (
          <div className="py-8 text-center text-[12px] text-gray-500 sm:text-[13px]">
            {t('cart.empty') || 'No items in cart'}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {cart.map((item, i) => (
              <div key={i} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <div className="truncate text-[12px] text-gray-900 sm:text-[13px]">
                    {item.line} - {item.name} - {item.qty}ml
                  </div>
                  {/* {i === 1 && (
                    <div className="mt-1 text-[12px] text-indigo-600">
                      Description: This flavor will be strong and fruity
                    </div>
                  )} */}
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      updateCartItemQty(i, -5);
                      toast.success(`Quantity updated for ${item.name}`);
                    }}
                  >
                    -
                  </button>
                  <button
                    className="flex h-4 w-4 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    onClick={() => {
                      updateCartItemQty(i, 5);
                      toast.success(`Quantity updated for ${item.name}`);
                    }}
                  >
                    +
                  </button>
                  <button
                    className="flex h-4 w-4 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-600 hover:border-red-300 hover:bg-red-100"
                    onClick={() => {
                      setCart((prev) => prev.filter((_, idx) => idx !== i));
                      toast.success(`${item.name} removed from cart`);
                    }}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4">
          <button
            className="w-full rounded-full bg-gray-100 px-5 py-2.5 text-[12px] text-gray-900 hover:bg-gray-200 sm:text-[13px]"
            onClick={handleCalculatePrice}
          >
            {t('cart.calculatePrice')}
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between text-[14px]">
          <span className="text-gray-900">{t('cart.totalAmount')}</span>
          <span className="text-gray-800">{formatPrice(calculation.subtotal)}</span>
        </div>
        <div className="mt-4">
          <button className="w-full rounded-full bg-gray-900 px-5 py-3 text-[14px] text-white">
            {t('cart.addToCart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesktopCart;
