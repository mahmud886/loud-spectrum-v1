import ProductCartItems from '@/components/checkout/ProductCartItems';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from '@/i18n/navigation';
import { ShoppingCartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

const ProductCart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const t = useTranslations('CheckoutPage.ProductCart');

  return (
    <div className="pb-4">
      {/* Header */}
      <div className="flex items-start justify-between py-4 pr-4">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">{t('title')}</h2>
          <h6 className="text-umbra-40 font-mono text-[16px] leading-[130%] font-normal">
            {t('itemCount', { count: cartItems.length })}
          </h6>
        </div>
      </div>

      {/* Cart Items */}
      <ScrollArea className="max-h-[390px] space-y-4 pr-4">
        {cartItems.length === 0 ? (
          <div className="flex h-[370px] w-full flex-col items-center justify-center">
            <ShoppingCartIcon size={100} className="text-umbra-40" />
            <p className="text-umbra-40 mb-4 text-center">{t('emptyMessage')}</p>
            <Link
              href="/shop"
              className="main-button-black rounded-full px-6 py-3 text-sm font-medium text-white transition-colors"
            >
              Continue Shopping
            </Link>
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
