'use server';
import { cookies } from 'next/headers';

/**
 * Fetches FedEx information for a given shipping payload
 * @param {Object} shippingPayload - The shipping payload containing shipping information
 * @returns {Promise<Object>} The FedEx information
 * @throws {Error} If the fetch fails
 */
// const fedexData = {
//   requestedShipment: {
//     dropOffType: 'DROPOFF_AT_FEDEX_LOCATION',
//     serviceType: 'INTERNATIONAL_ECONOMY',
//     packagingType: 'YOUR_PACKAGING',
//     rateRequestType: ['ACCOUNT'],
//     shipper: {
//       address: {
//         postalCode: '92706',
//         countryCode: 'US',
//         city: 'California',
//         stateOrProvinceCode: 'CA',
//       },
//     },
//     recipient: {
//       address: {
//         postalCode: '7943',
//         countryCode: 'BE',
//       },
//     },
//     pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
//     requestedPackageLineItems: [
//       {
//         weight: {
//           units: 'LB',
//           value: 10,
//         },
//         dimensions: {
//           length: 10,
//           width: 10,
//           height: 10,
//           units: 'IN',
//         },
//       },
//     ],
//   },
// };

export const getFedexInformations = async (shippingPayload) => {
  const fedexData = {
    requestedShipment: {
      dropOffType: 'DROPOFF_AT_FEDEX_LOCATION',
      serviceType: shippingPayload?.originalType,
      packagingType: 'YOUR_PACKAGING',
      rateRequestType: ['ACCOUNT'],
      shipper: {
        address: {
          postalCode: '92706',
          countryCode: 'US',
          city: 'California',
          stateOrProvinceCode: 'CA',
        },
      },
      recipient: {
        address: {
          postalCode: shippingPayload?.postalCode,
          countryCode: shippingPayload?.countryCode,
        },
      },
      pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
      requestedPackageLineItems: [
        {
          weight: {
            units: 'LB',
            value: shippingPayload?.totalWeightInPounds,
          },
          dimensions: {
            length: shippingPayload?.dimensions?.length,
            width: shippingPayload?.dimensions?.width,
            height: shippingPayload?.dimensions?.height,
            units: 'IN',
          },
        },
      ],
    },
  };

  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/fedx-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(fedexData),
    });

    if (!response.ok) {
      return {
        error: true,
        message: `HTTP error! status: ${response.status}`,
        data: { products: [] },
        notFound: false,
      };
    }

    const data = await response.json();
    return { error: false, data, notFound: false };
  } catch (error) {
    console.error('Error fetching fedex informations:', error);
    return { error: true, message: error.message, data: { error: true, data: {} }, notFound: false };
  }
};
