'use client';
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
        className={`bg-umbra-100 relative mx-auto w-[360px] max-w-[calc(100vw-1rem)] transform overflow-hidden rounded-3xl p-5 shadow-2xl transition-all duration-200 ease-out md:mx-4 md:w-full md:max-w-3xl md:p-7 xl:p-9 ${
          animateIn ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-4 scale-95 opacity-0'
        }`}
      >
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/assets/rebranding-logo.png"
            alt="Loud Spectrum Logo"
            width={96}
            height={40}
            className="h-auto w-full max-w-[96px]"
            priority
          />
        </div>

        {/* Content */}
        <div className="text-umbra-100 space-y-5 text-center text-sm md:space-y-7 md:text-left md:text-[0.925rem]">
          <div className="flex flex-col items-center md:flex-row md:items-start">
            <div>
              <h2
                className="inline-flex w-full items-center justify-center rounded-full px-5 py-1.5 text-center text-[36px] !leading-[104%] font-normal md:text-[36px]"
                style={{
                  background: 'linear-gradient(273.4deg, #101820 4.3%, #0077C8 29.35%, #B2A9F5 64.06%, #DDDAE8 95.7%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Welcome to Loud Spectrum
              </h2>
              {/* <div className="main-gradient hidden h-px w-20 md:block" /> */}
              <p className="text-white-100 text-center text-xs leading-relaxed md:text-[11px]">
                Today, we’re proud to introduce our next evolution — <br />
                Loud Spectrum — a full-service Flavor House built around one mission: to turn up the volume on flavor
                innovation and elevate sensory experiences across every category.
              </p>
            </div>
          </div>

          <div className="flex w-full justify-center">
            <Image
              src="/assets/rebranding-gif.gif"
              alt="Loud Spectrum Rebranding"
              width={606}
              height={353}
              className="h-full w-full max-w-[300px] object-contain md:max-w-[400px]"
              unoptimized
            />
          </div>

          <div className="rounded-xl">
            <p className="text-white-100 mt-2 text-center text-xs leading-relaxed sm:text-xs md:text-[11px]">
              Take a look around and If you have questions or run into issues, reach out in chat or email us at{' '}
              <a
                href="mailto:hi@loudspectrum.com"
                className="text-white-100 text-[14px] font-medium underline-offset-4 hover:underline"
              >
                hi@loudspectrum.com
              </a>
            </p>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleClose}
            className="group bg-white-100 text-umbra-100 hover:text-white-100 inline-flex cursor-pointer items-center justify-center rounded-full px-5 py-1.5 text-center text-[16px] font-medium uppercase transition-all duration-300 md:!text-[16px]"
            style={{
              background: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background =
                'linear-gradient(273.4deg, #101820 4.3%, #0077C8 29.35%, #B2A9F5 64.06%, #DDDAE8 95.7%)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
            }}
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RebrandingPopup;
