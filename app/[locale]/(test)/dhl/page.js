'use client';

import { useState } from 'react';

export default function HomePage() {
  // State for form inputs, pre-filled with the original example data
  const [shipper, setShipper] = useState({ postalCode: '92706', cityName: 'Santa Ana', countryCode: 'US' });
  const [receiver, setReceiver] = useState({ postalCode: 'SW1A 0AA', cityName: 'London', countryCode: 'GB' });
  const [packageDetails, setPackageDetails] = useState({ weight: '1.5', length: '20', width: '15', height: '10' });

  // State for API response
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Generic handler to update state for nested objects
  const handleInputChange = (setter) => (e) => {
    const { name, value } = e.target;
    setter((prevState) => ({ ...prevState, [name]: value }));
  };

  /**
   * Fetches shipping rates from the backend API route using form data.
   * @param {React.FormEvent<HTMLFormElement>} event The form submission event.
   */
  const getShippingRates = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setRates([]);

    // Construct the payload from the current state
    const shippingData = {
      shipperDetails: shipper,
      receiverDetails: receiver,
      packageDetails: {
        weight: parseFloat(packageDetails.weight),
        length: parseFloat(packageDetails.length),
        width: parseFloat(packageDetails.width),
        height: parseFloat(packageDetails.height),
      },
    };

    try {
      const response = await fetch('/api/dhl/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(shippingData),
      });
      const result = await response.json();
      if (!response.ok) {
        const errorMessage = result.details?.detail || result.error || 'Failed to fetch rates.';
        throw new Error(errorMessage);
      }
      setRates(result.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Style objects for cleaner JSX
  const styles = {
    formSection: { marginBottom: '1.5rem', border: '1px solid #eee', padding: '1rem', borderRadius: '8px' },
    inputGroup: { display: 'flex', flexDirection: 'column', marginBottom: '1rem' },
    label: { marginBottom: '0.25rem', fontSize: '0.9rem', color: '#555' },
    input: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' },
    button: {
      width: '100%',
      padding: '12px',
      cursor: 'pointer',
      backgroundColor: '#ffcc00',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      fontSize: '16px',
    },
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px', margin: 'auto', color: '#333' }}>
      <h1 style={{ textAlign: 'center' }}>DHL Rate Calculator</h1>
      <form onSubmit={getShippingRates}>
        <div style={styles.formSection}>
          <h2>Shipper Details (From)</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Postal Code</label>
            <input
              style={styles.input}
              name="postalCode"
              value={shipper.postalCode}
              onChange={handleInputChange(setShipper)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>City Name</label>
            <input
              style={styles.input}
              name="cityName"
              value={shipper.cityName}
              onChange={handleInputChange(setShipper)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Country Code</label>
            <input
              style={styles.input}
              name="countryCode"
              value={shipper.countryCode}
              onChange={handleInputChange(setShipper)}
            />
          </div>
        </div>

        <div style={styles.formSection}>
          <h2>Receiver Details (To)</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Postal Code</label>
            <input
              style={styles.input}
              name="postalCode"
              value={receiver.postalCode}
              onChange={handleInputChange(setReceiver)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>City Name</label>
            <input
              style={styles.input}
              name="cityName"
              value={receiver.cityName}
              onChange={handleInputChange(setReceiver)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Country Code</label>
            <input
              style={styles.input}
              name="countryCode"
              value={receiver.countryCode}
              onChange={handleInputChange(setReceiver)}
            />
          </div>
        </div>

        <div style={styles.formSection}>
          <h2>Package Details</h2>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Weight (kg)</label>
            <input
              type="number"
              style={styles.input}
              name="weight"
              value={packageDetails.weight}
              onChange={handleInputChange(setPackageDetails)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Length (cm)</label>
            <input
              type="number"
              style={styles.input}
              name="length"
              value={packageDetails.length}
              onChange={handleInputChange(setPackageDetails)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Width (cm)</label>
            <input
              type="number"
              style={styles.input}
              name="width"
              value={packageDetails.width}
              onChange={handleInputChange(setPackageDetails)}
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Height (cm)</label>
            <input
              type="number"
              style={styles.input}
              name="height"
              value={packageDetails.height}
              onChange={handleInputChange(setPackageDetails)}
            />
          </div>
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Fetching Rates...' : 'Get Shipping Rates'}
        </button>
      </form>

      {error && (
        <div
          style={{
            color: '#D8000C',
            backgroundColor: '#FFD2D2',
            marginTop: '1rem',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          <strong>Error:</strong> {error}
        </div>
      )}

      {rates.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Available DHL Services & Pricing</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {rates.map((rate, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  padding: '1.5rem',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#333', fontSize: '1.2rem' }}>
                      {rate.productName || 'DHL Service'}
                    </h3>
                    <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                      Product Code: <strong>{rate.productCode || 'N/A'}</strong>
                    </p>
                    {rate.deliveryCapabilities?.deliveryTypeCode && (
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666', fontSize: '0.9rem' }}>
                        Delivery Type: <strong>{rate.deliveryCapabilities.deliveryTypeCode}</strong>
                      </p>
                    )}
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#d4002a' }}>
                      {rate.totalPrice?.[0]?.price || rate.totalPrice?.[0]?.value || 'N/A'}{' '}
                      {rate.totalPrice?.[0]?.priceCurrency || rate.totalPrice?.[0]?.currencyCode || ''}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.25rem' }}>
                      {rate.totalPrice?.[0]?.currencyType || 'Total Price'}
                    </div>
                  </div>
                </div>

                {/* Multiple Currency Prices */}
                {rate.totalPrice && rate.totalPrice.length > 1 && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#555' }}>Alternative Currencies:</h4>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '0.5rem',
                      }}
                    >
                      {rate.totalPrice.slice(1).map((priceItem, priceIndex) => (
                        <div
                          key={priceIndex + 1}
                          style={{
                            backgroundColor: '#f0f8ff',
                            padding: '0.5rem',
                            borderRadius: '4px',
                            textAlign: 'center',
                            border: '1px solid #e0e8f0',
                          }}
                        >
                          <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                            {priceItem.price} {priceItem.priceCurrency}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: '#666', marginTop: '0.25rem' }}>
                            {priceItem.currencyType}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Detailed Price Breakdown */}
                {rate.detailedPriceBreakdown && rate.detailedPriceBreakdown.length > 0 && (
                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', color: '#555' }}>
                      Detailed Breakdown ({rate.detailedPriceBreakdown[0]?.priceCurrency}):
                    </h4>
                    {rate.detailedPriceBreakdown[0]?.breakdown?.map((item, breakdownIndex) => (
                      <div key={breakdownIndex} style={{ marginBottom: '0.75rem' }}>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '0.9rem',
                            padding: '0.5rem',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '4px',
                            marginBottom: '0.25rem',
                          }}
                        >
                          <span style={{ fontWeight: '500' }}>{item.name}</span>
                          <span style={{ fontWeight: 'bold' }}>
                            {item.price} {rate.detailedPriceBreakdown[0]?.priceCurrency}
                          </span>
                        </div>
                        {item.serviceCode && (
                          <div style={{ fontSize: '0.8rem', color: '#666', marginLeft: '0.5rem' }}>
                            Service Code: {item.serviceCode}
                            {item.isCustomerAgreement && (
                              <span
                                style={{
                                  marginLeft: '0.5rem',
                                  backgroundColor: '#e8f5e8',
                                  padding: '0.1rem 0.3rem',
                                  borderRadius: '3px',
                                  fontSize: '0.7rem',
                                }}
                              >
                                Customer Agreement
                              </span>
                            )}
                          </div>
                        )}
                        {item.priceBreakdown && item.priceBreakdown.length > 0 && (
                          <div style={{ marginLeft: '1rem', marginTop: '0.25rem' }}>
                            {item.priceBreakdown.map((subItem, subIndex) => (
                              <div key={subIndex} style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.1rem' }}>
                                {subItem.priceType === 'DISCOUNT' && (
                                  <span style={{ color: '#d4002a' }}>
                                    Discount: {subItem.rate}% off (Base: {subItem.basePrice}{' '}
                                    {rate.detailedPriceBreakdown[0]?.priceCurrency})
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Service Details */}
                <div style={{ marginTop: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {rate.deliveryCapabilities?.estimatedDeliveryDateAndTime && (
                    <div
                      style={{
                        backgroundColor: '#e8f5e8',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#2d5a2d',
                      }}
                    >
                      Est. Delivery:{' '}
                      {new Date(rate.deliveryCapabilities.estimatedDeliveryDateAndTime).toLocaleDateString()}
                      {rate.deliveryCapabilities.estimatedDeliveryDateAndTime.includes('09:00:00') && ' (9:00 AM)'}
                    </div>
                  )}
                  {rate.deliveryCapabilities?.totalTransitDays && (
                    <div
                      style={{
                        backgroundColor: '#fff3cd',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#856404',
                      }}
                    >
                      Transit: {rate.deliveryCapabilities.totalTransitDays} days
                    </div>
                  )}
                  {rate.pickupCapabilities?.originServiceAreaCode && (
                    <div
                      style={{
                        backgroundColor: '#e8f0ff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#1e3a8a',
                      }}
                    >
                      Origin: {rate.pickupCapabilities.originServiceAreaCode}
                    </div>
                  )}
                  {rate.deliveryCapabilities?.destinationServiceAreaCode && (
                    <div
                      style={{
                        backgroundColor: '#e8f0ff',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#1e3a8a',
                      }}
                    >
                      Destination: {rate.deliveryCapabilities.destinationServiceAreaCode}
                    </div>
                  )}
                  {rate.weight?.volumetric && (
                    <div
                      style={{
                        backgroundColor: '#f8f9fa',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        color: '#495057',
                      }}
                    >
                      Weight: {rate.weight.provided} {rate.weight.unitOfMeasurement} (Vol: {rate.weight.volumetric})
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
