import UserOrdersPage from '@/components/account/UserOrders';
import { getOrders } from '@/services/get-orders';

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <>
      <UserOrdersPage orders={orders?.data} />
    </>
  );
}
