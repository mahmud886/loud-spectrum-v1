'use client';

import OrderDetailsDialog from '@/components/account/OrderDetailsDialog';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Link } from '@/i18n/navigation';
import { PackageX } from 'lucide-react';
import { useState } from 'react';

export default function UserOrdersPage({ orders }) {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleViewClick = (orderId) => {
    setSelectedOrderId(orderId);
    setDialogOpen(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateTotalQuantity = (products) => {
    return products.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="mx-auto max-w-full p-4 md:p-0">
      <h1 className="text-umbra-100 mb-6 text-[24px] leading-[130%] font-normal">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="text-muted-foreground flex max-h-[80dvh] min-h-[300px] flex-col items-center justify-center rounded border text-center">
          <PackageX className="mb-4 h-12 w-12 text-gray-400" />
          <p className="text-lg font-medium">No orders found</p>
          <p className="text-sm text-gray-500">You haven't placed any orders yet.</p>
          <div className="mt-5">
            <Link
              href={`/shop`}
              className="main-button-black inline-flex items-center justify-center rounded-full px-6 py-1 !text-[14px]"
            >
              Continue Buying
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid w-full overflow-auto [&>div]:max-h-[80dvh] [&>div]:rounded [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className="bg-background after:bg-border sticky top-0 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:content-[''] [&>*]:whitespace-nowrap">
                <TableHead className="font-sans font-normal">Order ID</TableHead>
                <TableHead className="font-sans font-normal">Order Date</TableHead>
                <TableHead className="font-sans font-normal">Quantity</TableHead>
                <TableHead className="font-sans font-normal">Total Amount</TableHead>
                <TableHead className="font-sans font-normal">Status</TableHead>
                <TableHead className="font-sans font-normal">Payment Status</TableHead>
                <TableHead className="text-center font-sans font-normal">Action</TableHead>
                <TableHead className="text-center font-sans font-normal">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order._id} className="odd:bg-muted/50 [&>*]:whitespace-nowrap">
                  <TableCell>
                    <Link
                      href={`/account/orders/${order._id}`}
                      className="bg-stardust/80 hover:bg-stardust text-umbra-100 rounded-[10px] px-2 py-1 text-[10px]"
                    >
                      {order.code}
                    </Link>
                  </TableCell>
                  <TableCell>{formatDate(order.created_at)}</TableCell>
                  <TableCell>{calculateTotalQuantity(order.products)}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.order_status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.order_status === 'Pending'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-pink-100 text-pink-800'
                      }
                    >
                      {order.order_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.payment_status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }
                    >
                      {order.payment_status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.payment_status === 'Unpaid' ? (
                      <Badge className="bg-red-100 text-red-800">Pay Now</Badge>
                    ) : (
                      <Badge className="bg-green-50 font-normal text-green-600">Paid</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      onClick={() => handleViewClick(order._id)}
                      className="cursor-pointer bg-green-50 font-normal text-green-600"
                    >
                      View
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog */}
      <OrderDetailsDialog open={dialogOpen} onOpenChange={setDialogOpen} orderId={selectedOrderId} />
    </div>
  );
}
