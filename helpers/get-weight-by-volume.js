/**
 * Converts volume in milliliters to weight in pounds
 * @param {number} volumeInMl - Volume in milliliters
 * @param {number} minWeight - Minimum weight to return (default: 0.01)
 * @returns {string} Weight in pounds as a string with 2 decimal places
 */
export function getWeightByVolume(volumeInMl, minWeight = 0.01) {
  if (!volumeInMl || volumeInMl <= 0) {
    return minWeight.toFixed(2);
  }

  // Convert milliliters to pounds
  // 1 ml ≈ 1 gram, 1 pound = 453.592 grams
  const weightInPounds = (volumeInMl / 453.592).toFixed(2);

  // Ensure minimum weight
  return weightInPounds === '0.00' ? minWeight.toFixed(2) : weightInPounds;
}
