'use client';

import ConfirmPayment from '@/components/checkout/ConfirmPayment';
import DebitCreditCardDialog from '@/components/checkout/DebitAndCreditCardDialog';
import DiscountCoupon from '@/components/checkout/DiscountCoupon';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import ProductCart from '@/components/checkout/ProductCart';
import WireTransferDialog from '@/components/checkout/WireTransferDialog';
import {
  selectCardFormData,
  selectOrderSummary,
  selectSelectedCourier,
  selectSelectedPaymentMethod,
  selectShippingType,
  selectShowCardDialog,
  selectShowWireDialog,
  selectWireFormData,
  setCardFormField,
  setSelectedCourier,
  setSelectedPaymentMethod,
  setShippingType,
  setShowCardDialog,
  setShowWireDialog,
  setWireFormField,
} from '@/lib/store/slices/checkoutSlice';
import { useTranslations } from 'next-intl';
import { useDispatch, useSelector } from 'react-redux';
import ChooseYourCourier from './ChooseYourCourier';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const t = useTranslations('CheckoutPage.ShippingAndBillingAddress');

  // Redux selectors
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);
  const cardFormData = useSelector(selectCardFormData);
  const wireFormData = useSelector(selectWireFormData);
  const showCardDialog = useSelector(selectShowCardDialog);
  const showWireDialog = useSelector(selectShowWireDialog);
  const selectedCourier = useSelector(selectSelectedCourier);
  const shippingType = useSelector(selectShippingType);
  const orderSummary = useSelector(selectOrderSummary);

  // Event handlers
  const handleCourierChange = (value) => {
    dispatch(setSelectedCourier(value));
  };

  const handleShippingTypeChange = (value) => {
    dispatch(setShippingType(value));
  };

  const handlePaymentMethodChange = (value) => {
    dispatch(setSelectedPaymentMethod(value));
  };

  // Handle card input change
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCardFormField({ name, value }));
  };

  // Handle wire form input change
  const handleWireFormChange = (e) => {
    const { name, value } = e.target;
    dispatch(setWireFormField({ name, value }));
  };

  // Submit handler for debit / credit card form
  const handleCardSubmit = () => {
    console.log('Card Info Submitted:', cardFormData);
    dispatch(setShowCardDialog(false));
    // Here you would typically process the payment
  };

  // Submit handler for wire transfer
  const handleWireSubmit = () => {
    console.log('Wire info Submitted:', wireFormData);
    dispatch(setShowWireDialog(false));
    // Here you would typically process the wire transfer
  };

  // Handle dialog close
  const handleCardDialogClose = () => {
    dispatch(setShowCardDialog(false));
  };

  const handleWireDialogClose = () => {
    dispatch(setShowWireDialog(false));
  };

  return (
    <>
      <div className="flex w-full flex-col items-start justify-between gap-5 pb-10 md:flex-row">
        <div className="h-auto w-full rounded-[10px] shadow-sm md:min-w-[58%]">
          <div className="px-4">
            <ProductCart />
          </div>
          {/* <ShippingAndBillingAddress /> */}
        </div>
        <div className="h-auto w-full rounded-[10px] pb-4 shadow-sm md:min-w-[40%]">
          <div className="px-4">
            <ChooseYourCourier
              value={selectedCourier}
              onValueChange={handleCourierChange}
              selectedShippingType={shippingType}
              onShippingTypeChange={handleShippingTypeChange}
            />
            <DiscountCoupon />
            <OrderSummary />
            <PaymentMethod value={selectedPaymentMethod} onValueChange={handlePaymentMethodChange} />
            <ConfirmPayment />
          </div>
        </div>
      </div>

      {/* Show card form dialog */}
      <DebitCreditCardDialog
        open={showCardDialog}
        onClose={handleCardDialogClose}
        formData={cardFormData}
        onChange={handleCardInputChange}
        onSubmit={handleCardSubmit}
      />

      {/* Show wire transfer dialog */}
      <WireTransferDialog
        open={showWireDialog}
        onClose={handleWireDialogClose}
        formData={wireFormData}
        onChange={handleWireFormChange}
        onSubmit={handleWireSubmit}
      />
    </>
  );
};

export default CheckoutPage;
