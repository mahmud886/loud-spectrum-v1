'use client';

const MobileCart = ({ cart, updateCartItemQty, setCart, t }) => {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-4">
        <div className="mb-3 text-[16px] font-semibold text-gray-900">{t('cart.title')}</div>
        <div className="divide-y divide-gray-100">
          {cart.map((item, i) => (
            <div key={i} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <div className="truncate text-[12px] text-gray-900">
                  {item.line} - {item.name} - {item.qty}gm
                </div>
                {i === 1 && (
                  <div className="mt-1 text-[12px] text-indigo-600">
                    Description: This flavor will be strong and fruity
                  </div>
                )}
              </div>
              <div className="flex items-center gap-3">
                <button className="text-gray-400" onClick={() => updateCartItemQty(i, -5)}>
                  -
                </button>
                <button className="text-gray-400" onClick={() => updateCartItemQty(i, 5)}>
                  +
                </button>
                <button className="text-gray-400" onClick={() => setCart((prev) => prev.filter((_, idx) => idx !== i))}>
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button className="w-full rounded-full bg-gray-100 px-5 py-2.5 text-[12px] text-gray-900 hover:bg-gray-200">
            {t('cart.calculatePrice')}
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between text-[14px]">
          <span className="text-gray-900">{t('cart.totalAmount')}</span>
          <span className="text-gray-800">$82.00</span>
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

export default MobileCart;
