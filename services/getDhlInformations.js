'use server';

/**
 * Fetches DHL information for a given shipping payload
 * @param {Object} shippingPayload - The shipping payload containing shipping information
 * @param {Object} shippingPayload.dimensions - Package dimensions (length, width, height in inches)
 * @param {number} shippingPayload.totalWeightInPounds - Total weight in pounds
 * @param {string} shippingPayload.originalType - Original shipping type (e.g., 'DHL_EXPRESS_9_00')
 * @param {string} shippingPayload.countryCode - Destination country code
 * @param {string} shippingPayload.postalCode - Destination postal code
 * @returns {Promise<Object>} The DHL information response
 * @throws {Error} If the fetch fails
 */
export const getDhlInformations = async (shippingPayload) => {
  // Construct the payload like the test page
  const shippingData = {
    shipperDetails: {
      postalCode: '92706',
      cityName: 'Santa Ana',
      countryCode: 'US',
    },
    receiverDetails: {
      postalCode: shippingPayload?.postalCode,
      cityName: shippingPayload?.province || 'Destination City',
      countryCode: shippingPayload?.countryCode,
    },
    packageDetails: {
      weight: parseFloat(shippingPayload?.totalKgs) || 1, // Convert to kg
      length: parseFloat(shippingPayload?.dimensions?.length) || 10, // Convert to cm
      width: parseFloat(shippingPayload?.dimensions?.width) || 10, // Convert to cm
      height: parseFloat(shippingPayload?.dimensions?.height) || 10, // Convert to cm
    },
  };

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_LOCAL_URL}/api/dhl/rates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(shippingData),
    });
    const result = await response.json();
    if (!response.ok) {
      const errorMessage = result.details?.detail || result.error || 'Failed to fetch rates.';
      return { error: true, message: errorMessage, data: { products: [] }, notFound: false };
    }
    return { error: false, data: { products: result.products || [] }, notFound: false };
  } catch (error) {
    console.error('Error fetching DHL information:', error);
    return {
      error: true,
      message: error.message,
      data: { products: [] },
      notFound: false,
    };
  }
};
