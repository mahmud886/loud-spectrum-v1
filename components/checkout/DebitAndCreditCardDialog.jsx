'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';

const DebitCreditCardDialog = ({ open, onClose, formData, onChange, onSubmit }) => {
  const t = useTranslations('CheckoutPage.PaymentDialog');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[90vh] w-full flex-col overflow-y-scroll rounded-lg bg-white p-6 md:h-auto md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-umbra-100 font-sans text-[20px] font-normal">{t('title')}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
              {t('cardHolderName')}*
            </label>
            <Input
              name="cardHolderName"
              placeholder={t('cardHolderName')}
              value={formData.cardHolderName}
              onChange={onChange}
              className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1">
              <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('expiry')}*</label>
              <Input
                name="expiry"
                placeholder="MM/YY"
                value={formData.expiry}
                onChange={onChange}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>
            <div className="col-span-1">
              <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
                {t('securityCode')}*
              </label>
              <Input
                name="securityCode"
                placeholder="CVV"
                value={formData.securityCode}
                onChange={onChange}
                className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
              />
            </div>
            <div className="col-span-1">
              <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">{t('postalCode')}</label>
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
            {t('saveButton')}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DebitCreditCardDialog;
