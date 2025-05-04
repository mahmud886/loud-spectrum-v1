'use client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';

const OrderDetailsDialog = ({ open, onOpenChange, orderId }) => {
  const [orderDetails, setOrderDetails] = useState(null);

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
    if (open && orderId) {
      // Simulating an API response with dummy data
      setOrderDetails(dummyOrderDetails);
    }
  }, [open, orderId]);

  if (!open || !orderDetails) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full rounded-lg bg-white p-6 md:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-umbra-100 font-sans text-[24px] leading-[120%] font-normal">
            Order Details - {orderDetails.id}
          </DialogTitle>
        </DialogHeader>

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
                </tr>
              </thead>
              <tbody>
                {orderDetails.items.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">{item.name}</td>
                    <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">{item.quantity}</td>
                    <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="text-umbra-100 px-4 py-2 font-sans text-[14px] font-normal">
                      ${(item.quantity * item.price).toFixed(2)}
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
                <p className="text-umbra-100 font-sans text-[14px] font-normal">{orderDetails.shippingAddress.name}</p>
                <p className="text-umbra-100 font-sans text-[14px] font-normal">
                  {orderDetails.shippingAddress.address}
                </p>
                <p className="text-umbra-100 font-sans text-[14px] font-normal">{orderDetails.shippingAddress.phone}</p>
              </div>
              <div className="p-4">
                <h3 className="mb-1 text-[18px] font-normal">Billing Address</h3>
                <p className="text-umbra-100 font-sans text-[14px] font-normal">{orderDetails.shippingAddress.name}</p>
                <p className="text-umbra-100 font-sans text-[14px] font-normal">
                  {orderDetails.shippingAddress.address}
                </p>
                <p className="text-umbra-100 font-sans text-[14px] font-normal">{orderDetails.shippingAddress.phone}</p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full md:flex-1">
            <h3 className="mb-4 text-[18px] font-normal">Order Summary</h3>
            <div className="rounded-[10px] bg-gray-50 p-4">
              <div className="mb-2 flex justify-between">
                <span className="text-umbra-100 font-sans text-[14px] font-normal">Subtotal</span>
                <span>${orderDetails.orderSummary.totalAmount.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-umbra-100 font-sans text-[14px] font-normal">Shipping Fee</span>
                <span>${orderDetails.orderSummary.shippingFee.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex justify-between">
                <span className="text-umbra-100 font-sans text-[14px] font-normal">Taxes</span>
                <span>${orderDetails.orderSummary.taxes.toFixed(2)}</span>
              </div>
              <div className="border-umbra-10 mb-2 flex justify-between border-t pt-2 font-normal">
                <span className="text-umbra-100 font-sans text-[14px] font-normal">Total</span>
                <span>${orderDetails.orderSummary.finalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 flex justify-end">
          <button className="main-button-black rounded-full px-6 py-2 text-white" onClick={() => onOpenChange(false)}>
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsDialog;
