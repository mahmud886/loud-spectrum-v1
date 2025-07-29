'use client';
import { calculateDiscount, calculateDiscountForRange, formatDiscountedPrice } from '@/helpers/calculate-discount';

/**
 * Reusable component for displaying discounted prices
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
 * @param {boolean} props.showDiscountText - Whether to show discount text (default: true)
 * @param {string} props.containerClass - CSS class for the container
 * @param {string} props.currency - Currency symbol (default: '$')
 * @param {number} props.decimalPlaces - Number of decimal places (default: 2)
 * @param {number} props.minimumPrice - Minimum price after discount (default: 10)
 */
const DiscountPriceDisplay = ({
  category,
  minPrice,
  maxPrice,
  selectedPrice,
  originalPriceClass = 'text-18px text-umbra-100/50 line-through',
  discountedPriceClass = 'text-alive text-[22px]',
  regularPriceClass = 'text-umbra-100 text-[22px]',
  discountTextClass = 'text-alive text-[14px] font-bold',
  containerClass = 'flex flex-col gap-1',
  showOriginalPrice = true,
  showDiscountText = true,
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
    const formattedPrice = formatDiscountedPrice(discountInfo, showOriginalPrice);

    if (!discountInfo.hasDiscount) {
      // No discount - show regular price
      return (
        <div className={containerClass}>
          <span className={regularPriceClass}>
            {currency}
            {selectedPrice.toFixed(decimalPlaces)}
          </span>
        </div>
      );
    }

    return (
      <div className={containerClass}>
        {/* First line: Original price and discount text inline */}
        <div className="flex items-center gap-2">
          {showOriginalPrice && formattedPrice.originalPrice && (
            <span className={originalPriceClass}>{formattedPrice.originalPrice.replace('$', currency)}</span>
          )}
          {showDiscountText && formattedPrice.discountText && (
            <span className={discountTextClass}>{formattedPrice.discountText}</span>
          )}
        </div>
        {/* Second line: Discounted price */}
        <span className={discountedPriceClass}>{formattedPrice.displayPrice.replace('$', currency)}</span>
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
          {minPrice.toFixed(decimalPlaces)} – {currency}
          {maxPrice.toFixed(decimalPlaces)}
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
            {minPrice.toFixed(decimalPlaces)} – {currency}
            {maxPrice.toFixed(decimalPlaces)}
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
        {rangeDiscount.discountedRange.min.toFixed(decimalPlaces)} – {currency}
        {rangeDiscount.discountedRange.max.toFixed(decimalPlaces)}
      </span>
    </div>
  );
};

export default DiscountPriceDisplay;
