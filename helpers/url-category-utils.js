/**
 * Encode category name for URL usage
 * Converts spaces to hyphens and applies URL encoding
 * @param {string} categoryName - The category name to encode
 * @returns {string} - URL-safe encoded category name
 */
export function encodeCategoryForUrl(categoryName) {
  if (!categoryName) return '';

  // Convert to lowercase, replace spaces with hyphens, then URL encode
  return encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, '-'));
}

/**
 * Decode category name from URL
 * Converts hyphens back to spaces and applies URL decoding
 * @param {string} urlCategory - The URL category to decode
 * @returns {string} - Decoded category name
 */
export function decodeCategoryFromUrl(urlCategory) {
  if (!urlCategory) return '';

  // URL decode first, then replace hyphens with spaces
  return decodeURIComponent(urlCategory).replace(/-/g, ' ');
}

/**
 * Get category name from pathname
 * Extracts and decodes the category from a shop pathname
 * @param {string} pathname - The current pathname
 * @returns {string} - Decoded category name
 */
export function getCategoryFromPathname(pathname) {
  const urlCategory = pathname.split('/shop/')[1] || '';
  return decodeCategoryFromUrl(urlCategory);
}
