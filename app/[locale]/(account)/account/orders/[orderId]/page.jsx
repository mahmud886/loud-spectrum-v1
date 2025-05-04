'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const OrderDetailsPage = ({ params }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  // Unwrap the `params` Promise using `React.use()`
  const { orderId } = React.use(params); // Using React.use() to unwrap params

  // Dummy data for order details
  const dummyOrderDetails = {
    id: 'ORD12345',
    date: '2025-05-04T14:30:00Z',
    items: [
      { id: 'ITEM001', name: 'Laptop', quantity: 1, price: 799.99 },
      { id: 'ITEM002', name: 'Wireless Mouse', quantity: 2, price: 29.99 },
      { id: 'ITEM003', name: 'Keyboard', quantity: 1, price: 49.99 },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main St, City, State, 12345',
      phone: '123-456-7890',
    },
    orderSummary: {
      totalAmount: 999.96,
      shippingFee: 10.0,
      taxes: 50.0,
      finalAmount: 1059.96,
    },
  };

  useEffect(() => {
    if (orderId) {
      // Simulating an API response with dummy data based on the orderId
      setOrderDetails(dummyOrderDetails);
    }
  }, [orderId]);

  if (!orderDetails) return <div>Loading...</div>;

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Order Details - {orderDetails.id}</h1>

      {/* Product List Section */}
      <div className="mb-6">
        <h3 className="mb-4 text-xl font-semibold">Product Details</h3>
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">${item.price.toFixed(2)}</td>
                  <td className="px-4 py-2">${(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Address and Order Summary Section */}
      <div className="flex space-x-6">
        {/* Shipping Address */}
        <div className="flex-1">
          <h3 className="mb-4 text-xl font-semibold">Shipping Address</h3>
          <div className="rounded-md bg-gray-50 p-4">
            <p className="font-medium">{orderDetails.shippingAddress.name}</p>
            <p>{orderDetails.shippingAddress.address}</p>
            <p>{orderDetails.shippingAddress.phone}</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="flex-1">
          <h3 className="mb-4 text-xl font-semibold">Order Summary</h3>
          <div className="rounded-md bg-gray-50 p-4">
            <div className="mb-2 flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>${orderDetails.orderSummary.totalAmount.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="font-medium">Shipping Fee</span>
              <span>${orderDetails.orderSummary.shippingFee.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between">
              <span className="font-medium">Taxes</span>
              <span>${orderDetails.orderSummary.taxes.toFixed(2)}</span>
            </div>
            <div className="mb-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${orderDetails.orderSummary.finalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Orders Button */}
      <div className="mt-6 flex justify-end">
        <button
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
          onClick={() => window.history.back()} // Goes back to the previous page
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
