'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const RebrandingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const run = () => {
      try {
        const search = typeof window !== 'undefined' ? window.location.search : '';
        const qp = new URLSearchParams(search);

        // Dev override: force open
        const force = qp.get('force_rebrand') === '1' || qp.get('show_rebrand') === '1';
        if (force) {
          setShowPopup(true);
          requestAnimationFrame(() => setAnimateIn(true));
          return;
        }

        // Show only when utm_source is present
        const hasUtmSource = qp.has('utm_source');
        if (hasUtmSource) {
          setShowPopup(true);
          requestAnimationFrame(() => setAnimateIn(true));
        }
      } catch (error) {
        console.error('Error deciding rebrand popup:', error);
      } finally {
        setIsLoading(false);
      }
    };

    run();
  }, []);

  const handleClose = () => {
    setAnimateIn(false);
    setTimeout(() => {
      setShowPopup(false);
      localStorage.setItem('rebranding-popup-seen', 'true');
    }, 200);
  };

  if (isLoading || !showPopup) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-200 ease-out ${
        animateIn ? 'bg-opacity-50 opacity-100' : 'bg-opacity-0 opacity-0'
      }`}
    >
      <div
        className={`relative mx-4 w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all duration-200 ease-out ${
          animateIn ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-2 scale-95 opacity-0'
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-600"
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
        <div className="text-center">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">Welcome to Loud Spectrum!</h2>
          <p className="leading-relaxed text-gray-700">
            Hey there! We're currently rebranding Medical Terpenes to bring you an even better experience. Our new home
            is Loud Spectrum — same great team, same high-quality medical terpenes, just a fresh new look and name!
          </p>
        </div>

        {/* Action button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleClose}
            className="bg-gradient-four-colors rounded-lg px-6 py-2 font-medium text-white transition-all duration-200 hover:opacity-90"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default RebrandingPopup;
