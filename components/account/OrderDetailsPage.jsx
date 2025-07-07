'use client';

import { parseProductAttributes } from '@/helpers/product-attributes';
import { useAuthToken } from '@/hooks/useAuthToken';
import { useRouter } from '@/i18n/navigation';
import { getOrderById } from '@/services/get-order-by-id';
import { useEffect, useState } from 'react';

const OrderDetailsPage = ({ orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useAuthToken();
  const router = useRouter();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (orderId) {
        setIsLoading(true);
        try {
          const order = await getOrderById(orderId, token);
          setOrderDetails(order?.data);
          setAllProducts([...order?.data?.products, ...order?.data?.ws_products]);
        } catch (error) {
          console.error('Error fetching order details:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId]);

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

  const ShimmerEffect = () => (
    <div className="animate-pulse">
      {/* Order Title Shimmer */}
      <div className="mb-2 h-8 w-48 rounded bg-gray-200"></div>

      {/* Product List Shimmer */}
      <div className="mb-4">
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <div className="w-full">
            {/* Table Header */}
            <div className="bg-stardust/20">
              <div className="grid grid-cols-4 gap-4 py-1">
                <div className="h-9 rounded bg-gray-200"></div>
                <div className="h-9 rounded bg-gray-200"></div>
                <div className="h-9 rounded bg-gray-200"></div>
                <div className="h-9 rounded bg-gray-200"></div>
              </div>
            </div>
            {/* Table Rows */}
            <div className="divide-y">
              {allProducts?.length > 0 &&
                allProducts?.map((item) => (
                  <div key={item} className="grid grid-cols-4 gap-4 py-1">
                    <div className="h-7 rounded bg-gray-200"></div>
                    <div className="h-7 rounded bg-gray-200"></div>
                    <div className="h-7 rounded bg-gray-200"></div>
                    <div className="h-7 rounded bg-gray-200"></div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Address and Summary Section Shimmer */}
      <div className="flex flex-col gap-2 md:flex-row md:space-x-6">
        {/* Address Section */}
        <div className="w-full md:flex-1">
          <div className="mb-4 h-6 w-24 rounded bg-gray-200"></div>
          <div className="bg-stardust/20 divide-umbra-10 divide-y rounded-[10px]">
            {/* Shipping Address */}
            <div className="p-4">
              <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
            </div>
            {/* Billing Address */}
            <div className="p-4">
              <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
                <div className="h-4 w-2/3 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="w-full md:flex-1">
          <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
          <div className="rounded-[10px] bg-gray-50 p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-20 rounded bg-gray-200"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-20 rounded bg-gray-200"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-20 rounded bg-gray-200"></div>
              </div>
              <div className="border-umbra-10 flex justify-between border-t pt-2">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-4 w-20 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Payment Information Shimmer */}
          <div className="mt-5 rounded-[10px] bg-gray-50 p-4">
            <div className="mb-4 h-6 w-32 rounded bg-gray-200"></div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-40 rounded bg-gray-200"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-24 rounded bg-gray-200"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-24 rounded bg-gray-200"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="h-4 w-32 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // const productAttributes = parseProductAttributes(orderDetails?.products?.[0]?.product, 'volume');
  // console.log(productAttributes?.[0]?.value);
  console.log(orderDetails);
  return (
    <div className="mx-auto w-full max-w-full p-4 md:p-0">
      {/* Back to Orders Button */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-umbra-100 font-sans text-[24px] leading-[120%] font-normal">
          {isLoading ? <div className="h-8 w-64 rounded bg-gray-200"></div> : <>Order Details - {orderDetails?.code}</>}
        </h1>
        <button className="main-button-black rounded-full px-6 py-2 text-white" onClick={() => router.back()}>
          Back
        </button>
      </div>

      {isLoading ? (
        <ShimmerEffect />
      ) : (
        <>
          {/* Product List Section */}
          <div className="mb-6">
            <h3 className="mb-4 text-xl font-normal">Product Details</h3>
            <div className="overflow-x-auto rounded-md border border-gray-200">
              <table className="w-full table-auto text-left">
                <thead className="bg-stardust/20">
                  <tr>
                    <th className="text-umbra-100 px-4 py-2 font-sans text-[16px] font-normal">Product</th>
                    <th className="text-umbra-100 px-4 py-2 font-sans text-[16px] font-normal">Quantity</th>
                    <th className="text-umbra-100 px-4 py-2 font-sans text-[16px] font-normal">Price</th>
                    <th className="text-umbra-100 px-4 py-2 font-sans text-[16px] font-normal">Total</th>
                    <th className="text-umbra-100 px-4 py-2 font-sans text-[16px] font-normal">Volume</th>
                    <th className="text-umbra-100 px-4 py-2 font-sans text-[16px] font-normal">Flavor</th>
                    <th className="text-umbra-100 px-4 py-2 font-sans text-[16px] font-normal">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails?.products?.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        {item?.product?.name}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">{item?.quantity}</td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        ${item?.price?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        ${item?.total?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        {parseProductAttributes(item?.product, 'volume')?.[0]?.value || 'N/A'}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        {item?.flavor || 'N/A'}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        <p className="text-umbra-100 bg-alive/50 rounded-[10px] px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal capitalize">
                          Regular
                        </p>
                      </td>
                    </tr>
                  ))}
                  {orderDetails?.ws_products?.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        {item?.product?.name}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">{item?.quantity}</td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        ${item?.price?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        ${item?.total?.toFixed(2)}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        {item?.selectedVolume || '1ml'}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        {item?.flavor || 'N/A'}
                      </td>
                      <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                        <p className="text-umbra-100 rounded-[10px] bg-red-100 px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal capitalize">
                          Wholesale
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipping Address and Order Summary Section */}
          <div className="flex flex-col gap-2 md:flex-row md:space-x-6">
            {/* Shipping Address */}
            <div className="w-full md:flex-1">
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
            <div className="w-full md:flex-1">
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
