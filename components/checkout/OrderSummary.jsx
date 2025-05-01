import React from 'react';

const OrderSummary = ({ subtotal, shipping, discount }) => {
  const isFreeShipping = shipping === 0 || shipping === 'free';
  const total = subtotal + (isFreeShipping ? 0 : shipping) - discount;

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      {/* Title */}
      <div className="border-umbra-10 border-b-1 pb-2">
        <h2 className="text-umbra-100 font-sans text-[20px] leading-[120%] font-normal">Your order summary</h2>
      </div>

      {/* Summary Rows */}
      <div className="text-umbra-100 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span>Total Volume</span>
          <span>10ml</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span>${discount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Tax</span>
          <span>Free</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span>{isFreeShipping ? 'Free Shipping' : `$${shipping.toFixed(2)}`}</span>
        </div>
      </div>

      {/* Total */}
      <div className="border-umbra-10 text-umbra-100 flex items-center justify-between border-t pt-4 text-base font-semibold">
        <span>Total Amount</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
