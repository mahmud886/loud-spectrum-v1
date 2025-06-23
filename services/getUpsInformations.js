'use server';
import { cookies } from 'next/headers';

const upsData = {
  Shipment: {
    Shipper: {
      Address: {
        PostalCode: '10001',
        CountryCode: 'US',
      },
    },
    ShipFrom: {
      Address: {
        PostalCode: '10001',
        CountryCode: 'US',
      },
    },
    ShipTo: {
      Address: {
        PostalCode: '20001',
        CountryCode: 'US',
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
        Length: '1',
        Width: '1',
        Height: '1',
      },
      PackageWeight: {
        UnitOfMeasurement: {
          Code: 'LBS',
          Description: 'Pounds',
        },
        Weight: '0.01',
      },
    },
  },
};

export const getUpsInformations = async (payload) => {
  // const upsData = {
  // 	Shipment: {
  // 		Shipper: {
  // 			Address: {
  // 				PostalCode: "10001",
  // 				CountryCode: "US"
  // 			}
  // 		},
  // 		ShipFrom: {
  // 			Address: {
  // 				PostalCode: "10001",
  // 				CountryCode: "US"
  // 			}
  // 		},
  // 		ShipTo: {
  // 			Address: {
  // 				PostalCode: String(payload?.postalCode) || "20001",
  // 				CountryCode: "US"
  // 			}
  // 		},
  // 		Service: {
  // 			Code: "03",
  // 			Description: "UPS Ground"
  // 		},
  // 		Package: {
  // 			PackagingType: {
  // 				Code: "02",
  // 				Description: "Package"
  // 			},
  // 			Dimensions: {
  // 				UnitOfMeasurement: {
  // 					Code: "IN",
  // 					Description: "Inches"
  // 				},
  // 				Length: String(payload?.dimensions?.length ?? "10"),
  // 				Width: String(payload?.dimensions?.width ?? "10"),
  // 				Height: String(payload?.dimensions?.height ?? "10")
  // 			},
  // 			PackageWeight: {
  // 				UnitOfMeasurement: {
  // 					Code: "LBS",
  // 					Description: "Pounds"
  // 				},
  // 				Weight: String(payload?.totalWeightInPounds)
  // 				// Weight: String(payload?.totalWeightInPounds > 0.01 ? payload.totalWeightInPounds : "1")
  // 			}
  // 		}
  // 	}
  // };
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
      throw new Error(`HTTP error!``status: ${response.status}`);
    }

    const data = await response.json();
    return { error: false, data };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { error: true, message: error.message, data: { error: true, data: {} } };
  }
};
