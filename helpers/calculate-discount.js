/**
 * Calculate discount for a product based on category discount settings
 * @param {Object} category - Category object with discount information
 * @param {number} originalPrice - Original price to calculate discount from
 * @param {number} minimumPrice - Minimum price after discount (default: 1)
 * @returns {Object} Object containing original price, discounted price, and discount amount
 */
export const calculateDiscount = (category, originalPrice, minimumPrice = 1) => {
  // Default return if no category or discount is not active
  if (!category || !category.is_discount_active) {
    return {
      originalPrice,
      discountedPrice: originalPrice,
      discountAmount: 0,
      discountPercentage: 0,
      hasDiscount: false,
    };
  }

  const { discount_type, discount_value } = category;

  // Validate discount value
  if (!discount_value || discount_value <= 0) {
    return {
      originalPrice,
      discountedPrice: originalPrice,
      discountAmount: 0,
      discountPercentage: 0,
      hasDiscount: false,
    };
  }

  let discountedPrice = originalPrice;
  let discountAmount = 0;
  let discountPercentage = 0;

  if (discount_type === 'Percentage') {
    // Calculate percentage discount
    discountAmount = (originalPrice * discount_value) / 100;
    discountedPrice = originalPrice - discountAmount;
    discountPercentage = discount_value;
  } else if (discount_type === 'Fixed') {
    // Calculate fixed amount discount
    // If discount is greater than or equal to original price, don't apply discount
    if (discount_value >= originalPrice) {
      return {
        originalPrice,
        discountedPrice: originalPrice,
        discountAmount: 0,
        discountPercentage: 0,
        hasDiscount: false,
      };
    } else {
      // Normal fixed discount
      discountAmount = discount_value;
      discountedPrice = originalPrice - discountAmount;
      discountPercentage = originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0;
    }
  }

  // Ensure discounted price doesn't go below minimum price
  discountedPrice = Math.max(minimumPrice, discountedPrice);

  // Recalculate discount amount and percentage based on actual discounted price
  discountAmount = originalPrice - discountedPrice;
  discountPercentage = originalPrice > 0 ? (discountAmount / originalPrice) * 100 : 0;

  return {
    originalPrice,
    discountedPrice,
    discountAmount,
    discountPercentage,
    hasDiscount: true,
    discountType: discount_type,
  };
};

/**
 * Calculate discount for price ranges (min and max prices)
 * @param {Object} category - Category object with discount information
 * @param {number} minPrice - Minimum price in the range
 * @param {number} maxPrice - Maximum price in the range
 * @param {number} minimumPrice - Minimum price after discount (default: 1)
 * @returns {Object} Object containing original and discounted price ranges
 */
export const calculateDiscountForRange = (category, minPrice, maxPrice, minimumPrice = 1) => {
  const minDiscount = calculateDiscount(category, minPrice, minimumPrice);
  const maxDiscount = calculateDiscount(category, maxPrice, minimumPrice);

  return {
    originalRange: {
      min: minPrice,
      max: maxPrice,
    },
    discountedRange: {
      min: minDiscount.discountedPrice,
      max: maxDiscount.discountedPrice,
    },
    hasDiscount: minDiscount.hasDiscount || maxDiscount.hasDiscount,
    discountType: category?.discount_type,
    discountValue: category?.discount_value,
  };
};

/**
 * Calculate discount for a specific selected price
 * @param {Object} category - Category object with discount information
 * @param {number} selectedPrice - The selected price to apply discount to
 * @param {number} minimumPrice - Minimum price after discount (default: 1)
 * @returns {Object} Object containing original and discounted selected price
 */
export const calculateDiscountForSelectedPrice = (category, selectedPrice, minimumPrice = 1) => {
  if (!selectedPrice) {
    return {
      originalPrice: 0,
      discountedPrice: 0,
      discountAmount: 0,
      discountPercentage: 0,
      hasDiscount: false,
    };
  }

  return calculateDiscount(category, selectedPrice, minimumPrice);
};

/**
 * Format price display with discount information
 * @param {Object} discountInfo - Result from calculateDiscount function
 * @param {boolean} showOriginal - Whether to show original price (default: true)
 * @returns {Object} Object with formatted price strings
 */
export const formatDiscountedPrice = (discountInfo, showOriginal = true) => {
  const { originalPrice, discountedPrice, hasDiscount, discountPercentage, discountType } = discountInfo;

  if (!hasDiscount) {
    return {
      displayPrice: `$${originalPrice.toFixed(2)}`,
      originalPrice: showOriginal ? `$${originalPrice.toFixed(2)}` : null,
      discountedPrice: null,
      discountText: null,
    };
  }

  return {
    displayPrice: `$${discountedPrice.toFixed(2)}`,
    originalPrice: showOriginal ? `$${originalPrice.toFixed(2)}` : null,
    discountedPrice: `$${discountedPrice.toFixed(2)}`,
    discountText:
      discountType === 'Percentage' ? `${discountPercentage.toFixed(0)}% OFF` : `${discountPercentage.toFixed(0)}% OFF`,
  };
};
