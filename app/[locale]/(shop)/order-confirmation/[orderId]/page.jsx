import OrderConfirmationContent from '@/components/order-confirmation/OrderConfirmationContent';
import { getOrderDetails } from '@/services/get-order-details-by-id';
import { notFound } from 'next/navigation';

export default async function OrderConfirmationPage({ params }) {
  const { orderId } = await params;

  try {
    const orderResponse = await getOrderDetails(orderId);

    if (orderResponse.error || !orderResponse.data) {
      console.error('Order not found:', orderResponse.message);
      notFound();
    }

    const orderData = orderResponse.data;

    return (
      <div className="container mx-auto px-4 py-8">
        <OrderConfirmationContent orderData={orderData} />
      </div>
    );
  } catch (error) {
    console.error('Error loading order:', error);
    notFound();
  }
}

export async function generateMetadata({ params }) {
  const { orderId } = await params;

  return {
    title: `Order Confirmation - ${orderId} | Loud Spectrum`,
    description: 'Thank you for your order! Your order confirmation details.',
  };
}
