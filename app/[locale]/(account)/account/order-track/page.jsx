'use client';

import OrderDetailsByCode from '@/components/account/OrderDetailsByCode';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';

export default function OrderTrackPage() {
  const [orderCode, setOrderCode] = useState('');
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [error, setError] = useState('');
  const token = useSelector((state) => state.auth.token);

  const handleSearch = () => {
    if (!orderCode.trim()) {
      setError('Please enter an order ID');
      toast.error('Please enter an order ID');
      return;
    }

    if (!token) {
      toast.error('Please log in to view order details');
      setError('Please log in to view order details');
      return;
    }

    setError('');
    setShowOrderDetails(true);
  };

  return (
    <div className="mx-auto w-full px-4 md:px-0">
      <h1 className="mb-6 text-[24px] font-normal">Track Your Order</h1>

      <div className="mb-8">
        <label htmlFor="order-id" className="mb-2 block text-sm font-medium text-gray-700">
          Enter Order ID
        </label>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <Input
              id="order-id"
              type="text"
              placeholder="e.g., OC-00000294"
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
              Search
            </Button>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
      </div>

      {showOrderDetails ? (
        <OrderDetailsByCode orderCode={orderCode} />
      ) : (
        <div className="text-center text-gray-500">Your order history appears here.</div>
      )}
    </div>
  );
}
