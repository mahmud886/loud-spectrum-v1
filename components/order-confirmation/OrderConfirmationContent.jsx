'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { CheckCircle, CreditCard, Hash, MapPin, Package, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const OrderConfirmationContent = ({ orderData }) => {
  const t = useTranslations('OrderConfirmation');

  if (!orderData) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-gray-900">{t('orderNotFound')}</h2>
          <p className="mb-4 text-gray-600">{t('orderNotFoundMessage')}</p>
          <Link href="/shop" className="text-blue-600 hover:text-blue-800">
            {t('continueShoppingButton')}
          </Link>
        </div>
      </div>
    );
  }

  const {
    _id,
    code,
    customer_name,
    products = [],
    ws_products = [],
    sub_total,
    tax_amount,
    shipping_amount,
    discount_amount,
    total,
    payment_type,
    payment_status,
    order_status,
    type,
    shipping_details,
    billing_details,
    created_at,
  } = orderData;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price) => {
    return `$${parseFloat(price || 0).toFixed(2)}`;
  };

  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
        return 'default';
      case 'shipped':
        return 'secondary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const getPaymentStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'success';
      case 'unpaid':
        return 'destructive';
      case 'pending':
        return 'default';
      default:
        return 'outline';
    }
  };

  const allProducts = [...products, ...ws_products];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Success Header */}
      <div className="space-y-4 text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('thankYou')}</p>
      </div>

      {/* Order Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            {t('orderDetails')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Order Number</p>
              <p className="text-lg font-semibold">{code}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Order Date</p>
              <p className="text-lg font-semibold">{formatDate(created_at)}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Order Status</p>
              <Badge variant={getStatusBadgeVariant(order_status)}>{order_status}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Status</p>
              <Badge variant={getPaymentStatusBadgeVariant(payment_status)}>{payment_status}</Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500">Order Type</p>
              <p className="text-lg font-semibold">{type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Payment Method</p>
              <p className="text-lg font-semibold">
                {payment_type === 'COD'
                  ? 'Cash on Delivery'
                  : payment_type === 'CARD'
                    ? 'Credit/Debit Card'
                    : payment_type === 'ACH/WT'
                      ? 'Wire Transfer'
                      : payment_type}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <p className="text-xl font-bold text-green-600">{formatPrice(total)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order Items ({allProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allProducts.map((item, index) => (
              <div key={item._id || index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{item.product?.name || `Product ${index + 1}`}</h4>
                  <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                    <span>Qty: {item.quantity}</span>
                    <span>Price: {formatPrice(item.price)}</span>
                    {type === 'Wholesale' && <Badge variant="secondary">Wholesale</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatPrice(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Order Total Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>{formatPrice(sub_total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span>{formatPrice(shipping_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span>{formatPrice(tax_amount)}</span>
            </div>
            {discount_amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-{formatPrice(discount_amount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping & Billing Addresses */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-semibold">
                {shipping_details?.first_name} {shipping_details?.last_name}
              </p>
              <p>{shipping_details?.street_address}</p>
              <p>
                {shipping_details?.city}, {shipping_details?.province} {shipping_details?.post_code}
              </p>
              <p>{shipping_details?.country}</p>
              <p className="text-sm text-gray-600">{shipping_details?.email}</p>
              <p className="text-sm text-gray-600">{shipping_details?.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Billing Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Billing Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-semibold">
                {billing_details?.first_name} {billing_details?.last_name}
              </p>
              <p>{billing_details?.street_address}</p>
              <p>
                {billing_details?.city}, {billing_details?.province} {billing_details?.post_code}
              </p>
              <p>{billing_details?.country}</p>
              <p className="text-sm text-gray-600">{billing_details?.email}</p>
              <p className="text-sm text-gray-600">{billing_details?.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/shop"
          className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          Continue Shopping
        </Link>
        <Link
          href="/account/orders"
          className="inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
        >
          View All Orders
        </Link>
      </div>

      {/* Additional Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 text-center">
            <h3 className="font-semibold text-gray-900">What's Next?</h3>
            <p className="text-sm text-gray-600">
              You'll receive an email confirmation shortly with your order details and tracking information once your
              order ships.
            </p>
            <p className="text-sm text-gray-600">
              If you have any questions about your order, please contact our customer support.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationContent;
