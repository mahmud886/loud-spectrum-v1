/**
 * Helper functions for dynamic translations
 */

/**
 * Get translated category name with fallback
 * @param {Function} tCategories - Translation function for ProductCategories
 * @param {Function} tFallback - Fallback translation function
 * @param {Object} category - Category object with slug and name
 * @param {string} fallbackKey - Fallback translation key (default: 'tag')
 * @returns {string} Translated category name
 */
export const getTranslatedCategoryName = (tCategories, tFallback, category, fallbackKey = 'tag') => {
  if (!category?.slug) {
    return tFallback(fallbackKey);
  }

  try {
    return tCategories(category.slug);
  } catch (error) {
    // If translation doesn't exist, fallback to category name or fallback key
    return category?.name || tFallback(fallbackKey);
  }
};

/**
 * Get translated category name (client component version)
 * @param {Function} tCategories - Translation function for ProductCategories
 * @param {string} categorySlug - Category slug
 * @param {string} fallbackName - Fallback category name
 * @returns {string} Translated category name
 */
export const getTranslatedCategoryNameBySlug = (tCategories, categorySlug, fallbackName = '') => {
  if (!categorySlug) {
    return fallbackName;
  }

  try {
    return tCategories(categorySlug);
  } catch (error) {
    return fallbackName;
  }
};

/**
 * Check if a translation key exists
 * @param {Function} t - Translation function
 * @param {string} key - Translation key to check
 * @returns {boolean} True if key exists, false otherwise
 */
export const hasTranslation = (t, key) => {
  try {
    const translation = t(key);
    return translation !== key; // If key doesn't exist, it returns the key itself
  } catch (error) {
    return false;
  }
};

/**
 * Get translated text with fallback
 * @param {Function} t - Translation function
 * @param {string} key - Translation key
 * @param {string} fallback - Fallback text
 * @returns {string} Translated text or fallback
 */
export const getTranslationWithFallback = (t, key, fallback) => {
  try {
    const translation = t(key);
    return translation !== key ? translation : fallback;
  } catch (error) {
    return fallback;
  }
};
