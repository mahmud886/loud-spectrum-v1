'use client';

import { useAuthToken } from '@/hooks/useAuthToken';
import { useRouter } from '@/i18n/navigation';
import { getOrderById } from '@/services/get-order-by-id';
import { PackageX } from 'lucide-react';
import { useEffect, useState } from 'react';

const OrderDetailsPage = ({ orderId, initialOrderData = null }) => {
  const [orderDetails, setOrderDetails] = useState(initialOrderData);
  const [allProducts, setAllProducts] = useState(
    initialOrderData ? [...(initialOrderData?.products || []), ...(initialOrderData?.ws_products || [])] : [],
  );
  const [isLoading, setIsLoading] = useState(!initialOrderData);
  const [error, setError] = useState(null);
  const token = useAuthToken();
  const router = useRouter();

  useEffect(() => {
    // If we have initial order data, don't fetch again
    if (initialOrderData) {
      return;
    }

    const fetchOrderDetails = async () => {
      if (orderId) {
        setIsLoading(true);
        setError(null); // Reset error state

        try {
          const order = await getOrderById(orderId, token);

          // Handle different types of errors
          if (order.authError) {
            // Redirect to login page for authentication errors
            router.push('/login');
            return;
          }

          if (order.notFound) {
            // Show error message for order not found
            setError('Order not found');
            setOrderDetails(null);
            return;
          }

          if (order.serverError) {
            // Handle server errors gracefully
            setError('Server error occurred. Please try again later.');
            setOrderDetails(null);
            return;
          }

          if (order.error) {
            // Handle other errors gracefully
            setError('Failed to load order details. Please try again.');
            setOrderDetails(null);
            return;
          }

          if (order.data) {
            setOrderDetails(order.data);
            setAllProducts([...(order.data?.products || []), ...(order.data?.ws_products || [])]);
          } else {
            setOrderDetails(null);
            setError('No order data received');
          }
        } catch (error) {
          console.error('Error fetching order details:', error);
          setError('An unexpected error occurred. Please try again.');
          setOrderDetails(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        setError('No order ID provided');
      }
    };

    fetchOrderDetails();
  }, [orderId, token, router, initialOrderData]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatAddress = (details) => {
    return (
      <>
        <p className="text-umbra-100 font-sans text-[14px] font-normal">{details?.street_address}</p>
        <p className="text-umbra-100 font-sans text-[14px] font-normal">
          {details?.city}, {details?.province}
        </p>
        <p className="text-umbra-100 font-sans text-[14px] font-normal">
          {details?.country} {details?.post_code}
        </p>
      </>
    );
  };

  return (
    <div className="mx-auto w-full max-w-full p-4 xl:p-0">
      {/* Back to Orders Button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-umbra-100 font-sans text-[24px] leading-[120%] font-normal">
          Order Details - {orderDetails?.code}
        </h1>
        <button className="main-button-black rounded-full px-6 py-2 text-white" onClick={() => router.back()}>
          Back
        </button>
      </div>

      {error ? (
        <div className="text-muted-foreground flex max-h-[80dvh] min-h-[300px] flex-col items-center justify-center rounded border text-center">
          <PackageX className="mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg font-medium">Error Loading Order</p>
          <p className="text-sm text-gray-500">{error}</p>
          <div className="mt-5">
            <button
              onClick={() => {
                setError(null);
                setIsLoading(true);
                // Re-fetch order details
                const refetchOrderDetails = async () => {
                  if (orderId) {
                    setIsLoading(true);
                    try {
                      const order = await getOrderById(orderId, token);

                      // Handle different types of errors
                      if (order.authError) {
                        console.error('Authentication error:', order.message);
                        router.push('/login');
                        return;
                      }

                      if (order.notFound) {
                        setError('Order not found');
                        setOrderDetails(null);
                        return;
                      }

                      if (order.serverError) {
                        setError('Server error occurred. Please try again later.');
                        setOrderDetails(null);
                        return;
                      }

                      if (order.error) {
                        setError('Failed to load order details. Please try again.');
                        setOrderDetails(null);
                        return;
                      }

                      if (order.data) {
                        setOrderDetails(order.data);
                        setAllProducts([...(order.data?.products || []), ...(order.data?.ws_products || [])]);
                      } else {
                        setOrderDetails(null);
                      }
                    } catch (error) {
                      console.error('Error fetching order details:', error);
                      setError('An unexpected error occurred. Please try again.');
                      setOrderDetails(null);
                    } finally {
                      setIsLoading(false);
                    }
                  }
                };
                refetchOrderDetails();
              }}
              className="main-button-black inline-flex items-center justify-center rounded-full px-6 py-1 !text-[14px]"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Product List Section */}
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-normal">Product Details</h3>
            <div className="overflow-x-auto rounded-md border border-gray-200">
              <table className="w-full table-auto text-left">
                <thead className="bg-stardust/20">
                  <tr>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Product</th>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Quantity</th>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Price</th>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Total</th>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Volume</th>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Flavor</th>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Type</th>
                    <th className="text-umbra-100 px-4 py-2 text-center font-sans text-[16px] font-normal">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.products?.map((item, index) => (
                    <tr key={`product-${item._id || index}`} className="border-b">
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {item?.product?.name}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {item?.quantity}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        ${item?.price?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        ${item?.total?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {(() => {
                          try {
                            const attribute = item?.product?.attribute;
                            if (attribute) {
                              const parsed = JSON.parse(attribute);
                              return parsed?.volume || 'N/A';
                            }
                            return 'N/A';
                          } catch (error) {
                            console.warn('Failed to parse volume attribute:', error);
                            return 'N/A';
                          }
                        })()}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {(() => {
                          try {
                            const flavor = item?.flavor || 'N/A';
                            return flavor === 'N/A' ? (
                              <span className="text-umbra-100 font-sans text-[12px] font-normal">N/A</span>
                            ) : (
                              <span className="text-umbra-100 bg-sweet/10 rounded-full px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal capitalize">
                                {flavor}
                              </span>
                            );
                          } catch (error) {
                            console.warn('Failed to parse attribute JSON:', item?.attribute);
                            return <span className="text-umbra-100 font-sans text-[12px] font-normal">N/A</span>;
                          }
                        })()}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        <button className="text-umbra-100 bg-alive/10 rounded-full px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal capitalize">
                          Regular
                        </button>
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {item?.remarks || 'N/A'}
                      </td>
                    </tr>
                  ))}
                  {orderDetails?.ws_products?.map((item, index) => (
                    <tr key={`ws-product-${item._id || index}`} className="border-b">
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {item?.product?.name}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {item?.quantity}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        ${item?.price?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        ${item?.total?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {item?.selectedVolume || '1ml'}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal capitalize">
                        {(() => {
                          try {
                            const parsed = JSON.parse(item?.attribute);
                            const flavor = parsed?.flavor || 'N/A';
                            return flavor === 'N/A' ? (
                              <span className="text-umbra-100 font-sans text-[12px] font-normal">N/A</span>
                            ) : (
                              <span className="text-umbra-100 bg-sweet/10 rounded-full px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal capitalize">
                                {flavor}
                              </span>
                            );
                          } catch (error) {
                            console.warn('Failed to parse attribute JSON:', item?.attribute);
                            return <span className="text-umbra-100 font-sans text-[12px] font-normal">N/A</span>;
                          }
                        })()}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        <button className="text-umbra-100 bg-alive/10 rounded-full px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal capitalize">
                          Wholesale
                        </button>
                      </td>
                      <td className="text-umbra-100 px-4 py-2 text-center font-sans text-[14px] font-normal">
                        {item?.remarks || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Address and Order Summary Section */}
          <div className="flex flex-col gap-2 xl:flex-row xl:space-x-6">
            {/* Shipping Address */}
            <div className="w-full xl:flex-1">
              <h3 className="mb-4 text-[18px] font-normal">Address</h3>
              <div className="bg-stardust/20 divide-umbra-10 divide-y rounded-[10px]">
                <div className="p-4">
                  <h3 className="mb-1 text-[18px] font-normal">Shipping Address</h3>
                  <p className="text-umbra-100 font-sans text-[14px] font-normal">
                    {orderDetails?.shipping_details?.first_name} {orderDetails?.shipping_details?.last_name}
                  </p>
                  {formatAddress(orderDetails?.shipping_details)}
                  <p className="text-umbra-100 font-sans text-[14px] font-normal">
                    {orderDetails?.shipping_details?.phone}
                  </p>
                  <p className="text-umbra-100 font-sans text-[14px] font-normal">
                    {orderDetails?.shipping_details?.email}
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="mb-1 text-[18px] font-normal">Billing Address</h3>
                  <p className="text-umbra-100 font-sans text-[14px] font-normal">
                    {orderDetails?.billing_details?.first_name} {orderDetails?.billing_details?.last_name}
                  </p>
                  {formatAddress(orderDetails?.billing_details)}
                  <p className="text-umbra-100 font-sans text-[14px] font-normal">
                    {orderDetails?.billing_details?.phone}
                  </p>
                  <p className="text-umbra-100 font-sans text-[14px] font-normal">
                    {orderDetails?.billing_details?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full xl:flex-1">
              <h3 className="mb-4 text-[18px] font-normal">Order Summary</h3>
              <div className="rounded-[10px] bg-gray-50 p-4">
                <div className="mb-2 flex justify-between">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Subtotal</span>
                  <span>${orderDetails?.sub_total?.toFixed(2) || 0}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Shipping Fee</span>
                  <span>${orderDetails?.shipping_amount?.toFixed(2) || 0}</span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Taxes</span>
                  <span>${orderDetails?.tax_amount?.toFixed(2) || 0}</span>
                </div>
                <div className="border-umbra-10 mb-2 flex justify-between border-t pt-2 font-normal">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Total</span>
                  <span>${orderDetails?.total?.toFixed(2)}</span>
                </div>
              </div>
              <div className="mt-6 rounded-[10px] bg-gray-50 p-4">
                <h3 className="mb-2 text-[18px] font-normal">Payment Information</h3>
                <div className="mb-2 flex justify-between">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Transaction ID</span>
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">
                    {orderDetails?.payment_info?.transection_id}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Payment Status</span>
                  <span
                    className={`text-umbra-100 rounded-[10px] px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize ${
                      orderDetails?.payment_status === 'Unpaid'
                        ? 'bg-red-700 text-white'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {orderDetails?.payment_status}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Order Status</span>
                  <span
                    className={`text-umbra-100 rounded-[10px] px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize ${
                      orderDetails?.order_status === 'Waiting For Payment'
                        ? 'bg-yellow-100 text-yellow-800'
                        : orderDetails?.order_status === 'Waiting For Payment Approve'
                          ? 'bg-orange-100 text-orange-800'
                          : orderDetails?.order_status === 'Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : orderDetails?.order_status === 'Shipped'
                              ? 'bg-purple-100 text-purple-800'
                              : orderDetails?.order_status === 'Fulfillment'
                                ? 'bg-green-100 text-green-800'
                                : orderDetails?.order_status === 'Reject'
                                  ? 'bg-red-100 text-red-800'
                                  : orderDetails?.order_status === 'Refunded'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {orderDetails?.order_status}
                  </span>
                </div>
                <div className="mb-2 flex justify-between">
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">Order Date</span>
                  <span className="text-umbra-100 font-sans text-[14px] font-normal">
                    {formatDate(orderDetails?.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailsPage;
