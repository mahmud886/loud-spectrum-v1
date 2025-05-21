/**
 * Parses product attributes from subProducts
 * @param {Object} product - The product object containing subProducts
 * @param {string} attributeKey - The key of the attribute to extract (e.g. 'volume')
 * @returns {Array<{value: string, label: string}>} Array of parsed attribute options
 */
export const parseProductAttributes = (product, attributeKey) => {
  if (!product?.subProducts) return [];

  return product.subProducts
    .map((subProduct) => {
      try {
        const attributes = JSON.parse(subProduct.attribute);
        const value = attributes[attributeKey];
        if (!value) return null;

        return {
          value,
          label: value,
        };
      } catch (e) {
        console.error('Error parsing subProduct attributes:', e);
        return null;
      }
    })
    .filter(Boolean);
};
