'use client';
import { calculateDiscount } from '@/helpers/calculate-discount';

/**
 * Summary version of discount price display for cart and checkout components
 * @param {Object} props
 * @param {Object} props.category - Category object with discount information
 * @param {number} props.price - The price to display
 * @param {number} props.quantity - Quantity for total calculation (optional)
 * @param {string} props.originalPriceClass - CSS class for original price (crossed out)
 * @param {string} props.discountedPriceClass - CSS class for discounted price
 * @param {string} props.regularPriceClass - CSS class for regular price (no discount)
 * @param {string} props.discountTextClass - CSS class for discount text
 * @param {string} props.totalClass - CSS class for total price
 * @param {boolean} props.showOriginalPrice - Whether to show original price (default: true)
 * @param {boolean} props.showDiscountText - Whether to show discount text (default: true)
 * @param {boolean} props.showTotal - Whether to show total with quantity (default: false)
 * @param {string} props.containerClass - CSS class for the container
 * @param {string} props.currency - Currency symbol (default: '$')
 * @param {number} props.decimalPlaces - Number of decimal places (default: 2)
 * @param {number} props.minimumPrice - Minimum price after discount (default: 10)
 */
const DiscountPriceSummary = ({
  category,
  price,
  quantity = 1,
  originalPriceClass = 'text-sm text-gray-500 line-through',
  discountedPriceClass = 'text-base font-semibold text-green-600',
  regularPriceClass = 'text-base font-semibold text-gray-900',
  discountTextClass = 'text-xs text-green-600 font-bold',
  totalClass = 'text-lg font-bold text-green-600',
  containerClass = 'flex flex-col gap-1',
  showOriginalPrice = true,
  showDiscountText = true,
  showTotal = false,
  currency = '$',
  decimalPlaces = 2,
  minimumPrice = 10,
}) => {
  if (!price) {
    return null;
  }

  const discountInfo = calculateDiscount(category, price, minimumPrice);
  const totalOriginalPrice = discountInfo.originalPrice * quantity;
  const totalDiscountedPrice = discountInfo.discountedPrice * quantity;

  if (!discountInfo.hasDiscount) {
    // No discount - show regular price
    return (
      <div className={containerClass}>
        <span className={regularPriceClass}>
          {currency}
          {price.toFixed(decimalPlaces)}
          {quantity > 1 && ` × ${quantity}`}
        </span>
        {showTotal && quantity > 1 && (
          <span className={totalClass}>
            Total: {currency}
            {totalOriginalPrice.toFixed(decimalPlaces)}
          </span>
        )}
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
            {discountInfo.originalPrice.toFixed(decimalPlaces)}
            {quantity > 1 && ` × ${quantity}`}
          </span>
        )}
        {showDiscountText && discountInfo.hasDiscount && (
          <span className={discountTextClass}>
            {discountInfo.discountType === 'Percentage'
              ? `${discountInfo.discountPercentage.toFixed(0)}% OFF`
              : `$${discountInfo.discountAmount.toFixed(2)} OFF`}
          </span>
        )}
      </div>

      {/* Second line: Discounted price */}
      <span className={discountedPriceClass}>
        {currency}
        {discountInfo.discountedPrice.toFixed(decimalPlaces)}
        {quantity > 1 && ` × ${quantity}`}
      </span>

      {/* Third line: Total (if enabled and quantity > 1) */}
      {showTotal && quantity > 1 && (
        <div className="flex items-center gap-2">
          {showOriginalPrice && discountInfo.hasDiscount && (
            <span className={originalPriceClass}>
              Total: {currency}
              {totalOriginalPrice.toFixed(decimalPlaces)}
            </span>
          )}
          <span className={totalClass}>
            Total: {currency}
            {totalDiscountedPrice.toFixed(decimalPlaces)}
          </span>
        </div>
      )}

      {/* Fourth line: Total savings (if quantity > 1) */}
      {showDiscountText && discountInfo.hasDiscount && quantity > 1 && (
        <span className={discountTextClass}>
          {discountInfo.discountType === 'Percentage'
            ? `${discountInfo.discountPercentage.toFixed(0)}% OFF`
            : `$${discountInfo.discountAmount.toFixed(2)} OFF`}
          {` (${currency}${(discountInfo.discountAmount * quantity).toFixed(decimalPlaces)} total savings)`}
        </span>
      )}
    </div>
  );
};

export default DiscountPriceSummary;
