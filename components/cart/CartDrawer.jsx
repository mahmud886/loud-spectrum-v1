'use client';

import { ShoppingCartIcon, X } from 'lucide-react';
import { useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CartItem from '@/components/cart/CartItem';
import { Link, useRouter } from '@/i18n/navigation';

const CartDrawer = ({ isOpen, onClose }) => {
  const router = useRouter();

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
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between p-5">
          <div className="space-y-2">
            <h2 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal">Your Cart</h2>
            <h6 className="text-umbra-40 font-mono text-[16px] leading-[130%] font-normal">5 items</h6>
          </div>
          <button onClick={onClose}>
            <X size={27} className="text-umbra-100 hover:text-umbra-40 cursor-pointer" />
          </button>
        </div>

        {/* Cart Items */}
        <ScrollArea className="h-[calc(100dvh-350px)] space-y-4 p-4">
          {cartItems.length === 0 ? (
            <div className="flex h-[calc(100dvh-450px)] w-full flex-col items-center justify-center">
              <ShoppingCartIcon size={100} className="text-umbra-40" />
              <p className="text-umbra-40 text-center">Your cart is empty.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {cartItems.map((item, idx) => (
                <CartItem key={idx} item={item} />
              ))}
            </div>
          )}
        </ScrollArea>

        {/* Footer */}
        <div className="h-[218px] border-t border-gray-200 p-5">
          <div className="flex h-full flex-col items-start justify-between gap-5">
            <div className="flex w-full items-start justify-between gap-4">
              <h4 className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">Subtotal</h4>
              <div className="space-y-2.5 text-right">
                <h6 className="text-umbra-100 font-sans text-[32px] leading-[120%] font-normal">$245,00</h6>
                <p className="text-umbra-40 font-mono text-[15px] leading-[100%] font-normal tracking-[-0.85px]">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </div>
            <div className="mb-5 flex w-full items-center justify-between gap-5">
              <button
                onClick={() => {
                  onClose();
                  setTimeout(() => router.push('/checkout'), 300);
                }}
                className="main-button-black inline-flex w-full items-center justify-center rounded-full py-3 text-white transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

// const cartItems = [];
const cartItems = [
  {
    name: 'Green Apple Jack',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/cart-item.jpg',
  },
];
