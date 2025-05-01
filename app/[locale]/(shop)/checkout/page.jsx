'use client';
import ShippingAndBillingAddress from '@/components/checkout/ShippingAndBillingAddress';
import ProductCart from '@/components/checkout/ProductCart';
import DiscountCoupon from '@/components/checkout/DiscountCoupon';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import { useState } from 'react';
import ConfirmPayment from '@/components/checkout/ConfirmPayment';

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('debit-credit-card');

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
  };
  return (
    <div className="flex w-full flex-col items-start justify-between gap-5 pb-10 md:flex-row">
      <div className="h-auto w-full rounded-[10px] shadow-sm md:min-w-[58%]">
        <ShippingAndBillingAddress />
      </div>
      <div className="h-auto w-full rounded-[10px] pb-4 shadow-sm md:min-w-[40%]">
        <div className="px-4">
          <ProductCart />
          <DiscountCoupon />
          <OrderSummary subtotal={120} shipping={0} discount={10} />
          <PaymentMethod value={selectedPaymentMethod} onValueChange={handlePaymentMethodChange} />
          <ConfirmPayment />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
