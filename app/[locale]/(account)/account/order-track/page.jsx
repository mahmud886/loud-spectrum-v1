'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function OrderTrackPage() {
  const [orderId, setOrderId] = useState('');

  const handleSearch = () => {
    console.log('Searching for Order ID:', orderId);
  };

  return (
    <div className="mx-auto w-full px-4 md:px-0">
      <h1 className="mb-6 text-[24px] font-normal">Track Your Order</h1>

      <div className="mb-8">
        <label htmlFor="order-id" className="mb-2 block text-sm font-medium text-gray-700">
          Enter Order ID
        </label>
        <div className="flex flex-row items-center gap-2">
          <Input
            id="order-id"
            type="text"
            placeholder="e.g., #12345678"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="bg-umbra-5 placeholder:text-umbra-100 min-h-[48px] flex-1 rounded-[10px] px-4 py-2"
          />
          <Button onClick={handleSearch} className="main-button-black min-h-[48px] rounded-[10px] px-6 py-2">
            Search
          </Button>
        </div>
      </div>

      <div className="text-center text-gray-500">Your order history appears here.</div>
    </div>
  );
}
