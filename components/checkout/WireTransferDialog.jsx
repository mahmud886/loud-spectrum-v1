'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

const WireTransferDialog = ({ open, onClose, formData, onChange, onSubmit }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="flex max-h-[90vh] w-full flex-col overflow-hidden rounded-lg bg-white p-6 md:h-auto md:max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left Side - Bank Details */}
          <div className="h-full w-full md:w-1/2">
            <DialogHeader>
              <DialogTitle className="mb-4 text-2xl">Bank Details</DialogTitle>
            </DialogHeader>

            <div className="h-full">
              <table className="h-full w-full rounded-md border border-gray-200 text-sm">
                <tbody className="h-full">
                  <tr className="border-b">
                    <td className="px-4 py-5.5 font-semibold">Bank Name</td>
                    <td className="px-4 py-5.5">Chase</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-5.5">Account Number</td>
                    <td className="px-4 py-5.5">615230586</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-5.5">Sort Code</td>
                    <td className="px-4 py-5.5">3222271628</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-5.5">BIC</td>
                    <td className="px-4 py-5.5">CHASUS33</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-5.5">IBAN</td>
                    <td className="px-4 py-5.5">CHASUS33</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2">
            <DialogHeader>
              <DialogTitle className="mb-4 text-2xl">Confirm Your Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
                  Transaction ID<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={onChange}
                  placeholder="Transaction ID"
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
              </div>
              <div>
                <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
                  Account Name<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="accountName"
                  value={formData.accountHolderName}
                  onChange={onChange}
                  placeholder="Account Name"
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
              </div>
              <div>
                <label className="text-umbra-100 mb-1 block font-sans text-[16px] font-normal">
                  Account Number<span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={onChange}
                  placeholder="Account Number"
                  className="bg-umbra-5 placeholder:text-umbra-100 hover:bg-umbra-10 min-h-[48px] w-full rounded-[10px] px-4 py-2 font-mono text-[16px] leading-[140%] font-normal"
                />
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <button
                  className="main-button-white inline-flex w-full items-center justify-center rounded-full px-6 py-3 outline"
                  type="button"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  onClick={onSubmit}
                  className="main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-3"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WireTransferDialog;
