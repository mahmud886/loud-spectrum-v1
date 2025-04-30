'use client';

import { MinusIcon, PlusIcon, TrashIcon, X } from 'lucide-react';
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
        <div className="h-[calc(100dvh-350px)] space-y-4 overflow-y-scroll p-2">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="border-umbra-10 flex items-center gap-4 rounded-md border-1 py-2.5 pr-5 pl-2.5">
                <Image src={item.image} alt={item.name} width={80} height={80} className="rounded" />
                <div className="flex w-full flex-col justify-between gap-5">
                  <h6 className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">{item.name}</h6>
                  <div className="flex w-full items-end justify-between gap-5">
                    <div className="mt-2 flex items-center gap-2">
                      {/* Quantity Control */}
                      <div className="bg-umbra-5 inline-flex overflow-hidden rounded-full">
                        {/* Minus Button */}
                        <button
                          className="group text-umbra-100 hover:text-white-100 flex cursor-pointer items-center justify-center px-2 py-1 transition hover:bg-red-500"
                          onClick={() => console.log('decrease')}
                        >
                          <MinusIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
                        </button>

                        {/* Quantity */}
                        <div className="text-umbra-100 flex items-center justify-center px-3 py-1 font-medium">
                          {item.quantity}
                        </div>

                        {/* Plus Button */}
                        <button
                          className="group text-umbra-100 hover:text-white-100 hover:bg-alive flex cursor-pointer items-center justify-center px-2 py-1 transition"
                          onClick={() => console.log('increase')}
                        >
                          <PlusIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        className="group text-umbra-100 hover:text-white-100 bg-umbra-5 flex cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-red-500"
                        onClick={() => console.log('remove')}
                      >
                        <TrashIcon size={16} className="text-umbra-100 group-hover:text-white-100 transition" />
                      </button>
                    </div>
                    <div>
                      <p className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">${item.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

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
              <button className="main-button-black w-full rounded-full py-3 text-white transition">
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

const cartItems = [
  {
    name: 'Green Apple Jack',
    quantity: 2,
    price: 29.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/cart-item.jpg',
  },
  {
    name: 'Green Apple Jack',
    quantity: 1,
    price: 14.99,
    image: '/assets/images/cart-item.jpg',
  },
];
