import React, { useState } from 'react';
import { useRouter } from '@/i18n/navigation';

const ContinueToPayment = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinuePayment = () => {
    setLoading(true);
    setTimeout(() => {
      router.push('/payment');
    }, 1500);
  };

  return (
    <div className="border-umbra-10 mt-4 space-y-5 rounded-[10px] border-1 p-4">
      <div className="flex justify-center">
        <button
          onClick={handleContinuePayment}
          className={`main-button-black inline-flex w-full items-center justify-center rounded-full px-6 py-4 transition-colors ${
            loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-umbra-40'
          }`}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Continue to Payment'}
        </button>
      </div>
    </div>
  );
};

export default ContinueToPayment;
