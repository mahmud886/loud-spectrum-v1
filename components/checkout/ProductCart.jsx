import React from 'react';
import { ShoppingCartIcon, X } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import CartItem from '@/components/cart/CartItem';
import ProductCartItems from '@/components/checkout/ProductCartItems';

const ProductCart = () => {
  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-start justify-between py-4 pr-4">
        <div className="space-y-2">
          <h2 className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">Products</h2>
          <h6 className="text-umbra-40 font-mono text-[16px] leading-[130%] font-normal">5 items</h6>
        </div>
      </div>

      {/* Cart Items */}
      <ScrollArea className="h-[370px] space-y-4 pr-4">
        {cartItems.length === 0 ? (
          <div className="flex h-[370px] w-full flex-col items-center justify-center">
            <ShoppingCartIcon size={100} className="text-umbra-40" />
            <p className="text-umbra-40 text-center">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {cartItems.map((item, idx) => (
              <ProductCartItems key={idx} item={item} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ProductCart;

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
