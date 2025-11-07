'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const brandUpdates = [
  { old: 'Medical Terpenes', newName: 'Classic', color: 'classic' },
  { old: 'Sauce Terps', newName: 'Dank', color: 'dank' },
  { old: 'Ultra Candy', newName: 'Sweet', color: 'sweet' },
  { old: 'Live Resin', newName: 'Alive', color: 'alive' },
];

const colorClasses = {
  classic: {
    bg: 'bg-classic',
    bgLight: 'bg-classic/15',
    text: 'text-classic',
  },
  dank: {
    bg: 'bg-dank',
    bgLight: 'bg-dank/15',
    text: 'text-dank',
  },
  sweet: {
    bg: 'bg-sweet',
    bgLight: 'bg-sweet/15',
    text: 'text-sweet',
  },
  alive: {
    bg: 'bg-alive',
    bgLight: 'bg-alive/15',
    text: 'text-alive',
  },
};

const RebrandingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    try {
      const qp = searchParams ?? new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');

      // If route has no utm_source, clear seen flag and ensure popup is hidden
      const hasUtmSource = qp.has('utm_source');
      if (!hasUtmSource) {
        localStorage.removeItem('rebranding-popup-seen');
        setAnimateIn(false);
        setShowPopup(false);
        setIsLoading(false);
        return;
      }

      // Dev override: force open
      const force = qp.get('force_rebrand') === '1' || qp.get('show_rebrand') === '1';
      const hasSeen = localStorage.getItem('rebranding-popup-seen') === 'true';

      if (force || !hasSeen) {
        setShowPopup(true);
        requestAnimationFrame(() => setAnimateIn(true));
      }
    } catch (error) {
      console.error('Error deciding rebrand popup:', error);
    } finally {
      setIsLoading(false);
    }
  }, [pathname, searchParams]);

  // Handle browser back/forward navigation explicitly
  useEffect(() => {
    const onPopState = () => {
      try {
        const qp = new URLSearchParams(window.location.search || '');
        const hasUtmSource = qp.has('utm_source');
        if (!hasUtmSource) {
          localStorage.removeItem('rebranding-popup-seen');
          setAnimateIn(false);
          setShowPopup(false);
          return;
        }
        const force = qp.get('force_rebrand') === '1' || qp.get('show_rebrand') === '1';
        const hasSeen = localStorage.getItem('rebranding-popup-seen') === 'true';
        if (force || !hasSeen) {
          setShowPopup(true);
          requestAnimationFrame(() => setAnimateIn(true));
        }
      } catch (e) {
        // no-op
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setShowPopup(false);

      localStorage.removeItem('rebranding-popup-seen');

      // Remove utm_source (and related UTM params) from the URL without reloading
      try {
        const url = new URL(window.location.href);
        const sp = url.searchParams;
        sp.delete('utm_source');
        sp.delete('utm_medium');
        sp.delete('utm_campaign');
        sp.delete('utm_term');
        sp.delete('utm_content');
        url.search = sp.toString();
        window.history.replaceState({}, '', url.toString());
      } catch (_) {
        // no-op
      }
    }, 200);
  };

  if (isLoading || !showPopup) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 transition-opacity duration-200 ease-out ${
        animateIn ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'
      }`}
    >
      <div
        className={`relative mx-4 w-full max-w-md transform overflow-hidden rounded-3xl bg-white p-5 shadow-2xl transition-all duration-200 ease-out sm:max-w-lg md:max-w-2xl md:p-7 xl:max-w-3xl xl:p-9 ${
          animateIn ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="text-umbra-60 hover:text-umbra-100 absolute top-4 right-4 transition-colors"
          aria-label="Close popup"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/assets/brand.png"
            alt="Loud Spectrum Logo"
            width={64}
            height={64}
            className="h-16 w-auto"
            priority
          />
        </div>

        {/* Content */}
        <div className="text-umbra-100 space-y-5 text-center text-sm md:space-y-7 md:text-left md:text-[0.925rem]">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start md:justify-between">
            <h2 className="text-umbra-100 inline-flex w-full items-center justify-center rounded-full px-5 py-1.5 text-center text-[20px] font-bold tracking-[0.05em] uppercase md:text-[24px]">
              Welcome to Loud Spectrum
            </h2>
            {/* <div className="main-gradient hidden h-px w-20 md:block" /> */}
          </div>

          <p className="text-center text-xs leading-relaxed md:text-sm">
            We've evolved — same great team, same premium quality, bold new name. We’ve rebranded to bring you a more
            streamlined, elevated web experience — one that matches our full spectrum of flavor and innovation.
          </p>

          <div className="from-umbra-100/10 via-atmosphere/10 to-aurora/10 rounded-xl bg-gradient-to-r p-4 shadow-inner">
            <h3 className="text-umbra-60 mb-3 text-center text-xs font-semibold tracking-[0.35em] uppercase">
              Brand Evolutions
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {brandUpdates.map(({ old, newName, color }) => {
                const colors = colorClasses[color];
                return (
                  <div
                    key={old}
                    className="border-umbra-10 text-umbra-100 flex items-center justify-center rounded-2xl border bg-white/90 px-3 py-2 text-xs font-medium backdrop-blur-sm sm:text-sm"
                  >
                    <span className="flex items-center gap-2">
                      {/* <span
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${colors.bgLight} ${colors.text} text-[0.65rem] font-semibold`}
                      >
                        {old.charAt(0)}
                      </span> */}
                      {old}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="text-umbra-40 text-sm sm:text-base">→</span>
                      <span
                        className={`inline-flex items-center rounded-full ${colors.bg} px-2.5 py-0.5 text-[0.65rem] font-semibold text-white shadow-sm sm:px-3 sm:py-0.5 sm:text-xs`}
                      >
                        {newName}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-1 md:items-start md:gap-6">
            <div className="rounded-xl p-4">
              <p className="text-umbra-60 text-center text-xs font-semibold tracking-[0.35em] uppercase">
                Here for you
              </p>
              <p className="text-umbra-100/80 mt-2 text-center text-xs leading-relaxed sm:text-sm">
                If you have questions or run into issues, reach out in chat or email us at{' '}
                <a
                  href="mailto:hi@loudspectrum.com"
                  className="text-umbra-100 font-semibold underline-offset-4 hover:underline"
                >
                  hi@loudspectrum.com
                </a>
                . We're glad you're here — and we can't wait to take your flavor experience beyond ordinary.
              </p>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleClose}
            className="from-umbra-100 via-atmosphere to-aurora text-white-100 inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r px-5 py-1.5 text-center text-[0.6rem] font-semibold tracking-[0.1em] uppercase md:text-[14px]"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RebrandingPopup;
