/**
 * Wholesale Product Price Calculation Helper
 *
 * This helper function calculates wholesale product prices based on tiered pricing tables.
 * Input quantities are in milliliters (ml) and are converted to grams (g) for calculation.
 *
 * Pricing Tables:
 * - Alive: Higher pricing tiers
 * - Classic: Mid-range pricing tiers
 * - Sweet/Dank: Lower pricing tiers
 */

// ML to Gram conversion factor (assuming 1ml = 1g for liquid products)
const ML_TO_GRAM_CONVERSION = 1;

// Pricing table configurations
const PRICING_TABLES = {
  alive: [
    { minQty: 1, maxQty: 4.12, pricePerGram: 10.0 },
    { minQty: 4.12, maxQty: 16.5, pricePerGram: 9.47 },
    { minQty: 16.5, maxQty: 41.25, pricePerGram: 8.48 },
    { minQty: 41.25, maxQty: 82.5, pricePerGram: 7.58 },
    { minQty: 82.5, maxQty: 206.25, pricePerGram: 7.26 },
    { minQty: 206.25, maxQty: 412.5, pricePerGram: 6.98 },
    { minQty: 412.5, maxQty: 825, pricePerGram: 6.67 },
    { minQty: 825, maxQty: 3124, pricePerGram: 6.06 },
    { minQty: 3124, maxQty: Infinity, pricePerGram: 5.44 },
  ],
  classic: [
    { minQty: 1, maxQty: 4.25, pricePerGram: 9.0 },
    { minQty: 4.25, maxQty: 17, pricePerGram: 8.33 },
    { minQty: 17, maxQty: 42.5, pricePerGram: 7.0 },
    { minQty: 42.5, maxQty: 85, pricePerGram: 5.79 },
    { minQty: 85, maxQty: 212.5, pricePerGram: 4.29 },
    { minQty: 212.5, maxQty: 425, pricePerGram: 3.25 },
    { minQty: 425, maxQty: 850, pricePerGram: 2.79 },
    { minQty: 850, maxQty: 3217, pricePerGram: 2.21 },
    { minQty: 3217, maxQty: Infinity, pricePerGram: 0.9 },
  ],
  sweet: [
    { minQty: 1, maxQty: 4.25, pricePerGram: 9.0 },
    { minQty: 4.25, maxQty: 17, pricePerGram: 8.33 },
    { minQty: 17, maxQty: 42.5, pricePerGram: 7.59 },
    { minQty: 42.5, maxQty: 85, pricePerGram: 6.49 },
    { minQty: 85, maxQty: 212.5, pricePerGram: 4.52 },
    { minQty: 212.5, maxQty: 425, pricePerGram: 3.72 },
    { minQty: 425, maxQty: 850, pricePerGram: 2.9 },
    { minQty: 850, maxQty: 3217, pricePerGram: 2.44 },
    { minQty: 3217, maxQty: Infinity, pricePerGram: 1.09 },
  ],
  dank: [
    { minQty: 1, maxQty: 4.25, pricePerGram: 9.0 },
    { minQty: 4.25, maxQty: 17, pricePerGram: 8.33 },
    { minQty: 17, maxQty: 42.5, pricePerGram: 7.59 },
    { minQty: 42.5, maxQty: 85, pricePerGram: 6.49 },
    { minQty: 85, maxQty: 212.5, pricePerGram: 4.52 },
    { minQty: 212.5, maxQty: 425, pricePerGram: 3.72 },
    { minQty: 425, maxQty: 850, pricePerGram: 2.9 },
    { minQty: 850, maxQty: 3217, pricePerGram: 2.44 },
    { minQty: 3217, maxQty: Infinity, pricePerGram: 1.09 },
  ],
};

/**
 * Convert milliliters to grams
 * @param {number} ml - Quantity in milliliters
 * @returns {number} - Quantity in grams
 */
export const convertMlToGrams = (ml) => {
  return ml * ML_TO_GRAM_CONVERSION;
};

/**
 * Get the appropriate pricing table based on product line
 * @param {string} line - Product line (Alive, Classic, Sweet, Dank)
 * @returns {Array} - Pricing table array
 */
const getPricingTable = (line) => {
  const normalizedLine = line?.toLowerCase();

  switch (normalizedLine) {
    case 'alive':
      return PRICING_TABLES.alive;
    case 'classic':
      return PRICING_TABLES.classic;
    case 'sweet':
      return PRICING_TABLES.sweet;
    case 'dank':
      return PRICING_TABLES.dank;
    default:
      // Default to classic pricing if line is not recognized
      return PRICING_TABLES.classic;
  }
};

/**
 * Calculate price for a single product based on quantity and line
 * @param {number} quantityMl - Quantity in milliliters
 * @param {string} line - Product line (Alive, Classic, Sweet, Dank)
 * @returns {Object} - Price calculation result
 */
export const calculateProductPrice = (quantityMl, line) => {
  if (!quantityMl || quantityMl <= 0) {
    return {
      quantityMl: 0,
      quantityGrams: 0,
      pricePerGram: 0,
      totalPrice: 0,
      tier: null,
      line: line || 'Unknown',
    };
  }

  const quantityGrams = convertMlToGrams(quantityMl);
  const pricingTable = getPricingTable(line);

  // Find the appropriate pricing tier
  const tier = pricingTable.find((tier) => quantityGrams > tier.minQty && quantityGrams <= tier.maxQty);

  if (!tier) {
    // Fallback to highest tier if no match found
    const fallbackTier = pricingTable[pricingTable.length - 1];
    return {
      quantityMl,
      quantityGrams,
      pricePerGram: fallbackTier.pricePerGram,
      totalPrice: quantityGrams * fallbackTier.pricePerGram,
      tier: fallbackTier,
      line: line || 'Unknown',
    };
  }

  const totalPrice = quantityGrams * tier.pricePerGram;

  return {
    quantityMl,
    quantityGrams,
    pricePerGram: tier.pricePerGram,
    totalPrice,
    tier,
    line: line || 'Unknown',
  };
};

/**
 * Calculate total price for multiple cart items
 * @param {Array} cartItems - Array of cart items with qty (in ml) and line properties
 * @returns {Object} - Total calculation result
 */
export const calculateCartTotal = (cartItems) => {
  if (!cartItems || cartItems.length === 0) {
    return {
      items: [],
      subtotal: 0,
      totalItems: 0,
      totalQuantityMl: 0,
      totalQuantityGrams: 0,
    };
  }

  const calculatedItems = cartItems.map((item) => {
    const calculation = calculateProductPrice(item.qty, item.line);
    return {
      ...item,
      calculation,
      itemTotal: calculation.totalPrice,
    };
  });

  const subtotal = calculatedItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const totalQuantityMl = calculatedItems.reduce((sum, item) => sum + item.qty, 0);
  const totalQuantityGrams = calculatedItems.reduce((sum, item) => sum + item.calculation.quantityGrams, 0);

  return {
    items: calculatedItems,
    subtotal,
    totalItems: cartItems.length,
    totalQuantityMl,
    totalQuantityGrams,
  };
};

/**
 * Format price for display
 * @param {number} price - Price to format
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price, currency = '$') => {
  return `${currency}${price.toFixed(2)}`;
};

/**
 * Get pricing tier information for display
 * @param {string} line - Product line
 * @returns {Array} - Pricing tiers with formatted display
 */
export const getPricingTiers = (line) => {
  const pricingTable = getPricingTable(line);

  return pricingTable.map((tier) => ({
    ...tier,
    rangeDisplay: tier.maxQty === Infinity ? `> ${tier.minQty}g` : `${tier.minQty}g - ${tier.maxQty}g`,
    priceDisplay: formatPrice(tier.pricePerGram),
  }));
};
