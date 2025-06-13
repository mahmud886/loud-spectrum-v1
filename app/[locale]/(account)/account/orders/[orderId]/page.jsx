import OrderDetailsPage from '@/components/account/OrderDetailsPage';

export default async function OrderDetailsPageWrapper({ params }) {
  const { orderId } = await params;
  return (
    <>
      <OrderDetailsPage orderId={orderId} />
    </>
  );
}
