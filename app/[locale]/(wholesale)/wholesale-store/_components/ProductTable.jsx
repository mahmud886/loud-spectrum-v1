'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';
import { toast } from 'sonner';

const ProductTable = ({ products = [], lines, onSelect, onQtyChange, loading = false, pageSize = 4, t }) => {
  const [quantities, setQuantities] = useState({});

  console.log('products:', products);

  const updateQuantity = (idx, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [idx]: Math.max(5, (prev[idx] || 5) + delta),
    }));
  };

  const handleQuantityChange = (idx, value) => {
    const numValue = parseInt(value) || 5;
    const validQuantity = Math.max(5, Math.min(1000, numValue)); // Min 5, Max 1000
    setQuantities((prev) => ({
      ...prev,
      [idx]: validQuantity,
    }));
  };

  const handleSelect = (product, idx) => {
    const quantity = quantities[idx] || 5;
    const cartItem = {
      name: product?.name || 'Product',
      line: product?.line || 'Classic',
      qty: quantity,
      price: 3,
      lot: product?.lot_number || product?.sku || '1001',
    };

    toast.success(`${product?.name || 'Product'} (${quantity}ml) added to cart!`);
    onSelect?.(cartItem);
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white">
      <Table className="min-w-[620px] text-[12px] sm:text-[13px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[96px] px-3">{t('tableHeaders.lot')}</TableHead>
            <TableHead className="px-3">{t('tableHeaders.productName')}</TableHead>
            <TableHead className="w-[96px] px-3">{t('tableHeaders.source')}</TableHead>
            <TableHead className="w-[120px] px-3">{t('tableHeaders.line')}</TableHead>
            <TableHead className="w-[120px] px-3">{t('tableHeaders.totalMl')}</TableHead>
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
                  {p?.line ? (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-2 py-1.5 text-[12px] text-gray-700">
                      {p.line}
                    </div>
                  ) : (
                    <select className="w-full rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-[12px]">
                      {lines.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  )}
                </TableCell>
                <TableCell className="px-3">
                  <div className="flex items-center gap-2">
                    <button
                      className="h-7 w-7 rounded-full border border-gray-200 hover:bg-gray-50"
                      onClick={() => updateQuantity(idx, -5)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="5"
                      max="1000"
                      step="5"
                      value={quantities[idx] || 5}
                      onChange={(e) => handleQuantityChange(idx, e.target.value)}
                      className="w-16 rounded border border-gray-200 px-2 py-1 text-center text-[12px] outline-none focus:border-gray-400"
                    />
                    <button
                      className="h-7 w-7 rounded-full border border-gray-200 hover:bg-gray-50"
                      onClick={() => updateQuantity(idx, 5)}
                    >
                      +
                    </button>
                  </div>
                </TableCell>
                <TableCell className="px-3">
                  <button
                    className="rounded-full bg-gray-900 px-3 py-1.5 text-white hover:bg-gray-800"
                    onClick={() => handleSelect(p, idx)}
                  >
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
