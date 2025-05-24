// app/checkout/page.js
'use client';

import ConfirmPayment from '@/components/checkout/ConfirmPayment';
import DebitCreditCardDialog from '@/components/checkout/DebitAndCreditCardDialog';
import DiscountCoupon from '@/components/checkout/DiscountCoupon';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import ProductCart from '@/components/checkout/ProductCart';
import ShippingAndBillingAddress from '@/components/checkout/ShippingAndBillingAddress';
import WireTransferDialog from '@/components/checkout/WireTransferDialog';
import { setOrderDetails, setPaymentMethod } from '@/lib/store/slices/checkoutSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { paymentMethod, order } = useSelector((state) => state.checkout);
  const cartTotal = useSelector((state) => state.cart.totalAmount);

  useEffect(() => {
    // Initialize order details with cart total while preserving existing values
    const currentOrder = order;
    dispatch(
      setOrderDetails({
        subtotal: cartTotal,
        shipping: currentOrder.shipping || 0,
        discount: currentOrder.discount || 0,
        total: cartTotal + (currentOrder.shipping || 0) - (currentOrder.discount || 0),
      }),
    );
  }, [dispatch, cartTotal]);

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
            <OrderSummary />
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
