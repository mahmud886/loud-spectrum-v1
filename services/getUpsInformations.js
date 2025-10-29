'use server';
import { cookies } from 'next/headers';

/**
 * Fetches UPS information for a given shipping payload
 * @param {Object} shippingPayload - The shipping payload containing shipping information
 * @returns {Promise<Object>} The UPS information
 * @throws {Error} If the fetch fails
 */
// const upsData = {
//   Shipment: {
//     Shipper: {
//       Address: {
//         PostalCode: '10001',
//         CountryCode: 'US',
//       },
//     },
//     ShipFrom: {
//       Address: {
//         PostalCode: '10001',
//         CountryCode: 'US',
//       },
//     },
//     ShipTo: {
//       Address: {
//         PostalCode: '20001',
//         CountryCode: 'US',
//       },
//     },
//     Service: {
//       Code: '03',
//       Description: 'UPS Ground',
//     },
//     Package: {
//       PackagingType: {
//         Code: '02',
//         Description: 'Package',
//       },
//       Dimensions: {
//         UnitOfMeasurement: {
//           Code: 'IN',
//           Description: 'Inches',
//         },
//         Length: '1',
//         Width: '1',
//         Height: '1',
//       },
//       PackageWeight: {
//         UnitOfMeasurement: {
//           Code: 'LBS',
//           Description: 'Pounds',
//         },
//         Weight: '0.01',
//       },
//     },
//   },
// };

export const getUpsInformations = async (shippingPayload) => {
  const upsData = {
    Shipment: {
      Shipper: {
        Address: {
          PostalCode: '92706',
          CountryCode: 'US',
        },
      },
      ShipFrom: {
        Address: {
          PostalCode: '92706',
          CountryCode: 'US',
        },
      },
      ShipTo: {
        Address: {
          PostalCode: shippingPayload?.postalCode,
          CountryCode: shippingPayload?.countryCode,
        },
      },
      Service: {
        Code: '03',
        Description: 'UPS Ground',
      },
      Package: {
        PackagingType: {
          Code: '02',
          Description: 'Package',
        },
        Dimensions: {
          UnitOfMeasurement: {
            Code: 'IN',
            Description: 'Inches',
          },
          Length: String(shippingPayload?.dimensions?.length ?? '10'),
          Width: String(shippingPayload?.dimensions?.width ?? '10'),
          Height: String(shippingPayload?.dimensions?.height ?? '10'),
        },
        PackageWeight: {
          UnitOfMeasurement: {
            Code: 'LBS',
            Description: 'Pounds',
          },
          Weight: String(shippingPayload?.totalWeightInPounds),
        },
      },
    },
  };
  //
  // console.log('UPS data:', payload);
  // console.log('UPS data:', upsData?.Shipment?.ShipFrom);
  // console.log('UPS data:', upsData?.Shipment?.ShipTo);
  // console.log('UPS data:', upsData?.Shipment?.Package);
  try {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ups-info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authToken,
      },
      body: JSON.stringify(upsData),
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
    console.error('Error fetching ups informations:', error);
    return { error: true, message: error.message, data: { products: [] }, notFound: false };
  }
};
