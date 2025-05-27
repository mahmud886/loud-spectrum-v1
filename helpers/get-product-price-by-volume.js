/**
 * Get the subproduct for a specific volume
 * @param {Array} subproducts - Array of subproducts
 * @param {string} selectedVolume - The selected volume to get price for
 * @returns {Object|null} - The matching subproduct or null if not found
 */
export const getProductPriceByVolume = (subproducts, selectedVolume) => {
  if (!subproducts || !selectedVolume) return null;

  const subproduct = subproducts.find((sub) => {
    if (!sub.attribute) return false;

    try {
      const attribute = typeof sub.attribute === 'string' ? JSON.parse(sub.attribute) : sub.attribute;

      return attribute.volume === selectedVolume;
    } catch (error) {
      console.error('Error parsing attribute:', error);
      return false;
    }
  });

  return subproduct?.price || null;
};
