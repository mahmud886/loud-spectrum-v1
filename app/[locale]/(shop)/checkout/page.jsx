'use client';

import ConfirmPayment from '@/components/checkout/ConfirmPayment';
import DebitCreditCardDialog from '@/components/checkout/DebitAndCreditCardDialog';
import DiscountCoupon from '@/components/checkout/DiscountCoupon';
import OrderSummary from '@/components/checkout/OrderSummary';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import ProductCart from '@/components/checkout/ProductCart';
import ShippingAndBillingAddress from '@/components/checkout/ShippingAndBillingAddress';
import WireTransferDialog from '@/components/checkout/WireTransferDialog';
import { useEffect, useState } from 'react';

const CheckoutPage = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  // Control card dialog open/close
  const [showCardDialog, setShowCardDialog] = useState(true);

  // Card form state
  const [cardFormData, setCardFormData] = useState({
    cardHolderName: '',
    expiry: '',
    securityCode: '',
    postalCode: '',
  });

  const [showWireDialog, setShowWireDialog] = useState(false);
  const [wireFormData, setWireFormData] = useState({
    accountHolderName: '',
    accountNumber: '',
    transactionId: '',
  });

  // Handle input change
  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWireFormChange = (e) => {
    const { name, value } = e.target;
    setWireFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler for  debit / credit card form
  const handleCardSubmit = () => {
    console.log('Card Info Submitted:', cardFormData);
    setShowCardDialog(false);
  };

  // Submit handler for wire transfer input change
  const handleWireSubmit = () => {
    console.log('Wire info Submitted:', wireFormData);
    setShowCardDialog(false);
  };

  // Open dialog when selecting credit card
  useEffect(() => {
    setShowCardDialog(selectedPaymentMethod === 'debit-credit-card');
    setShowWireDialog(selectedPaymentMethod === 'ach-wire-transfer');
    console.log('Selected Payment Method:', selectedPaymentMethod);
  }, [selectedPaymentMethod]);

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
            <OrderSummary subtotal={120} shipping={0} discount={10} />
            <PaymentMethod value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod} />
            <ConfirmPayment />
          </div>
        </div>
      </div>

      {/* Show card form dialog */}
      <DebitCreditCardDialog
        open={showCardDialog}
        onClose={() => setShowCardDialog(false)}
        formData={cardFormData}
        onChange={handleCardInputChange}
        onSubmit={handleCardSubmit}
      />

      {/* Show wire transfer card*/}
      <WireTransferDialog
        open={showWireDialog}
        onClose={() => setShowWireDialog(false)}
        formData={wireFormData}
        onChange={handleWireFormChange}
        onSubmit={handleWireSubmit}
      />
    </>
  );
};

export default CheckoutPage;
