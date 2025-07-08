'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

const WireTransferDialog = ({ open, onClose, formData, onChange, onSubmit }) => {
  const t = useTranslations('CheckoutPage.WireTransferDialog');

  const validateWireForm = () => {
    const requiredFields = {
      accountHolderName: t('accountName'),
      accountNumber: t('accountNumber'),
      transactionId: t('transactionId'),
    };

    const missingFields = [];
    Object.entries(requiredFields).forEach(([field, label]) => {
      if (!formData[field] || String(formData[field]).trim() === '') {
        missingFields.push(label);
      }
    });

    if (missingFields.length > 0) {
      toast.error('Incomplete Wire Transfer Information', {
        description: `Please fill in: ${missingFields.join(', ')}`,
        duration: 4000,
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateWireForm()) {
      return;
    }

    toast.success('Wire Transfer Information Validated', {
      description: 'Processing your wire transfer...',
      duration: 2000,
    });

    // Call the original onSubmit
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <div>
        <DialogContent className="flex max-h-[90vh] w-full flex-col overflow-y-auto rounded-lg bg-white p-6 md:h-auto md:max-w-5xl">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Left Side - Bank Details */}
            <div className="h-full w-full md:w-1/2">
              <DialogHeader>
                <DialogTitle className="mb-4 text-2xl">{t('bankDetails')}</DialogTitle>
              </DialogHeader>

              <div className="h-full">
                <table className="h-full w-full rounded-md border border-gray-200 text-sm">
                  <tbody className="h-full">
                    <tr className="border-b">
                      <td className="px-4 py-5.5 font-semibold">{t('bankName')}</td>
                      <td className="px-4 py-5.5">Chase</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-5.5">{t('accountNumber')}</td>
                      <td className="px-4 py-5.5">615230586</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-5.5">{t('sortCode')}</td>
                      <td className="px-4 py-5.5">3222271628</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-5.5">{t('bic')}</td>
                      <td className="px-4 py-5.5">CHASUS33</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-5.5">{t('iban')}</td>
                      <td className="px-4 py-5.5">CHASUS33</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full md:w-1/2">
              <DialogHeader>
                <DialogTitle className="mb-4 text-2xl">{t('confirmPayment')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
                    {t('transactionId')}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="transactionId"
                    value={formData.transactionId}
                    onChange={onChange}
                    placeholder={t('transactionId')}
                    className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                  />
                </div>
                <div>
                  <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
                    {t('accountName')}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={onChange}
                    placeholder={t('accountName')}
                    className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                  />
                </div>
                <div>
                  <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
                    {t('accountNumber')}
                    <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={onChange}
                    placeholder={t('accountNumber')}
                    className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-2">
                  <button
                    className="main-button-white inline-flex w-full items-center justify-center rounded-full px-6 py-3 outline"
                    type="button"
                    onClick={onClose}
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-3"
                  >
                    {t('save')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default WireTransferDialog;
