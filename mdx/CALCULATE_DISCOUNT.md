# 🏷️ Calculate Discount Documentation

This document provides a comprehensive overview of the discount calculation system in the Loud Spectrum v1 project, including its functions, usage patterns, and implementation details.

---

## 🚦 Overview

The discount calculation system provides flexible pricing functionality that supports both percentage-based and fixed-amount discounts. It's designed to handle various discount scenarios while ensuring prices never fall below a minimum threshold and providing comprehensive discount information for UI display.

---

## 🗂️ Main Functions & Files

- **`helpers/calculate-discount.js`**
  The core module containing all discount calculation functions and utilities.

### Primary Functions:

- `calculateDiscount()` – Main discount calculation function
- `calculateDiscountForRange()` – Handles price range discounts
- `calculateDiscountForSelectedPrice()` – Calculates discount for specific prices
- `formatDiscountedPrice()` – Formats prices for display

---

## 🔧 Function Details

### `calculateDiscount(category, originalPrice, minimumPrice = 1)`

**Purpose:** Calculates discount for a single product based on category discount settings.

**Parameters:**

- `category` (Object) – Category object with discount information
- `originalPrice` (number) – Original price to calculate discount from
- `minimumPrice` (number, optional) – Minimum price after discount (default: 1)

**Returns:**

```javascript
{
  originalPrice: number,
  discountedPrice: number,
  discountAmount: number,
  discountPercentage: number,
  hasDiscount: boolean,
  discountType: string
}
```

**Example:**

```javascript
const category = {
  is_discount_active: true,
  discount_type: 'Percentage',
  discount_value: 20,
};

const result = calculateDiscount(category, 100);
// Returns: {
//   originalPrice: 100,
//   discountedPrice: 80,
//   discountAmount: 20,
//   discountPercentage: 20,
//   hasDiscount: true,
//   discountType: 'Percentage'
// }
```

### `calculateDiscountForRange(category, minPrice, maxPrice, minimumPrice = 1)`

**Purpose:** Calculates discount for price ranges (min and max prices).

**Parameters:**

- `category` (Object) – Category object with discount information
- `minPrice` (number) – Minimum price in the range
- `maxPrice` (number) – Maximum price in the range
- `minimumPrice` (number, optional) – Minimum price after discount (default: 1)

**Returns:**

```javascript
{
  originalRange: { min: number, max: number },
  discountedRange: { min: number, max: number },
  hasDiscount: boolean,
  discountType: string,
  discountValue: number
}
```

### `calculateDiscountForSelectedPrice(category, selectedPrice, minimumPrice = 1)`

**Purpose:** Calculates discount for a specific selected price with null safety.

**Parameters:**

- `category` (Object) – Category object with discount information
- `selectedPrice` (number) – The selected price to apply discount to
- `minimumPrice` (number, optional) – Minimum price after discount (default: 1)

**Returns:** Same structure as `calculateDiscount()` with null safety for selectedPrice.

### `formatDiscountedPrice(discountInfo, showOriginal = true)`

**Purpose:** Formats price display with discount information for UI.

**Parameters:**

- `discountInfo` (Object) – Result from calculateDiscount function
- `showOriginal` (boolean, optional) – Whether to show original price (default: true)

**Returns:**

```javascript
{
  displayPrice: string,      // Main price to display
  originalPrice: string,     // Original price (if showOriginal is true)
  discountedPrice: string,   // Discounted price
  discountText: string       // Discount percentage text
}
```

---

## 🎯 Discount Types

### Percentage Discount

- **Type:** `'Percentage'`
- **Calculation:** `discountAmount = (originalPrice * discount_value) / 100`
- **Example:** 20% off $100 = $80 final price

### Fixed Amount Discount

- **Type:** `'Fixed'`
- **Calculation:** `discountedPrice = originalPrice - discount_value`
- **Safety:** If discount_value >= originalPrice, no discount is applied
- **Example:** $10 off $100 = $90 final price

---

## 🛡️ Safety Features

### Minimum Price Protection

- All functions respect a minimum price threshold (default: $1)
- Prevents prices from going below the minimum
- Automatically recalculates discount amounts when minimum price is enforced

### Null/Invalid Input Handling

- Returns safe defaults when category is null or discount is inactive
- Handles invalid discount values (≤ 0)
- Provides fallback for missing or invalid selectedPrice

### Edge Case Protection

- Fixed discounts greater than original price are ignored
- Zero or negative original prices are handled gracefully
- Percentage calculations avoid division by zero

---

## 🔄 Usage Patterns

### Basic Product Discount

```javascript
import { calculateDiscount } from '@/helpers/calculate-discount';

const product = {
  price: 50,
  category: {
    is_discount_active: true,
    discount_type: 'Percentage',
    discount_value: 15,
  },
};

const discountInfo = calculateDiscount(product.category, product.price);
```

### Price Range Display

```javascript
import { calculateDiscountForRange } from '@/helpers/calculate-discount';

const rangeInfo = calculateDiscountForRange(category, 25, 75);
// Use rangeInfo.discountedRange.min and rangeInfo.discountedRange.max
```

### UI Price Formatting

```javascript
import { formatDiscountedPrice } from '@/helpers/calculate-discount';

const formatted = formatDiscountedPrice(discountInfo, true);
// Returns formatted strings ready for display
```

---

## 🎨 UI Integration

### Display Examples

```javascript
// With discount
{
  displayPrice: "$80.00",
  originalPrice: "$100.00",
  discountedPrice: "$80.00",
  discountText: "20% OFF"
}

// Without discount
{
  displayPrice: "$100.00",
  originalPrice: "$100.00",
  discountedPrice: null,
  discountText: null
}
```

### Conditional Rendering

```javascript
{
  formatted.hasDiscount && <span className="text-gray-500 line-through">{formatted.originalPrice}</span>;
}
<span className="text-primary">{formatted.displayPrice}</span>;
{
  formatted.discountText && <span className="badge bg-red-500">{formatted.discountText}</span>;
}
```

---

## 🛠️ Customization & Extension

### Adding New Discount Types

1. Modify `calculateDiscount()` function
2. Add new discount type logic
3. Update `formatDiscountedPrice()` for proper display

### Custom Minimum Prices

- Pass different `minimumPrice` values per category or product
- Implement dynamic minimum price calculation based on business rules

### Enhanced Formatting

- Extend `formatDiscountedPrice()` for different currencies
- Add locale-specific formatting
- Implement custom discount text templates

---

## 🧪 Testing Scenarios

### Valid Discounts

- Percentage discounts (1% to 99%)
- Fixed amount discounts (less than original price)
- Mixed discount types across categories

### Edge Cases

- Discount value equals original price
- Discount value greater than original price
- Zero or negative discount values
- Null or undefined category objects

### Price Boundaries

- Minimum price enforcement
- Very small original prices
- Very large original prices
- Decimal precision handling

---

## 📝 Best Practices

1. **Always check `hasDiscount`** before displaying discount UI
2. **Use `formatDiscountedPrice()`** for consistent price display
3. **Handle null categories** gracefully in your components
4. **Test edge cases** when implementing new discount logic
5. **Maintain minimum price** to prevent pricing issues
6. **Use appropriate precision** for currency calculations

---

## 🔗 Related Files

- `components/product/ProductCard.jsx` – Product display with discounts
- `components/product/ProductDetailsLeftCard.jsx` – Product details with pricing
- `components/cart/CartItem.jsx` – Cart items with discount display
- `lib/store/slices/cartSlice.js` – Cart state management
- `helpers/validations/` – Input validation for discount values
