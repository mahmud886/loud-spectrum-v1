import OrderConfirmationContent from '@/components/order-confirmation/OrderConfirmationContent';
import { getOrderDetails } from '@/services/get-order-details-by-id';
import { notFound, redirect } from 'next/navigation';

export default async function OrderConfirmationPage({ params }) {
  const { orderId } = await params;

  try {
    const orderResponse = await getOrderDetails(orderId);

    // Handle different types of errors
    if (orderResponse.authError) {
      // Redirect to login page for authentication errors
      // console.error('Authentication error:', orderResponse.message);
      redirect('/login');
    }

    if (orderResponse.notFound) {
      // Show 404 for order not found
      // console.error('Order not found:', orderResponse.message);
      notFound();
    }

    if (orderResponse.serverError) {
      // Handle server errors - show 404 instead of throwing error
      // console.error('Server error:', orderResponse.message);
      notFound();
    }

    if (orderResponse.error) {
      // Handle other errors - show 404 instead of throwing error
      // console.error('Error fetching order:', orderResponse.message);
      notFound();
    }

    if (!orderResponse.data) {
      // console.error('Invalid order response:', orderResponse);
      notFound();
    }

    const orderData = orderResponse.data;

    return (
      <div className="container mx-auto px-4 py-8">
        <OrderConfirmationContent orderData={orderData} />
      </div>
    );
  } catch (error) {
    // console.error('Error loading order:', error);
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
