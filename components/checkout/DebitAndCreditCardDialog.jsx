'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const DebitCreditCardDialog = ({ open, onClose, formData, onChange, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-umbra-100 font-sans text-[20px] font-normal">Enter Card Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Card Holder Name*</label>
            <Input
              name="cardHolderName"
              placeholder="Card Holder Name"
              value={formData.cardHolderName}
              onChange={onChange}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Expiry*</label>
              <Input
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={onChange}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>
            <div>
              <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Security Code*</label>
              <Input
                name="securityCode"
                placeholder="CVV"
                value={formData.securityCode}
                onChange={onChange}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>
            <div>
              <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">Postal Code</label>
              <Input
                name="postalCode"
                placeholder="UK"
                value={formData.postalCode}
                onChange={onChange}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>
          </div>
          <button
            onClick={onSubmit}
            className="main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-3"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DebitCreditCardDialog;
