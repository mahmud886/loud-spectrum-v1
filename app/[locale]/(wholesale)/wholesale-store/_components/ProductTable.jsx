'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ProductTable = ({ products = [], lines, onSelect, onQtyChange, loading = false, pageSize = 4, t }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <Table className="min-w-[620px] text-[12px] sm:text-[13px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[96px] px-3">{t('tableHeaders.lot')}</TableHead>
            <TableHead className="px-3">{t('tableHeaders.productName')}</TableHead>
            <TableHead className="w-[96px] px-3">{t('tableHeaders.source')}</TableHead>
            <TableHead className="w-[120px] px-3">{t('tableHeaders.line')}</TableHead>
            <TableHead className="w-[120px] px-3">{t('tableHeaders.totalGrams')}</TableHead>
            <TableHead className="w-[96px] px-3">{t('tableHeaders.action')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading &&
            Array.from({ length: pageSize }).map((_, i) => (
              <TableRow key={`shimmer-${i}`}>
                <TableCell className="px-3">
                  <Skeleton className="h-4 w-14" />
                </TableCell>
                <TableCell className="px-3">
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell className="px-3">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="px-3">
                  <Skeleton className="h-8 w-24 rounded-md" />
                </TableCell>
                <TableCell className="px-3">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-7 w-7 rounded-full" />
                    <Skeleton className="h-4 w-6" />
                    <Skeleton className="h-7 w-7 rounded-full" />
                  </div>
                </TableCell>
                <TableCell className="px-3">
                  <Skeleton className="h-8 w-16 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          {!loading &&
            products.map((p, idx) => (
              <TableRow key={p._id || idx}>
                <TableCell className="px-3 text-gray-700">{p?.sku || '1001'}</TableCell>
                <TableCell className="px-3 text-gray-900">{p?.name || 'Product'}</TableCell>
                <TableCell className="px-3 text-gray-700">{p?.source || 'Custom'}</TableCell>
                <TableCell className="px-3">
                  <select className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[12px]">
                    {lines.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </TableCell>
                <TableCell className="px-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-7 w-7 rounded-full border border-gray-200"
                      onClick={() => onQtyChange?.(idx, -5)}
                    >
                      -
                    </button>
                    <span>05</span>
                    <button
                      className="h-7 w-7 rounded-full border border-gray-200"
                      onClick={() => onQtyChange?.(idx, 5)}
                    >
                      +
                    </button>
                  </div>
                </TableCell>
                <TableCell className="px-3">
                  <button className="rounded-full bg-gray-900 px-3 py-1.5 text-white" onClick={() => onSelect?.(p)}>
                    {t('customOrderForm.select')}
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
