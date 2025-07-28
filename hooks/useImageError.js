'use client';
import { useState } from 'react';

const useImageError = (defaultFallback = '/assets/images/products/product-line-1.png') => {
  const [imageError, setImageError] = useState(false);

  const getImageSrc = (imagePath, fallback = defaultFallback) => {
    if (imageError || !imagePath) {
      return fallback;
    }
    return `${process.env.NEXT_PUBLIC_API_URL}/public${imagePath}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const resetImageError = () => {
    setImageError(false);
  };

  return {
    imageError,
    getImageSrc,
    handleImageError,
    resetImageError,
  };
};

export default useImageError;
