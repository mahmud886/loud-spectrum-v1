'use client';

import OrderDetailsByCode from '@/components/account/OrderDetailsByCode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthToken } from '@/hooks/useAuthToken';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { toast } from 'sonner';

export default function OrderTrackPage() {
  const [orderCode, setOrderCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const token = useAuthToken();
  const t = useTranslations('OrdersPage');

  const handleSearch = () => {
    if (!orderCode.trim()) {
      setError(t('preSearchMessage'));
      toast.error(t('preSearchMessage'));
      return;
    }

    // if (!token) {
    //   toast.error(t('pleaseLoginToViewOrderDetails'));
    //   setError(t('pleaseLoginToViewOrderDetails'));
    //   return;
    // }

    // if (token) {
    //   toast.error(t('pleaseLoginToViewOrderDetails'));
    //   setError(t('pleaseLoginToViewOrderDetails'));
    //   return;
    // }

    setError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto w-full px-4 xl:px-0">
      <h1 className="mb-6 text-[24px] font-normal">{t('trackYourOrder')}</h1>

      <div className="mb-8">
        <label htmlFor="order-id" className="mb-2 block text-sm font-medium text-gray-700">
          {t('enterOrderId')}
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Input
              id="order-id"
              type="text"
              placeholder={t('enterOrderIdPlaceholder')}
              value={orderCode}
              onChange={(e) => {
                setOrderCode(e.target.value);
                setError('');
              }}
              className={`bg-umbra-5 placeholder:text-umbra-100 min-h-[48px] flex-1 rounded-[10px] px-4 py-2 ${
                error ? 'border-2 border-red-500' : ''
              }`}
            />
            <Button onClick={handleSearch} className="main-button-black min-h-[48px] rounded-[10px] px-6 py-2">
              {t('search')}
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>

      <div className="text-center text-gray-500">{t('yourOrderHistoryAppearsHere')}</div>

      <OrderDetailsByCode orderCode={orderCode} token={token} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
