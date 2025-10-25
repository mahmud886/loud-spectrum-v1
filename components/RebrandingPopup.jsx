'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const RebrandingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkReferrer = async () => {
      try {
        const response = await fetch('/api/check-referrer');
        const data = await response.json();

        if (data.isFromMedicalTerpenes) {
          // Check if user has already seen the popup
          const hasSeenPopup = localStorage.getItem('rebranding-popup-seen');
          if (!hasSeenPopup) {
            setShowPopup(true);
          }
        }
      } catch (error) {
        console.error('Error checking referrer:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkReferrer();
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    localStorage.setItem('rebranding-popup-seen', 'true');
  };

  if (isLoading || !showPopup) {
    return null;
  }

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
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
