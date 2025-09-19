## Shipping Weight Helper

This document describes how to use the shipping weight calculator helper located at `helpers/calculate-shipping-weight.js`.

### What it does

- **Computes total package weight** from cart items using static bottle weights (bottle + liquid).
- **Selects box size** based on cart subtotal and adds the appropriate box weight.
- **Returns pounds and grams**, selected box size, box dimensions, and a per-line breakdown, including price-based metrics.
- Tracks liquid volume and exposes `totalMilliliters`; per requirement, `totalMiligrams` equals `totalMilliliters` numerically.

### Static data used

- **Bottle weights (grams)**

  - 1ml: 11
  - 5ml: 38
  - 20ml: 65
  - 30ml: 82
  - 50ml: 128
  - 100ml: 211
  - 250ml: 310
  - 500ml: 593
  - 1000ml: 1135
  - 1 gallon: 4180

- **Box weights (grams)**

  - small: 135
  - medium: 380
  - large: 485

- **Box dimensions (inches)**

  - small: 7 × 7 × 7
  - medium: 10 × 10 × 10
  - large: 14 × 14 × 14

- **Box selection rules by subtotal**
  - subtotal < 100 → small
  - 100 ≤ subtotal ≤ 1000 → medium
  - subtotal > 1000 → large

### API

Function: `calculateShippingWeight(items)` from `helpers/calculate-shipping-weight.js`

Input `items`: Array of objects with these relevant fields:

- `selectedVolume` or `Volume`: one of the supported sizes above
- `quantity`: number of units
- `Price`: unit price
- `totalPrice` (optional): total for the line; if omitted, it is computed as `Price * quantity`

Return shape:

```ts
{
  totalGrams: number,
  totalPounds: number,
  totalKgs: number,
  totalMiligrams: number, // equals totalMilliliters numerically
  totalMilliliters: number,
  totalPrice: number,
  box: { size: 'small'|'medium'|'large', grams: number, dimensions: { length: number, width: number, height: number, unit: 'in' } },
  details: Array<{
    volume: string,
    gramsPerUnit: number,
    quantity: number,
    gramsTotal: number,
    price: number,
    gramToTotalPrice: number
  }>
}
```

Notes:

- `totalPrice` is the cart subtotal used for box selection.
- `totalKgs` derives from `totalGrams`.
- `totalMiligrams` equals `totalMilliliters` numerically (treating 1 ml ≈ 1 mg here).
- `gramToTotalPrice` is computed as `(price / gramsPerUnit) * gramsTotal` and typically equals the line `totalPrice` when the provided data is consistent.
- Pounds are computed using 453.59237 grams per pound.

### Usage example

```javascript
import calculateShippingWeight from '@/helpers/calculate-shipping-weight';

const items = [
  { Volume: '1ml', Price: 10, quantity: 3, totalPrice: 30, selectedVolume: '1ml' },
  { Volume: '20ml', Price: 127, quantity: 5, totalPrice: 635, selectedVolume: '20ml' },
  { Volume: '50ml', Price: 289, quantity: 2, totalPrice: 578, selectedVolume: '50ml' },
  { Volume: '1000ml', Price: 2999, quantity: 1, totalPrice: 2999, selectedVolume: '1000ml' },
];

const result = calculateShippingWeight(items);

console.log(result.totalGrams); // total weight in grams (bottles + box)
console.log(result.totalPounds); // total weight in pounds
console.log(result.totalKgs); // total weight in kilograms
console.log(result.totalMiligrams); // equals totalMilliliters numerically
console.log(result.totalMilliliters);
console.log(result.totalPrice); // cart subtotal used for box selection
console.log(result.box); // { size, grams, dimensions }
console.log(result.details);
/* Example detail entry
{
  volume: '1ml',
  gramsPerUnit: 11,
  quantity: 4,
  gramsTotal: 44,
  price: 10,
  gramToTotalPrice: 40
}
*/
```
