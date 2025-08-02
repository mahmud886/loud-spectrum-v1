/**
 * Helper function to get dynamic color classes based on category name
 * @param {string} categoryName - The category name to get colors for
 * @param {boolean} borderOnly - Whether to return only border color classes (default: false)
 * @returns {string} CSS classes for border and/or text colors
 */
export const getCategoryColorClasses = (categoryName, borderOnly = false) => {
  if (!categoryName) return borderOnly ? 'border-umbra-100' : 'border-umbra-100 text-umbra-100';

  const category = categoryName.toLowerCase();
  switch (category) {
    case 'alive':
      return borderOnly ? 'border-alive' : 'border-alive text-alive';
    case 'sweet':
      return borderOnly ? 'border-sweet' : 'border-sweet text-sweet';
    case 'classic':
      return borderOnly ? 'border-classic' : 'border-classic text-classic';
    case 'dank':
      return borderOnly ? 'border-dank' : 'border-dank text-dank';
    default:
      return borderOnly ? 'border-umbra-100' : 'border-umbra-100 text-umbra-100';
  }
};

/**
 * Helper function to get only border color classes based on category name
 * @param {string} categoryName - The category name to get border color for
 * @returns {string} CSS classes for border color only
 */
export const getCategoryBorderClasses = (categoryName) => {
  return getCategoryColorClasses(categoryName, true);
};

/**
 * Helper function to get only text color classes based on category name
 * @param {string} categoryName - The category name to get text color for
 * @returns {string} CSS classes for text color only
 */
export const getCategoryTextClasses = (categoryName) => {
  if (!categoryName) return 'text-umbra-100';

  const category = categoryName.toLowerCase();
  switch (category) {
    case 'alive':
      return 'text-alive';
    case 'sweet':
      return 'text-sweet';
    case 'classic':
      return 'text-classic';
    case 'dank':
      return 'text-dank';
    default:
      return 'text-umbra-100';
  }
};
