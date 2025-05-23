// app/checkout/page.js
'use client';

import { useDispatch, useSelector } from 'react-redux';
import ConfirmPayment from '@/components/checkout/ConfirmPayment';
import DebitCreditCardDialog from '@/components/checkout/DebitAndCreditCardDialog';
import DiscountCoupon from '@/components/checkout/DiscountCoupon';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import ProductCart from '@/components/checkout/ProductCart';
import ShippingAndBillingAddress from '@/components/checkout/ShippingAndBillingAddress';
import WireTransferDialog from '@/components/checkout/WireTransferDialog';
import { setPaymentMethod } from '@/lib/store/slices/checkoutSlice';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { paymentMethod, order } = useSelector((state) => state.checkout);

  return (
    <>
      <div className="flex w-full flex-col items-start justify-between gap-5 pb-10 md:flex-row">
        <div className="h-auto w-full rounded-[10px] shadow-sm md:min-w-[58%]">
          <ShippingAndBillingAddress />
        </div>
        <div className="h-auto w-full rounded-[10px] pb-4 shadow-sm md:min-w-[40%]">
          <div className="px-4">
            <ProductCart />
            <DiscountCoupon />
            <OrderSummary subtotal={order.subtotal} shipping={order.shipping} discount={order.discount} />
            <PaymentMethod value={paymentMethod} onValueChange={(value) => dispatch(setPaymentMethod(value))} />
            <ConfirmPayment />
          </div>
        </div>
      </div>

      <DebitCreditCardDialog />

      <WireTransferDialog />
    </>
  );
};

export default CheckoutPage;
