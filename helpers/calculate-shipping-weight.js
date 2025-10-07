// Static weights in grams for bottles (bottle + liquid) and boxes
// Source: customer-provided sheet

const BOTTLE_WEIGHT_GRAMS = {
  '1.1ml': 11,
  '1ml': 11,
  '5ml': 38,
  '20ml': 65,
  '30ml': 82,
  '50ml': 128,
  '100ml': 211,
  '250ml': 310,
  '500ml': 593,
  '1000ml': 1135,
  '1 gallon': 4180,
};

const BOX_WEIGHT_GRAMS = {
  small: 135,
  medium: 380,
  large: 485,
};

// Box dimensions in inches
const BOX_DIMENSIONS_IN = {
  small: { length: 7, width: 7, height: 7, unit: 'in' },
  medium: { length: 10, width: 10, height: 10, unit: 'in' },
  large: { length: 14, width: 14, height: 14, unit: 'in' },
};

// Volume mapping in milliliters for supported sizes
const VOLUME_ML = {
  '1.1ml': 1.1,
  '1ml': 1,
  '5ml': 5,
  '20ml': 20,
  '30ml': 30,
  '50ml': 50,
  '100ml': 100,
  '250ml': 250,
  '500ml': 500,
  '1000ml': 1000,
  '1 gallon': 3785,
};

/**
 * Determine box size based on subtotal price rules.
 * Rules:
 *  - price < 100  => small
 *  - 100 - 1000   => medium
 *  - > 1000       => large
 * @param {number} subtotal
 * @returns {'small'|'medium'|'large'}
 */
function getBoxSizeBySubtotal(subtotal) {
  if (subtotal < 100) return 'small';
  if (subtotal <= 1000) return 'medium';
  return 'large';
}

function gramsToPounds(grams) {
  return (grams / 454) * 1.15;
}

/**
 * Calculate total package weight from cart items.
 * Accepts items shaped like:
 *   { Volume: '20ml', quantity: 5, Price: 127, totalPrice: 635, selectedVolume: '20ml' }
 * Only `quantity` and the volume (from `selectedVolume` or `Volume`) are needed for weight.
 * Subtotal can be derived from `totalPrice` or `Price * quantity` for box selection.
 *
 * @param {Array<Object>} items
 * @returns {{ totalGrams: number, totalPounds: number, totalKgs: number, totalMiligrams: number, totalMilliliters: number, totalPrice: number, box: { size: string, grams: number }, details: Array<{volume: string, gramsPerUnit: number, quantity: number, gramsTotal: number, price: number, gramToTotalPrice: number}> }}
 */
export function calculateShippingWeight(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      totalGrams: 0,
      totalPounds: 0,
      totalKgs: 0,
      totalMiligrams: 0,
      totalMilliliters: 0,
      totalPrice: 0,
      box: { size: 'small', grams: 0 },
      details: [],
    };
  }

  // Compute subtotal
  const subtotal = items.reduce((sum, item) => {
    const qty = Number(item.quantity) || 0;
    const total = Number(item.totalPrice);
    if (!Number.isNaN(total) && total > 0) return sum + total;
    const price = Number(item.Price) || 0;
    return sum + price * qty;
  }, 0);

  // Determine box
  const boxSize = getBoxSizeBySubtotal(subtotal);
  const boxGrams = BOX_WEIGHT_GRAMS[boxSize] || 0;
  const boxDimensions = BOX_DIMENSIONS_IN[boxSize] || null;

  // Sum bottle weights and total liquid volume (ml)
  const details = [];
  let totalMilliliters = 0;
  const bottlesGrams = items.reduce((sum, item) => {
    const volumeString = String(item.selectedVolume || item.Volume || '').trim();
    let volume = volumeString;
    let mlPerUnit = 0;

    // Try to extract the first number followed by "ml" in the string
    const mlMatch = volumeString.match(/([\d.]+)\s*ml/i);
    if (mlMatch) {
      mlPerUnit = parseFloat(mlMatch[1]);
      volume = `${mlPerUnit}ml`;
    } else {
      // Fallback: try to parse as a number directly
      mlPerUnit = parseFloat(volumeString) || 0;
      volume = volumeString;
    }

    const gramsPerUnit = BOTTLE_WEIGHT_GRAMS[volume] || 0;
    const quantity = Number(item.quantity) || 0;
    const gramsTotal = gramsPerUnit * quantity;
    totalMilliliters += mlPerUnit * quantity;
    const price = Number(item.Price) || 0;
    const totalPrice =
      !Number.isNaN(Number(item.totalPrice)) && Number(item.totalPrice) > 0
        ? Number(item.totalPrice)
        : price * quantity;
    const pricePerGram = gramsPerUnit > 0 ? price / gramsPerUnit : 0;
    const gramToTotalPrice = pricePerGram * gramsTotal;
    details.push({ volume, gramsPerUnit, quantity, gramsTotal, price, gramToTotalPrice });
    return sum + gramsTotal;
  }, 0);

  const totalGrams = bottlesGrams + boxGrams;
  const totalPounds = gramsToPounds(totalGrams);
  const totalKgs = totalGrams / 1000;
  // Per requirement: use total liquid volume for milligrams (treat mg == ml numerically)
  const totalMiligrams = totalMilliliters;

  return {
    totalGrams,
    totalPounds,
    totalKgs,
    totalMiligrams,
    totalMilliliters,
    totalPrice: subtotal,
    box: { size: boxSize, grams: boxGrams, dimensions: boxDimensions },
    details,
  };
}

export default calculateShippingWeight;
