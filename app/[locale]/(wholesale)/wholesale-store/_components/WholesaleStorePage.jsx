'use client';

import ProductPagination from '@/components/containers/shop/ProductPagination';
import { calculateProductPrice } from '@/helpers/wholesale-product-price-calculations';
import { addToCartAndOpenDrawer } from '@/lib/store/slices/cartSlice';
import { getWholesalerProducts } from '@/services/get-wholesaler-products';
import { useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Controls from './Controls';
import CustomOrder from './CustomOrder';
import DesktopCart from './DesktopCart';
import MobileCart from './MobileCart';
import PageShimmer from './PageShimmer';
import ProductTable from './ProductTable';

const WholesaleStorePage = ({ serverProducts }) => {
  const t = useTranslations('WholesaleStore');
  const dispatch = useDispatch();
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

  // Function to merge wholesale cart items into a single item
  const mergeWholesaleCartItems = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return null;
    }

    // Calculate total quantity in ml
    const totalQuantityMl = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

    // Calculate total price using wholesale pricing
    const totalPrice = cartItems.reduce((sum, item) => {
      const calculation = calculateProductPrice(item.qty || 0, item.line || 'Classic');
      return sum + calculation.totalPrice;
    }, 0);

    // Create remarks string with individual item details
    const remarks = cartItems.map((item) => `${item.line} - ${item.name} - ${item.qty}ml`).join(', ');

    // Generate a random ID for this wholesale order
    const randomId = `wholesale-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Create a merged item that represents all wholesale items
    const mergedItem = {
      id: randomId,
      originalId: randomId,
      name: 'Wholesale Order',
      quantity: 1, // Always 1 for merged item
      selectedVolume: `${totalQuantityMl}ml`, // Total volume as the "selected volume"
      price: totalPrice, // Total price for all items
      totalPrice: totalPrice,
      isRegular: false,
      isWholesale: true,
      flavor: 'Mixed', // Indicate it's a mixed order
      remarks: remarks, // Individual item details
    };

    return mergedItem;
  };

  // Function to add merged wholesale cart to main cart
  const handleAddWholesaleToCart = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }

    const mergedItem = mergeWholesaleCartItems(cart);
    if (!mergedItem) {
      toast.error('Unable to process cart items');
      return;
    }

    // Dispatch to main cart using addToCartAndOpenDrawer
    dispatch(
      addToCartAndOpenDrawer({
        id: mergedItem.id,
        product: {
          name: mergedItem.name,
          id: mergedItem.originalId,
        },
        quantity: mergedItem.quantity,
        selectedVolume: mergedItem.selectedVolume,
        price: mergedItem.price,
        isRegular: mergedItem.isRegular,
        isWholesale: mergedItem.isWholesale,
        flavor: mergedItem.flavor,
        remarks: mergedItem.remarks,
      }),
    );

    // Clear the wholesale cart after adding to main cart
    setCart([]);
    toast.success('Wholesale order added to cart!');
  };

  const filteredProducts = useMemo(() => {
    // Use serverProducts.items for table data
    const original = serverProducts?.items || [];

    return original.filter((p) => {
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
            setCart((prev) => {
              const newCart = [...prev, cartItem];
              return newCart;
            });
          }}
          serverProducts={serverProducts}
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
          {/* <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]"> */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr]">
            <div>
              {/* <div className="hidden rounded-2xl border border-gray-200 bg-white p-4 xl:block">
                <div className="mb-2 text-[13px] font-medium text-gray-900 sm:text-[14px]">{t('note.title')}</div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={t('note.placeholder')}
                  className="h-36 w-full resize-none rounded-lg border border-gray-200 p-3 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
                />
              </div> */}
            </div>
            <DesktopCart
              cart={cart}
              updateCartItemQty={updateCartItemQty}
              setCart={setCart}
              t={t}
              onAddToMainCart={handleAddWholesaleToCart}
            />
          </div>
        </section>

        {/* Mobile-only Cart at very bottom */}
        <div className="order-4 xl:hidden">
          {/* <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="mb-2 text-[13px] font-medium text-gray-900 sm:text-[14px]">{t('note.title')}</div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('note.placeholder')}
              className="h-36 w-full resize-none rounded-lg border border-gray-200 p-3 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
            />
          </div> */}
          <MobileCart
            cart={cart}
            updateCartItemQty={updateCartItemQty}
            setCart={setCart}
            t={t}
            onAddToMainCart={handleAddWholesaleToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default WholesaleStorePage;
