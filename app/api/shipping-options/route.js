import { NextResponse } from 'next/server';

// Shipping options data structure
const SHIPPING_OPTIONS_DATA = {
  PRODUCT_CONTAINS_ONLY_LESS_THAN_OR_EQUAL_TO_5ML: {
    fedex: [
      {
        id: 'standard-flat-rate',
        name: 'Standard Flat Rate',
        cost: 9.95,
        courier: 'fedex',
        estimatedDays: 5,
        description: 'Standard shipping for small volumes',
      },
      {
        id: 'fedex-2-day',
        name: 'FedEx 2 Day',
        cost: 15.99,
        courier: 'fedex',
        estimatedDays: 2,
        description: 'Express delivery in 2 business days',
      },
    ],
    ups: [
      {
        id: 'ups-ground',
        name: 'UPS Ground',
        cost: 12.99,
        courier: 'ups',
        estimatedDays: 5,
        description: 'Standard UPS ground shipping',
      },
    ],
  },
  PRODUCT_CONTAINS_MORE_THAN_5ML_LESS_THEN_50ML: {
    fedex: [
      {
        id: 'fedex-2-day',
        name: 'FedEx 2 Day',
        cost: 15.99,
        courier: 'fedex',
        estimatedDays: 2,
        description: 'Express delivery for medium volumes',
      },
    ],
    ups: [
      {
        id: 'ups-ground',
        name: 'UPS Ground',
        cost: 12.99,
        courier: 'ups',
        estimatedDays: 5,
        description: 'Standard UPS ground shipping',
      },
    ],
  },
  PRODUCT_CONTAINS_MORE_THAN_50ML: {
    fedex: [
      {
        id: 'fedex-air-hazardous',
        name: 'FedEx Air Hazardous',
        cost: 300.0,
        courier: 'fedex',
        estimatedDays: 3,
        description: 'Specialized hazardous material shipping (≥50ml)',
      },
    ],
    ups: [
      {
        id: 'ups-ground',
        name: 'UPS Ground',
        cost: 12.99,
        courier: 'ups',
        estimatedDays: 7,
        description: 'Ground shipping for large volumes',
      },
    ],
  },
  INTERNATIONAL_WHOLESALER: {
    fedex: [
      {
        id: 'fedex-air-hazardous-international',
        name: 'FedEx Air Hazardous International',
        cost: 350.0,
        courier: 'fedex',
        estimatedDays: 7,
        description: 'International hazardous shipping for wholesalers',
      },
    ],
  },
  INTERNATIONAL_CUSTOMER: {
    fedex: [
      {
        id: 'international-economy',
        name: 'International Economy',
        cost: 25.99,
        courier: 'fedex',
        estimatedDays: 10,
        description: 'Economy international shipping',
      },
    ],
    ups: [
      {
        id: 'ups-worldwide-expedited',
        name: 'UPS Worldwide Expedited',
        cost: 45.99,
        courier: 'ups',
        estimatedDays: 5,
        description: 'Fast international shipping',
      },
    ],
  },
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { volumeCategory, courier, totalVolume, destination = 'domestic', isWholesaler = false } = body;

    // Validate required parameters
    if (!volumeCategory || !courier) {
      return NextResponse.json(
        {
          success: false,
          message: 'Volume category and courier are required',
        },
        { status: 400 },
      );
    }

    // Determine the correct category based on additional factors
    let effectiveCategory = volumeCategory;

    // Override category for international shipping
    if (destination === 'international') {
      effectiveCategory = isWholesaler ? 'INTERNATIONAL_WHOLESALER' : 'INTERNATIONAL_CUSTOMER';
    }

    // Get shipping options for the category
    const categoryOptions = SHIPPING_OPTIONS_DATA[effectiveCategory];

    if (!categoryOptions) {
      return NextResponse.json(
        {
          success: false,
          message: `No shipping options available for category: ${effectiveCategory}`,
        },
        { status: 404 },
      );
    }

    // Get options for the specific courier
    const courierOptions = categoryOptions[courier.toLowerCase()];

    if (!courierOptions || courierOptions.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: `No shipping options available for ${courier} in category ${effectiveCategory}`,
        },
        { status: 404 },
      );
    }

    // Apply any volume-based pricing adjustments
    const adjustedOptions = courierOptions.map((option) => {
      let adjustedCost = option.cost;

      // Example: Add volume surcharge for very large orders
      if (totalVolume > 100) {
        adjustedCost += 50; // $50 surcharge for orders over 100ml
      }

      return {
        ...option,
        cost: adjustedCost,
        volumeSurcharge: totalVolume > 100 ? 50 : 0,
      };
    });

    // Simulate API delay (remove in production)
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      shippingOptions: adjustedOptions,
      metadata: {
        volumeCategory: effectiveCategory,
        courier,
        totalVolume,
        destination,
        isWholesaler,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Error in shipping-options API:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error while fetching shipping options',
      },
      { status: 500 },
    );
  }
}

// Optional: Handle GET requests for testing
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const volumeCategory = searchParams.get('volumeCategory');
  const courier = searchParams.get('courier');

  if (!volumeCategory || !courier) {
    return NextResponse.json(
      {
        success: false,
        message: 'Query parameters volumeCategory and courier are required',
        example: '/api/shipping-options?volumeCategory=PRODUCT_CONTAINS_ONLY_LESS_THAN_OR_EQUAL_TO_5ML&courier=fedex',
      },
      { status: 400 },
    );
  }

  // Forward to POST handler
  return POST(request);
}
