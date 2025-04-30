'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

const CartDrawer = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => (document.body.style.overflow = '');
  }, [isOpen]);

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-[100dvh] w-[484px] bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 p-5">
        <h2 className="text-xl font-semibold">Your Cart</h2>
        <button onClick={onClose}>
          <X className="h-6 w-6 text-gray-500 hover:text-gray-800" />
        </button>
      </div>

      {/* Cart Items */}
      <div className="h-[calc(100dvh-150px)] space-y-4 overflow-y-auto p-5">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="font-semibold">${item.price}</p>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 p-5">
        <button className="w-full rounded-md bg-black py-3 text-white transition hover:bg-gray-800">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;

const cartItems = [
  {
    name: 'Premium Flower',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/products/sample1.jpg',
  },
  {
    name: 'CBD Gummies',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/products/sample2.jpg',
  },
];
