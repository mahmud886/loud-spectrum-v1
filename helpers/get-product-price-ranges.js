/**
 * Gets the minimum and maximum price from subproducts
 * @param {Object|Array} productOrSubProducts - Either a product object containing subProducts or a subProducts array directly
 * @returns {{min: number, max: number}} Object containing minimum and maximum prices
 */
export const getProductPriceRange = (productOrSubProducts) => {
  // Get subProducts array - either directly or from product object
  let subProducts;
  if (Array.isArray(productOrSubProducts)) {
    subProducts = productOrSubProducts;
  } else if (productOrSubProducts?.subProducts) {
    subProducts = productOrSubProducts.subProducts;
  } else {
    // console.warn('No valid subProducts found:', productOrSubProducts);
    return { min: 0, max: 0 };
  }

  // Check if subProducts is empty
  if (subProducts.length === 0) {
    // console.warn('subProducts array is empty');
    return { min: 0, max: 0 };
  }

  // Extract prices from subproducts
  const prices = subProducts
    .map((subProduct) => {
      try {
        if (!subProduct.price) {
          // console.warn('No price found in subProduct:', subProduct);
          return null;
        }
        return parseFloat(subProduct.price);
      } catch (e) {
        // console.error('Error processing subProduct price:', e);
        return null;
      }
    })
    .filter((price) => price !== null);

  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
};
