'use client';

import CloseButton from '@/components/navbar/CloseButton';
import { useAuthToken } from '@/hooks/useAuthToken';
import { Link } from '@/i18n/navigation';
import { selectCartItems } from '@/lib/store/slices/cartSlice';
import { LogInIcon, ShoppingCartIcon, UserIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

const TopNavRight = ({ onClose, setCartOpen }) => {
  const cartItems = useSelector(selectCartItems);
  const authToken = useAuthToken();
  const t = useTranslations('Navbar');
  const topNav = t.raw('TopNav');

  // Category mapping for URL routing
  const getCategoryUrl = (categoryName) => {
    // Map translated names to their English equivalents for URL routing
    const categoryMap = {
      [topNav.Alive]: 'alive',
      [topNav.Dank]: 'dank',
      [topNav.Sweet]: 'sweet',
      [topNav.Classic]: 'classic',
      [topNav.Active]: 'active',
      [topNav.Relaxed]: 'relax',
      [topNav.Sample_packs]: 'sample-packs',
    };

    const englishCategory = categoryMap[categoryName] || categoryName.toLowerCase();
    return `/shop/${englishCategory}`;
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex w-full items-center justify-end gap-4">
        {authToken ? (
          <Link
            href="/account"
            className={`hover:text-umbra-40 text-[#191919]' } mx-[5px] flex items-center gap-2 font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out xl:flex`}
          >
            <UserIcon size={24} />
          </Link>
        ) : (
          <Link
            href="/login"
            className="text-umbra-100 hover:text-umbra-40 relative mx-[5px] cursor-pointer transition-colors duration-300 ease-in-out"
          >
            <LogInIcon size={24} />
          </Link>
        )}
        <button
          type="button"
          onClick={() => {
            setCartOpen();
          }}
          aria-label={`${t('Cart')} (${cartItems?.length || 0} items)`}
          className="text-umbra-100 hover:text-umbra-40 relative mx-[5px] cursor-pointer transition-colors duration-300 ease-in-out"
        >
          <ShoppingCartIcon size={24} />
          {cartItems?.length > 0 && (
            <span className="bg-alive absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[12px] font-medium text-white">
              {cartItems.length}
            </span>
          )}
        </button>
        <CloseButton onClose={onClose} />
      </div>
      <div className="flex h-[372px] flex-col justify-between gap-4">
        <p className="text-umbra-10 font-sans text-[15px] font-normal">{topNav.Shop_by}</p>

        <div>
          {[
            { title: topNav.Line, items: [topNav.Alive, topNav.Dank, topNav.Sweet, topNav.Classic] },
            { title: topNav.Mood, items: [topNav.Active, topNav.Relaxed] },
            { items: [topNav.Sample_packs] },
          ].map((section, index) => (
            <div
              key={index}
              className={`flex items-start justify-between gap-4 border-b-[1px] border-gray-300 ${
                index === 0 ? 'border-t-[1px]' : ''
              } py-2`}
            >
              <div className="flex flex-col items-start justify-between">
                {section.items.map((name, idx) => (
                  <Link
                    key={idx}
                    href={getCategoryUrl(name)}
                    className="text-umbra-100 hover:text-umbra-40 mx-[5px] font-sans text-[20px] font-normal transition-colors duration-300 ease-in-out"
                  >
                    {name}
                  </Link>
                ))}
              </div>
              {section.title && (
                <button className="rounded-sm border border-gray-300 px-3 py-[2px]">{section.title}</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopNavRight;
