'use client';

import ProductPagination from '@/components/containers/shop/ProductPagination';
import { getWholesalerProducts } from '@/services/get-wholesaler-products';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import Controls from './Controls';
import CustomOrder from './CustomOrder';
import DesktopCart from './DesktopCart';
import MobileCart from './MobileCart';
import PageShimmer from './PageShimmer';
import ProductTable from './ProductTable';

const WholesaleStorePage = ({ serverProducts }) => {
  const t = useTranslations('WholesaleStore');
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user?.id) {
        try {
          const response = await getWholesalerProducts(user.id, token);
          console.log('response', response?.data?.wholesalerProducts?.[0]?.products);
          setProducts(response?.data?.wholesalerProducts?.[0]?.products);
        } catch (error) {
          console.error('Error fetching products:', error);
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [user, token]);

  if (!user?.id) {
    return <div className="py-20 text-center">Please log in to view wholesale products</div>;
  }

  const [search, setSearch] = useState('');
  const [lineFilter, setLineFilter] = useState('all');
  const [note, setNote] = useState('');
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1);

  const lines = ['Classic', 'Sweet', 'Dank'];

  const filteredProducts = useMemo(() => {
    // Use serverProducts.items for table data
    const original = serverProducts?.items || [];

    // Demo dataset matching the shared design if API items are missing/insufficient
    const sampleProducts = [
      { name: 'The Juice', lot_number: '1001', source: 'Custom', line: 'Classic' },
      { name: 'Melon Blast', lot_number: '1002', source: 'Custom', line: 'Dank' },
      { name: 'Blue Razz', lot_number: '1003', source: 'In-store', line: 'Sweet' },
      { name: 'Banana Kush', lot_number: '1004', source: 'In-store', line: 'Classic' },
      { name: 'Pineapple Express', lot_number: '1005', source: 'Custom', line: 'Sweet' },
      { name: 'Mango Haze', lot_number: '1006', source: 'Custom', line: 'Classic' },
      { name: 'Grape Ape', lot_number: '1007', source: 'In-store', line: 'Dank' },
      { name: 'Strawberry Cough', lot_number: '1008', source: 'In-store', line: 'Sweet' },
      { name: 'Lemon Skunk', lot_number: '1009', source: 'Custom', line: 'Classic' },
      { name: 'Watermelon Z', lot_number: '1010', source: 'Custom', line: 'Sweet' },
      { name: 'Cherry Pie', lot_number: '1011', source: 'In-store', line: 'Classic' },
      { name: 'Orange Cream', lot_number: '1012', source: 'In-store', line: 'Dank' },
      { name: 'Citrus Punch', lot_number: '1013', source: 'Custom', line: 'Sweet' },
      { name: 'Berry Blast', lot_number: '1014', source: 'In-store', line: 'Sweet' },
      { name: 'Tropical Storm', lot_number: '1015', source: 'Custom', line: 'Classic' },
      { name: 'Mint Fresh', lot_number: '1016', source: 'In-store', line: 'Classic' },
      { name: 'Caramel Swirl', lot_number: '1017', source: 'Custom', line: 'Sweet' },
      { name: 'Vanilla Sky', lot_number: '1018', source: 'Custom', line: 'Classic' },
      { name: 'Cookies & Cream', lot_number: '1019', source: 'In-store', line: 'Dank' },
      { name: 'Apple Fritter', lot_number: '1020', source: 'In-store', line: 'Sweet' },
      { name: 'Blueberry Muffin', lot_number: '1021', source: 'Custom', line: 'Sweet' },
      { name: 'Raspberry Gelato', lot_number: '1022', source: 'Custom', line: 'Classic' },
      { name: 'Kiwi Dream', lot_number: '1023', source: 'In-store', line: 'Sweet' },
      { name: 'Peach Rings', lot_number: '1024', source: 'In-store', line: 'Classic' },
    ];

    // Prefer real data when there is enough variety; otherwise use demo items
    const base = original.length >= 12 ? original : sampleProducts;

    // Ensure we have a visually substantial table by repeating (cycling sample data) up to at least 12 rows
    const minRows = 24;
    let expanded = [...base];
    if (expanded.length < minRows) {
      const needed = minRows - expanded.length;
      for (let i = 0; i < needed; i++) {
        const src = base[i % base.length] || {};
        expanded.push({ ...src, lot_number: `${src?.lot_number || 'mock'}-dup-${i}` });
      }
    }

    return expanded.filter((p) => {
      const matchesSearch = search
        ? `${p?.name || ''} ${p?.lot_number || ''}`.toLowerCase().includes(search.toLowerCase())
        : true;
      // Current dropdown filters by source, not line
      const src = (p?.source || '').toLowerCase();
      const selected = (lineFilter || 'all').toLowerCase();
      const matchesSource =
        selected === 'all'
          ? true
          : selected === 'custom'
            ? src === 'custom'
            : selected === 'in-store'
              ? src === 'in-store' || src === 'instore'
              : true;
      return matchesSearch && matchesSource;
    });
  }, [serverProducts, search, lineFilter]);

  const pageSize = 4;
  const totalItems = filteredProducts?.length || 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(totalItems, currentPage * pageSize);
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;
  const goToPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const goToFirstPage = () => setPage(1);
  const goToLastPage = () => setPage(totalPages);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateCartItemQty = (index, delta) => {
    setCart((prev) => {
      const next = [...prev];
      const qty = Math.max(0, (next[index]?.qty || 0) + delta);
      next[index] = { ...next[index], qty };
      return next.filter((i) => i.qty > 0);
    });
  };

  if (error) {
    return <div className="py-20 text-center">{t('errors.loadError')}</div>;
  }

  if (loading) {
    return <PageShimmer />;
  }
  if (!serverProducts?.items) {
    return <div className="py-20 text-center">{t('errors.noProducts')}</div>;
  }

  return (
    <div className="py-6 xl:py-10">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_1fr]">
        {/* Left: Custom Order presets (mobile: shown after table) */}
        <CustomOrder
          lines={lines}
          t={t}
          wholesaleProducts={products}
          onAddToCart={(cartItem) => {
            console.log('Received cart item in WholesaleStorePage:', cartItem);
            setCart((prev) => {
              const newCart = [...prev, cartItem];
              console.log('Updated cart:', newCart);
              return newCart;
            });
          }}
        />

        {/* Right: Product table + note + cart (mobile: shown before sidebar) */}
        <section className="order-1 space-y-6 xl:order-2">
          {/* Controls */}
          <Controls search={search} setSearch={setSearch} lineFilter={lineFilter} setLineFilter={setLineFilter} t={t} />

          <ProductTable
            products={paginatedProducts}
            lines={lines}
            onQtyChange={(idx, d) => updateCartItemQty(idx, d)}
            onSelect={(cartItem) => {
              setCart((prev) => [...prev, cartItem]);
            }}
            loading={loading}
            pageSize={pageSize}
            t={t}
          />

          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
            hasNextPage={hasNextPage}
            hasPrevPage={hasPrevPage}
            goToPage={goToPage}
            nextPage={nextPage}
            prevPage={prevPage}
            goToFirstPage={goToFirstPage}
            goToLastPage={goToLastPage}
          />

          {/* Note + Cart */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            <div>
              <div className="hidden rounded-2xl border border-gray-200 bg-white p-4 xl:block">
                <div className="mb-2 text-[13px] font-medium text-gray-900 sm:text-[14px]">{t('note.title')}</div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t('note.placeholder')}
                  className="h-36 w-full resize-none rounded-lg border border-gray-200 p-3 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
                />
              </div>
            </div>
            <DesktopCart cart={cart} updateCartItemQty={updateCartItemQty} setCart={setCart} t={t} />
          </div>
        </section>

        {/* Mobile-only Cart at very bottom */}
        <div className="order-4 xl:hidden">
          <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="mb-2 text-[13px] font-medium text-gray-900 sm:text-[14px]">{t('note.title')}</div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('note.placeholder')}
              className="h-36 w-full resize-none rounded-lg border border-gray-200 p-3 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
            />
          </div>
          <MobileCart cart={cart} updateCartItemQty={updateCartItemQty} setCart={setCart} t={t} />
        </div>
      </div>
    </div>
  );
};

export default WholesaleStorePage;
