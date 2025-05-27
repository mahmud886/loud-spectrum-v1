/**
 * Parses product attributes from subProducts
 * @param {Object|Array} productOrSubProducts - Either a product object containing subProducts or a subProducts array directly
 * @param {string} attributeKey - The key of the attribute to extract (e.g. 'volume')
 * @returns {Array<{value: string, label: string}>} Array of parsed attribute options
 */
export const parseProductAttributes = (productOrSubProducts, attributeKey) => {
  // Get subProducts array - either directly or from product object
  let subProducts;
  if (Array.isArray(productOrSubProducts)) {
    subProducts = productOrSubProducts;
  } else if (productOrSubProducts?.subProducts) {
    subProducts = productOrSubProducts.subProducts;
  } else {
    console.warn('No valid subProducts found:', productOrSubProducts);
    return [];
  }

  // Check if subProducts is empty
  if (subProducts.length === 0) {
    console.warn('subProducts array is empty');
    return [];
  }

  return subProducts
    .map((subProduct, index) => {
      try {
        // Check if attribute exists
        if (!subProduct.attribute) {
          console.warn(`No attribute found in subProduct ${index}`);
          return null;
        }

        // Try to parse the attribute
        let attributes;
        try {
          attributes = JSON.parse(subProduct.attribute);
        } catch (e) {
          console.warn(`Failed to parse attribute JSON in subProduct ${index}:`, subProduct.attribute);
          return null;
        }

        // Check if the requested attribute exists
        const value = attributes[attributeKey];
        if (!value) {
          console.warn(`No ${attributeKey} found in attributes:`, attributes);
          return null;
        }

        return {
          value,
          label: value,
        };
      } catch (e) {
        console.error(`Error processing subProduct ${index}:`, e);
        return null;
      }
    })
    .filter(Boolean);
};
