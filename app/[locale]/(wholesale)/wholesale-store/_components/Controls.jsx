'use client';

const Controls = ({ search, setSearch, lineFilter, setLineFilter, t }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex w-full items-center gap-3">
        <div className="relative w-1/2 flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 pl-9 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
            placeholder={t('searchPlaceholder')}
          />
          <span className="pointer-events-none absolute top-2.5 left-3 text-gray-400">🔎</span>
        </div>
        <div className="w-[30%] min-w-[120px]">
          <select
            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] focus:border-gray-400 sm:text-[13px]"
            value={lineFilter}
            onChange={(e) => setLineFilter(e.target.value)}
          >
            <option value="all">{t('filterAll')}</option>
            <option value="custom">{t('filterCustom')}</option>
            <option value="in-store">{t('filterInStore')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Controls;
