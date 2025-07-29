import OrderDetailsPage from '@/components/account/OrderDetailsPage';
import OrderDetailsPageShimmer from '@/components/account/OrderDetailsPageShimmer';
import { getOrderById } from '@/services/get-order-by-id';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// Async component for order details content
async function OrderDetailsContent({ orderId }) {
  // Get auth token from cookies
  const cookieStore = await cookies();
  const authToken = cookieStore.get('authToken')?.value;

  if (!authToken) {
    // Return component without initial data - let client handle auth
    return <OrderDetailsPage orderId={orderId} />;
  }

  // Fetch order data on server side
  const order = await getOrderById(orderId, authToken);

  // Handle different error cases
  if (order.authError) {
    // Let the client component handle auth redirect
    return <OrderDetailsPage orderId={orderId} />;
  }

  if (order.notFound || order.serverError || order.error) {
    // Call notFound() for invalid orders, just like blog and shop pages
    notFound();
  }

  // If we have valid order data, pass it to the client component
  return <OrderDetailsPage orderId={orderId} initialOrderData={order.data} />;
}

export default async function OrderDetailsPageWrapper({ params }) {
  const { orderId } = await params;

  return (
    <Suspense fallback={<OrderDetailsPageShimmer />}>
      <OrderDetailsContent orderId={orderId} />
    </Suspense>
  );
}
