'use client';

const CustomOrder = ({ lines, t }) => {
  return (
    <aside className="order-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm xl:order-1 xl:p-5">
      <h3 className="mb-4 font-sans text-[15px] font-medium text-gray-900 sm:text-[16px]">{t('customOrder')}</h3>
      {lines.map((line) => (
        <div key={line} className="mb-4 rounded-xl border border-gray-100 p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
          <div className="mb-2 text-[13px] font-semibold text-gray-900 sm:text-[14px]">{line}</div>
          <div className="mb-1 text-[12px] text-gray-500">{t('customOrderForm.pricePerGram')}</div>
          <div className="space-y-2">
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
              placeholder={t('customOrderForm.customFlavor')}
            />
            <input
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
              placeholder={t('customOrderForm.describeFlavor')}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="h-8 w-8 rounded-full border border-gray-200 text-gray-700">-</button>
                <span className="text-[12px] sm:text-[13px]">05</span>
                <button className="h-8 w-8 rounded-full border border-gray-200 text-gray-700">+</button>
              </div>
              <button className="rounded-full bg-gray-900 px-3 py-1.5 text-[12px] text-white">
                {t('customOrderForm.select')}
              </button>
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default CustomOrder;
