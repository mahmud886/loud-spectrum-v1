'use client';

import { PackageX } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Link } from '@/i18n/navigation';

export default function OrdersPage() {
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
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
                <TableHead className="text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="odd:bg-muted/50 [&>*]:whitespace-nowrap">
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>{order.totalAmount}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Pending'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-pink-100 text-pink-800'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }
                    >
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.paymentStatus === 'Unpaid' ? (
                      <Badge className="bg-red-100 text-red-800">Pay Now</Badge>
                    ) : (
                      <Badge className="bg-green-50 font-normal text-green-600">Paid</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      onClick={() => console.log('View order details', order.id)}
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
    </div>
  );
}

const orders = [
  { id: '#ORD001', date: '2025-05-01', quantity: 3, totalAmount: '$120.00', status: 'Shipped', paymentStatus: 'Paid' },
  { id: '#ORD002', date: '2025-04-28', quantity: 2, totalAmount: '$80.00', status: 'Pending', paymentStatus: 'Unpaid' },
  { id: '#ORD003', date: '2025-04-25', quantity: 1, totalAmount: '$40.00', status: 'Delivered', paymentStatus: 'Paid' },
  {
    id: '#ORD004',
    date: '2025-04-22',
    quantity: 4,
    totalAmount: '$160.00',
    status: 'Processing',
    paymentStatus: 'Unpaid',
  },
  { id: '#ORD005', date: '2025-04-20', quantity: 2, totalAmount: '$75.00', status: 'Delivered', paymentStatus: 'Paid' },
  {
    id: '#ORD006',
    date: '2025-04-18',
    quantity: 5,
    totalAmount: '$200.00',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
  },
  { id: '#ORD007', date: '2025-04-15', quantity: 3, totalAmount: '$150.00', status: 'Shipped', paymentStatus: 'Paid' },
  { id: '#ORD008', date: '2025-04-10', quantity: 1, totalAmount: '$35.00', status: 'Pending', paymentStatus: 'Unpaid' },
  {
    id: '#ORD009',
    date: '2025-04-07',
    quantity: 6,
    totalAmount: '$240.00',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  { id: '#ORD010', date: '2025-04-05', quantity: 2, totalAmount: '$90.00', status: 'Shipped', paymentStatus: 'Paid' },
  {
    id: '#ORD011',
    date: '2025-04-01',
    quantity: 3,
    totalAmount: '$110.00',
    status: 'Processing',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#ORD012',
    date: '2025-03-30',
    quantity: 1,
    totalAmount: '$50.00',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#ORD013',
    date: '2025-03-28',
    quantity: 4,
    totalAmount: '$180.00',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  { id: '#ORD014', date: '2025-03-25', quantity: 2, totalAmount: '$85.00', status: 'Pending', paymentStatus: 'Unpaid' },
  { id: '#ORD015', date: '2025-03-22', quantity: 5, totalAmount: '$210.00', status: 'Shipped', paymentStatus: 'Paid' },
  {
    id: '#ORD016',
    date: '2025-03-18',
    quantity: 3,
    totalAmount: '$130.00',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: '#ORD017',
    date: '2025-03-15',
    quantity: 1,
    totalAmount: '$45.00',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#ORD018',
    date: '2025-03-10',
    quantity: 2,
    totalAmount: '$70.00',
    status: 'Processing',
    paymentStatus: 'Unpaid',
  },
  { id: '#ORD019', date: '2025-03-08', quantity: 4, totalAmount: '$175.00', status: 'Shipped', paymentStatus: 'Paid' },
  {
    id: '#ORD020',
    date: '2025-03-05',
    quantity: 6,
    totalAmount: '$250.00',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  { id: '#ORD021', date: '2025-03-02', quantity: 2, totalAmount: '$95.00', status: 'Pending', paymentStatus: 'Unpaid' },
  {
    id: '#ORD022',
    date: '2025-02-28',
    quantity: 3,
    totalAmount: '$140.00',
    status: 'Processing',
    paymentStatus: 'Unpaid',
  },
  { id: '#ORD023', date: '2025-02-25', quantity: 5, totalAmount: '$215.00', status: 'Shipped', paymentStatus: 'Paid' },
  {
    id: '#ORD024',
    date: '2025-02-22',
    quantity: 1,
    totalAmount: '$55.00',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#ORD025',
    date: '2025-02-20',
    quantity: 4,
    totalAmount: '$170.00',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  { id: '#ORD026', date: '2025-02-18', quantity: 2, totalAmount: '$85.00', status: 'Pending', paymentStatus: 'Unpaid' },
  { id: '#ORD027', date: '2025-02-15', quantity: 3, totalAmount: '$125.00', status: 'Shipped', paymentStatus: 'Paid' },
  {
    id: '#ORD028',
    date: '2025-02-12',
    quantity: 6,
    totalAmount: '$260.00',
    status: 'Delivered',
    paymentStatus: 'Paid',
  },
  {
    id: '#ORD029',
    date: '2025-02-10',
    quantity: 1,
    totalAmount: '$40.00',
    status: 'Cancelled',
    paymentStatus: 'Unpaid',
  },
  {
    id: '#ORD030',
    date: '2025-02-07',
    quantity: 2,
    totalAmount: '$75.00',
    status: 'Processing',
    paymentStatus: 'Unpaid',
  },
];
