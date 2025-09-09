# ChooseYourCourier Component Flow Documentation

## Overview

The `ChooseYourCourier` component handles the complex logic for courier selection and shipping type determination in the checkout process. It supports FedEx, UPS, and DHL couriers with dynamic pricing and real-time API integration.

## Component Architecture

### State Management

#### Redux State (Global)

- `selectedCourier`: Currently selected courier ('fedex', 'ups', 'dhl', '')
- `selectedShippingType`: Selected shipping type for UI dropdown
- `shippingTypeFormatted`: Formatted shipping type for backend (DHL specific)
- `shippingCostLoading`: Loading state for shipping cost calculations
- `dynamicShippingCost`: Real-time shipping cost from APIs
- `orderSummary`: Order totals including shipping
- `shippingAddress`: Customer shipping address

#### Local Component State

- `dhlProducts`: Array of DHL shipping products from API
- `dhlLoading`: Loading state for DHL API calls

### Key Dependencies

- **Redux**: Global state management
- **Next-intl**: Internationalization
- **Radix UI**: RadioGroup and Select components
- **Sonner**: Toast notifications
- **Helper Functions**: Volume/weight calculations

## Business Logic Flow

### 1. Volume-Based Shipping Logic

The component uses volume-based rules to determine available shipping types:

```javascript
// Volume thresholds (in ML)
const US_VOLUME_LESS_THAN_OR_EQUAL_TO_5ML = ['STANDARD_FLAT_RATE_9_95', 'FEDEX_2_DAY', 'UPS_GROUND'];
const US_VOLUME_MORE_THAN_5ML_LESS_THAN_50ML = ['FEDEX_2_DAY', 'UPS_GROUND'];
const US_VOLUME_MORE_THAN_OR_EQUAL_TO_50ML = ['FEDEX_AIR_HAZARDOUS_300', 'UPS_GROUND'];
const INTERNATIONAL_CUSTOMER = ['INTERNATIONAL_ECONOMY'];
const INTERNATIONAL_WHOLESALER = ['FEDEX_AIR_HAZARDOUS_SHIPPING_SHIP_MANAGER_350'];
```

### 2. Courier Selection Flow

#### Step 1: User Selects Courier

```javascript
const handleCourierChange = (value) => {
  dispatch(setSelectedCourier(value));
  dispatch(setShippingType('')); // Reset shipping type

  // Fetch DHL rates when DHL radio button is clicked
  if (value === 'dhl') {
    dispatch(setShippingType('dhl')); // Set initial DHL state
    fetchDhlRates(); // Call DHL API only when user clicks DHL radio button
  } else {
    setDhlProducts([]); // Clear DHL data
  }
};
```

#### Step 2: Available Shipping Types Calculation

The `availableShippingTypes` useMemo determines what options to show based on:

- Selected courier
- Total volume
- User location (US vs International)
- User type (Customer vs Wholesaler)
- DHL API response (for DHL courier)

### 3. DHL Integration Flow

#### DHL API Call Process

```javascript
const fetchDhlRates = useCallback(async () => {
  if (!shippingAddress?.country || !shippingAddress?.postalCode) {
    toast.error('Shipping address is required for DHL rates');
    return;
  }

  setDhlLoading(true);
  setDhlProducts([]);

  try {
    // Calculate dimensions and weight
    const dimensions = getDimensionsByVolume(totalVolume);
    const totalWeightInPounds = getWeightByVolume(totalVolume);

    // Convert units for DHL API (metric system)
    const packageDetails = {
      weight: (totalWeightInPounds * 0.453592).toFixed(2), // lbs to kg
      length: (dimensions.length * 2.54).toFixed(2), // inches to cm
      width: (dimensions.width * 2.54).toFixed(2),
      height: (dimensions.height * 2.54).toFixed(2),
    };

    const payload = {
      shipperDetails: {
        postalCode: '90210', // Fixed shipper location
        countryCode: 'US',
      },
      receiverDetails: {
        postalCode: shippingAddress.postalCode,
        countryCode: shippingAddress.country,
      },
      packageDetails,
    };

    const response = await fetch('/api/dhl/rates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      const errorMessage = result.details?.detail || result.error || 'Failed to fetch rates.';
      toast.error(errorMessage);
    }

    setDhlProducts(result.products || []);
  } catch (error) {
    // Error handling with user-friendly messages
    let userFriendlyError = error.message;

    if (error.message.includes('not available for the requested pickup date')) {
      userFriendlyError = 'DHL services are not available for the selected dates. Please try again later.';
    } else if (error.message.includes('user not authorized')) {
      userFriendlyError = 'DHL service temporarily unavailable. Please try a different courier.';
    } else if (error.message.includes('Failed to fetch rates')) {
      userFriendlyError = 'Unable to get DHL rates. Please check your address and try again.';
    }

    toast.error(userFriendlyError);
  } finally {
    setDhlLoading(false);
  }
}, [dimensions, totalWeightInPounds, shippingAddress?.country, shippingAddress?.postalCode]);
```

#### DHL Products Display

DHL products are dynamically mapped to dropdown options:

```javascript
// In availableShippingTypes useMemo
if (selectedCourier === 'dhl') {
  if (dhlLoading) {
    return [{ value: 'loading', label: 'Loading DHL rates...', cost: 0, originalType: 'LOADING' }];
  }

  if (dhlProducts.length > 0) {
    return dhlProducts.map((product, index) => ({
      value: `dhl-${product.productCode}-${index}`, // UI dropdown value
      label: `${product.productName} - $${product.totalPrice[0].price} ${product.totalPrice[0].priceCurrency}`,
      cost: product.totalPrice[0].price,
      originalType: product.productCode,
      dhlProduct: product,
    }));
  }

  return [{ value: 'no-rates', label: 'No DHL rates available', cost: 0, originalType: 'NO_RATES' }];
}
```

### 4. Shipping Type Selection Flow

#### Dual State System for DHL

When a DHL shipping type is selected, the component maintains two separate values:

```javascript
const handleShippingTypeChange = (value) => {
  if (selectedCourier === 'dhl' && value.startsWith('dhl-')) {
    const selectedProduct = dhlProducts.find((product, index) => `dhl-${product.productCode}-${index}` === value);

    if (selectedProduct) {
      const formattedShippingType = `dhl-${selectedProduct.productCode}-0 - ${selectedProduct.productName}`;

      // Dual state system
      dispatch(setShippingType(value)); // UI dropdown consistency
      dispatch(setShippingTypeFormatted(formattedShippingType)); // Backend format
      dispatch(setDynamicShippingCost(selectedProduct.totalPrice[0].price));
      return;
    }
  }

  // For non-DHL couriers
  dispatch(setShippingType(value));

  // Call API for FedEx/UPS dynamic pricing
  const apiEnabledTypes = ['fedex-2-day', 'ups-ground'];
  if (apiEnabledTypes.includes(value)) {
    callShippingAPI(value);
  }
};
```

### 5. FedEx/UPS API Integration

For FedEx and UPS, the component calls respective APIs for dynamic pricing:

```javascript
const callShippingAPI = async (shippingTypeValue) => {
  const shippingTypeMap = {
    'fedex-2-day': 'FEDEX_2_DAY',
    'ups-ground': 'UPS_GROUND',
    'international-economy': 'INTERNATIONAL_ECONOMY',
  };

  const originalType = shippingTypeMap[shippingTypeValue];

  try {
    dispatch(setShippingCostLoading(true));

    const shippingPayload = {
      totalVolume: totalVolume,
      shippingAddress: shippingAddress,
    };

    let response;
    if (originalType === 'UPS_GROUND') {
      response = await getUpsInformations(shippingPayload);
    } else if (originalType === 'FEDEX_2_DAY' || originalType === 'INTERNATIONAL_ECONOMY') {
      response = await getFedexInformations(shippingPayload);
    }

    if (response && !response.error && response.data) {
      const apiCost = extractCostFromAPIResponse(response?.data, originalType);
      if (apiCost !== null) {
        dispatch(setDynamicShippingCost(apiCost));
      } else {
        dispatch(resetDynamicShippingCost());
      }
    } else {
      dispatch(resetDynamicShippingCost());
    }
  } catch (error) {
    console.error('Error calling shipping API:', error);
    dispatch(resetDynamicShippingCost());
  }
};
```

## useEffect Hooks and Side Effects

### 1. Courier Reset on Volume Change

```javascript
useEffect(() => {
  if (selectedCourier) {
    dispatch(setSelectedCourier(''));
    dispatch(setShippingType(''));
    setDhlProducts([]);
  }
}, [totalVolume, dispatch]);
```

### 2. Complete Reset on Address Change

```javascript
// Reset courier and shipping type when address changes
useEffect(() => {
  if (shippingAddress?.country || shippingAddress?.province || shippingAddress?.city || shippingAddress?.postalCode) {
    dispatch(setSelectedCourier('')); // Reset courier completely
    dispatch(setShippingType(''));
    setDhlProducts([]); // Clear DHL products when courier is reset
  }
}, [shippingAddress?.country, shippingAddress?.province, shippingAddress?.city, shippingAddress?.postalCode, dispatch]);
```

### 3. DHL API Call Strategy

```javascript
// DHL API is only called when user clicks the DHL radio button
// No automatic refetch on address changes

// In handleCourierChange:
if (value === 'dhl') {
  dispatch(setShippingType('dhl'));
  fetchDhlRates(); // Only API call trigger
}
```

### 4. Shipping Type Validation

```javascript
useEffect(() => {
  if (selectedShippingType && availableShippingTypes.length > 0) {
    const isCurrentTypeAvailable = availableShippingTypes.some((type) => type.value === selectedShippingType);

    if (!isCurrentTypeAvailable) {
      dispatch(setShippingType(''));
    }
  }
}, [availableShippingTypes, selectedShippingType, dispatch]);
```

## Performance Optimizations

### Memoized Calculations

```javascript
// Memoize expensive calculations
const totalWeightInPounds = useMemo(() => getWeightByVolume(totalVolume), [totalVolume]);

const dimensions = useMemo(() => getDimensionsByVolume(totalVolume), [totalVolume]);

// Memoize tax calculation function
const calculateAndApplyTax = useCallback(
  () => {
    // Tax calculation logic
  },
  [
    /* dependencies */
  ],
);
```

### Controlled API Calls

**DHL API Strategy:**

- Only triggered when user clicks DHL radio button
- No automatic calls on address changes
- No debouncing needed since calls are user-initiated
- Proper loading states to prevent multiple simultaneous requests

**FedEx/UPS API Strategy:**

- Called when specific shipping types are selected
- Automatic fallback to default costs on API failures

## Error Handling

### DHL API Errors

- **Pickup date issues**: "DHL services are not available for the selected dates"
- **Authorization errors**: "DHL service temporarily unavailable"
- **Network errors**: "Unable to get DHL rates. Please check your address"

### FedEx/UPS API Errors

- Fallback to default costs when API calls fail
- Loading states during API calls
- Console warnings for debugging

## Data Flow Summary

1. **Component Mount**: Load courier options based on volume/location
2. **Courier Selection**: Reset shipping type, fetch DHL rates if DHL is selected
3. **Address Changes**:
   - Reset courier completely (all couriers)
   - Reset shipping type
   - Clear all cached data (including DHL products)
   - User must reselect courier for new address
4. **Volume Changes**: Reset courier and shipping type completely
5. **Shipping Type Selection**: Update costs, call APIs if needed (FedEx/UPS only)
6. **State Updates**: Sync with Redux for checkout process
7. **Error Handling**: Display user-friendly messages

## Integration Points

### Redux Store

- `checkoutSlice`: All shipping-related state
- `authSlice`: User information for wholesaler detection

### API Routes

- `/api/dhl/rates`: DHL shipping rates
- External FedEx/UPS APIs via service functions

### Helper Functions

- `getDimensionsByVolume()`: Calculate package dimensions
- `getWeightByVolume()`: Calculate package weight

## Usage in Checkout Flow

The component is used in the checkout process where users need to:

1. **Enter shipping address** (triggers complete reset of courier/shipping selections)
2. **Select preferred courier** (triggers DHL API call if DHL is selected)
3. **Choose specific shipping type** (triggers FedEx/UPS API calls if applicable)
4. **See real-time pricing** (dynamic costs from API responses)
5. **Complete order** with accurate shipping costs

### Key Behaviors:

- **Address Changes**: Complete reset ensures accurate rates for new destination
- **DHL Selection**: Immediate API call provides real-time rates
- **Volume Changes**: Complete reset as shipping options vary by volume
- **Error Handling**: User-friendly messages guide users through issues

The component ensures that all shipping data is properly formatted and stored for both UI consistency and backend processing requirements.
