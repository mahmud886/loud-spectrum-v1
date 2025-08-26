import { Link } from '@/i18n/navigation';

export default function GuestOrderConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">Order Confirmation</h2>
          <p className="mb-6 text-gray-600">Guest order confirmations are shown during the checkout process.</p>
          <div className="space-y-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-center font-sans text-[16px] leading-[120%] font-normal text-white transition-colors hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
            <br />
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-center font-sans text-[16px] leading-[120%] font-normal text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'Guest Order Confirmation | Loud Spectrum',
    description: 'Thank you for your order! Your guest order confirmation.',
  };
}
