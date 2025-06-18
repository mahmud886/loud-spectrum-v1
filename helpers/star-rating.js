import { Star } from 'lucide-react';

/**
 * Calculate average rating from an array of reviews
 * @param {Array} reviews - Array of review objects with rating property
 * @returns {number} Average rating (0-5)
 */
export const calculateAverageRating = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  return totalRating / reviews.length;
};

/**
 * Render star components based on a rating value
 * @param {number} rating - Rating value (0-5)
 * @param {Object} options - Configuration options
 * @param {number} options.size - Star size (default: 15)
 * @param {string} options.fillColor - Color for filled stars (default: '#00000')
 * @param {string} options.strokeColor - Color for empty star stroke (default: '#00000')
 * @returns {Array} Array of Star components
 */
export const renderStars = (rating, options = {}) => {
  const { size = 15, fillColor = '#00000', strokeColor = '#00000' } = options;
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  // Full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} size={size} fill={fillColor} />);
  }

  // Half star
  if (hasHalfStar) {
    stars.push(<Star key="half" size={size} fill={fillColor} />);
  }

  // Empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<Star key={`empty-${i}`} size={size} fill="none" stroke={strokeColor} />);
  }

  return stars;
};

/**
 * Get star rating display data
 * @param {Array} reviews - Array of review objects
 * @param {Object} options - Configuration options for stars
 * @returns {Object} Object containing averageRating and starComponents
 */
export const getStarRatingData = (reviews, options = {}) => {
  const averageRating = calculateAverageRating(reviews);
  const starComponents = renderStars(averageRating, options);

  return {
    averageRating,
    starComponents,
    reviewCount: reviews?.length || 0,
  };
};
