// Helpers for formatting volume labels with grams-first display

function detectSupportedCategory(product) {
  const name = (product?.category?.name || '').toLowerCase();
  if (name === 'alive') return 'alive';
  if (name === 'classic' || name === 'dank' || name === 'sweet') return 'botanical';
  return null;
}

function normalizeMl(value) {
  if (value == null) return '';
  let ml = String(value).toLowerCase().trim();
  // remove spaces and commas (e.g., "1,000 ml" -> "1000ml")
  ml = ml.replace(/[,\s]+/g, '');
  // ensure it ends with ml
  if (!ml.endsWith('ml')) ml = `${ml}ml`;
  // business rule: treat 1ml option as 1.1ml for display/mapping
  if (ml === '1ml') return '1.1ml';
  return ml;
}

const gramsByVolumeAlive = {
  '1.1ml': '1g',
  '5ml': '4.12g',
  '20ml': '16.5g',
  '50ml': '41.25g',
  '100ml': '82.5g',
  '1000ml': '825g',
};

const gramsByVolumeBotanical = {
  '1.1ml': '1g',
  '5ml': '4.25g',
  '20ml': '17g',
  '50ml': '42.5g',
  '100ml': '85g',
  '1000ml': '850g',
  '1 Gallon': '3217g',
};

export function getVolumeGramsLabel(volumeMl, isAliveOrBotanical) {
  const ml = normalizeMl(volumeMl);
  const table = isAliveOrBotanical === 'alive' ? gramsByVolumeAlive : gramsByVolumeBotanical;
  return table[ml] || null;
}

export function formatVolumeLabel(volumeMl, isAliveOrBotanical) {
  const grams = getVolumeGramsLabel(volumeMl, isAliveOrBotanical);
  if (!grams) return null;
  const ml = normalizeMl(volumeMl);
  const prettyMl = ml === '1000ml' ? '1,000ml' : ml;
  return `${grams} (${prettyMl})`;
}

export function formatVolumeLabelForProduct(option, product) {
  const supported = detectSupportedCategory(product);
  if (!supported) return null;
  const ml = option?.value;
  return formatVolumeLabel(ml, supported);
}

export default formatVolumeLabelForProduct;
