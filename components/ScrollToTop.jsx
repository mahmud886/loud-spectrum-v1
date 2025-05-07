'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

function ScrollToTop({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return <>{children}</>;
}

export default ScrollToTop;
