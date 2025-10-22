'use client';
import { calculateDiscount, calculateDiscountForRange } from '@/helpers/calculate-discount';

/**
 * Compact version of discount price display for product cards and smaller components
 * @param {Object} props
 * @param {Object} props.category - Category object with discount information
 * @param {number} props.minPrice - Minimum price in range (optional if selectedPrice is provided)
 * @param {number} props.maxPrice - Maximum price in range (optional if selectedPrice is provided)
 * @param {number} props.selectedPrice - Selected price (optional if minPrice/maxPrice are provided)
 * @param {string} props.originalPriceClass - CSS class for original price (crossed out)
 * @param {string} props.discountedPriceClass - CSS class for discounted price
 * @param {string} props.regularPriceClass - CSS class for regular price (no discount)
 * @param {string} props.discountTextClass - CSS class for discount text
 * @param {boolean} props.showOriginalPrice - Whether to show original price (default: true)
 * @param {boolean} props.showDiscountText - Whether to show discount text (default: false)
 * @param {string} props.containerClass - CSS class for the container
 * @param {string} props.currency - Currency symbol (default: '$')
 * @param {number} props.decimalPlaces - Number of decimal places (default: 2)
 * @param {number} props.minimumPrice - Minimum price after discount (default: 10)
 */
const DiscountPriceCompact = ({
  category,
  minPrice,
  maxPrice,
  selectedPrice,
  originalPriceClass = 'text-sm text-gray-500 line-through',
  discountedPriceClass = 'text-lg font-semibold text-green-600',
  regularPriceClass = 'text-lg font-semibold text-gray-900',
  discountTextClass = 'text-xs text-green-600 font-bold',
  containerClass = 'flex flex-col gap-1',
  showOriginalPrice = true,
  showDiscountText = false,
  currency = '$',
  decimalPlaces = 2,
  minimumPrice = 10,
}) => {
  // Determine if we're showing a price range or selected price
  const isPriceRange = minPrice !== undefined && maxPrice !== undefined && !selectedPrice;
  const isSelectedPrice = selectedPrice !== undefined && selectedPrice !== null;

  if (!isPriceRange && !isSelectedPrice) {
    return null;
  }

  if (isSelectedPrice) {
    // Handle selected price display
    const discountInfo = calculateDiscount(category, selectedPrice, minimumPrice);

    if (!discountInfo.hasDiscount) {
      // No discount - show regular price
      return (
        <div className={containerClass}>
          <span className={regularPriceClass}>
            {currency}
            {Number(selectedPrice || 0).toFixed(decimalPlaces)}
          </span>
        </div>
      );
    }

    return (
      <div className={containerClass}>
        {/* First line: Original price and discount text inline */}
        <div className="flex items-center gap-2">
          {showOriginalPrice && discountInfo.hasDiscount && (
            <span className={originalPriceClass}>
              {currency}
              {Number(discountInfo.originalPrice || 0).toFixed(decimalPlaces)}
            </span>
          )}
          {showDiscountText && discountInfo.hasDiscount && (
            <span className={discountTextClass}>
              {discountInfo.discountType === 'Percentage'
                ? `${Number(discountInfo.discountPercentage || 0).toFixed(0)}% OFF`
                : `$${Number(discountInfo.discountAmount || 0).toFixed(2)} OFF`}
            </span>
          )}
        </div>
        {/* Second line: Discounted price */}
        <span className={discountedPriceClass}>
          {currency}
          {Number(discountInfo.discountedPrice || 0).toFixed(decimalPlaces)}
        </span>
      </div>
    );
  }

  // Handle price range display
  const rangeDiscount = calculateDiscountForRange(category, minPrice, maxPrice, minimumPrice);

  if (!rangeDiscount.hasDiscount) {
    // No discount - show simple range in regular color
    return (
      <div className={containerClass}>
        <span className={regularPriceClass}>
          {currency}
          {Number(minPrice || 0).toFixed(decimalPlaces)} – {currency}
          {Number(maxPrice || 0).toFixed(decimalPlaces)}
        </span>
      </div>
    );
  }

  // Has discount - show original and discounted ranges
  return (
    <div className={containerClass}>
      {/* First line: Original price range and discount text inline */}
      <div className="flex items-center gap-2">
        {showOriginalPrice && (
          <span className={originalPriceClass}>
            {currency}
            {Number(minPrice || 0).toFixed(decimalPlaces)} – {currency}
            {Number(maxPrice || 0).toFixed(decimalPlaces)}
          </span>
        )}
        {showDiscountText && (
          <span className={discountTextClass}>
            {category?.discount_type === 'Percentage'
              ? `${category?.discount_value}% OFF`
              : `$${category?.discount_value} OFF`}
          </span>
        )}
      </div>
      {/* Second line: Discounted price range */}
      <span className={discountedPriceClass}>
        {currency}
        {Number(rangeDiscount.discountedRange.min || 0).toFixed(decimalPlaces)} – {currency}
        {Number(rangeDiscount.discountedRange.max || 0).toFixed(decimalPlaces)}
      </span>
    </div>
  );
};

export default DiscountPriceCompact;
