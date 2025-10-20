'use client';

import { useState } from 'react';
import { toast } from 'sonner';

const CustomOrder = ({ lines, t, wholesaleProducts, onAddToCart }) => {
  const [quantities, setQuantities] = useState({});
  const [customFlavors, setCustomFlavors] = useState({});
  const [flavorDescriptions, setFlavorDescriptions] = useState({});

  // Group wholesale products by line/category
  const productsByLine =
    wholesaleProducts?.items?.reduce((acc, product) => {
      const line = product?.productDetails?.category_name || 'Other';
      if (!acc[line]) {
        acc[line] = [];
      }
      acc[line].push(product);
      return acc;
    }, {}) || {};

  const updateQuantity = (line, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [line]: Math.max(5, (prev[line] || 5) + delta),
    }));
  };

  const handleCustomFlavorChange = (line, value) => {
    setCustomFlavors((prev) => ({
      ...prev,
      [line]: value,
    }));
  };

  const handleFlavorDescriptionChange = (line, value) => {
    setFlavorDescriptions((prev) => ({
      ...prev,
      [line]: value,
    }));
  };

  const handleQuantityChange = (line, value) => {
    const numValue = parseInt(value) || 5;
    const validQuantity = Math.max(5, Math.min(1000, numValue)); // Min 5, Max 1000
    setQuantities((prev) => ({
      ...prev,
      [line]: validQuantity,
    }));
  };

  const handleSelectProduct = (line) => {
    const customFlavor = customFlavors[line] || '';
    const flavorDescription = flavorDescriptions[line] || '';
    const quantity = quantities[line] || 5;

    // Validate that custom flavor and description are provided
    if (!customFlavor.trim()) {
      toast.error('Please enter a custom flavor name');
      return;
    }

    if (!flavorDescription.trim()) {
      toast.error('Please enter a flavor description');
      return;
    }

    const products = productsByLine[line];

    if (products && products.length > 0) {
      const selectedProduct = products[0]; // Use first product as default

      // Create cart item
      const cartItem = {
        name: customFlavor || selectedProduct.productDetails?.name || 'Custom Product',
        line: line,
        qty: quantity,
        price: selectedProduct.price || 3,
        lot: selectedProduct.productDetails?.sku || selectedProduct.productDetails?.code || 'CUSTOM',
        customFlavor: customFlavor,
        flavorDescription: flavorDescription,
        productId: selectedProduct._id,
      };

      onAddToCart(cartItem);

      // Clear inputs after successful selection
      setCustomFlavors((prev) => ({ ...prev, [line]: '' }));
      setFlavorDescriptions((prev) => ({ ...prev, [line]: '' }));
      setQuantities((prev) => ({ ...prev, [line]: 5 }));

      toast.success(`${customFlavor} added to cart!`);
    } else {
      // Create a fallback cart item even without products
      const fallbackCartItem = {
        name: customFlavor || `${line} Custom Product`,
        line: line,
        qty: quantity,
        price: 3,
        lot: 'CUSTOM',
        customFlavor: customFlavor,
        flavorDescription: flavorDescription,
        productId: null,
      };

      console.log('Adding fallback cart item:', fallbackCartItem);
      onAddToCart(fallbackCartItem);

      // Clear inputs after successful selection
      setCustomFlavors((prev) => ({ ...prev, [line]: '' }));
      setFlavorDescriptions((prev) => ({ ...prev, [line]: '' }));
      setQuantities((prev) => ({ ...prev, [line]: 5 }));

      toast.success(`${customFlavor} added to cart!`);
    }
  };

  return (
    <aside className="order-2 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm xl:order-1 xl:p-5">
      <h3 className="mb-4 font-sans text-[15px] font-medium text-gray-900 sm:text-[16px]">{t('customOrder')}</h3>

      {lines.map((line) => {
        const lineProducts = productsByLine[line] || [];
        const defaultPrice = lineProducts?.length > 0 ? lineProducts[0].price : 3;

        return (
          <div key={line} className="mb-4 rounded-xl border border-gray-100 p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]">
            <div className="mb-2 text-[13px] font-semibold text-gray-900 sm:text-[14px]">{line}</div>
            <div className="mb-1 text-[12px] text-gray-500">${defaultPrice}/ml</div>
            <div className="space-y-2">
              <input
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
                placeholder={t('customOrderForm.customFlavor')}
                value={customFlavors[line] || ''}
                onChange={(e) => handleCustomFlavorChange(line, e.target.value)}
              />
              <textarea
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-[12px] outline-none focus:border-gray-400 sm:text-[14px]"
                placeholder={t('customOrderForm.describeFlavor')}
                rows={3}
                value={flavorDescriptions[line] || ''}
                onChange={(e) => handleFlavorDescriptionChange(line, e.target.value)}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    className="h-8 w-8 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => updateQuantity(line, -5)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="5"
                    max="1000"
                    step="5"
                    value={quantities[line] || 5}
                    onChange={(e) => handleQuantityChange(line, e.target.value)}
                    className="w-16 rounded border border-gray-200 px-2 py-1 text-center text-[12px] outline-none focus:border-gray-400 sm:text-[13px]"
                  />
                  <button
                    className="h-8 w-8 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => updateQuantity(line, 5)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="rounded-full bg-gray-900 px-3 py-1.5 text-[12px] text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
                  onClick={() => handleSelectProduct(line)}
                  disabled={!customFlavors[line]?.trim() || !flavorDescriptions[line]?.trim()}
                >
                  {t('customOrderForm.select')}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </aside>
  );
};

export default CustomOrder;
