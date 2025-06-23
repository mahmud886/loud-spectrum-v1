'use server';
import { cookies } from 'next/headers';

const fedexData = {
  requestedShipment: {
    dropOffType: 'DROPOFF_AT_FEDEX_LOCATION',
    serviceType: 'INTERNATIONAL_ECONOMY',
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
        postalCode: '7943',
        countryCode: 'BE',
      },
    },
    pickupType: 'DROPOFF_AT_FEDEX_LOCATION',
    requestedPackageLineItems: [
      {
        weight: {
          units: 'LB',
          value: 10,
        },
        dimensions: {
          length: 10,
          width: 10,
          height: 10,
          units: 'IN',
        },
      },
    ],
  },
};

export const getFedexInformations = async () => {
  // const fedexDatas = {
  //   requestedShipment: {
  //     dropOffType: 'DROPOFF_AT_FEDEX_LOCATION',
  //     serviceType: 'FEDEX_GROUND',
  //     packagingType: 'YOUR_PACKAGING',
  //     rateRequestType: ['ACCOUNT'],
  //     shipper: {
  //       address: {
  //         postalCode: '99501',
  //         countryCode: 'US',
  //         city: 'Anchorage',
  //         stateOrProvinceCode: 'AK',
  //       },
  //     },
  //     recipient: {
  //       address: {
  //         postalCode: '98104',
  //         countryCode: 'US',
  //         city: 'Seattle',
  //         stateOrProvinceCode: 'WA',
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { error: true, message: error.message, data: { orders: [], count: 0 } };
  }
};
