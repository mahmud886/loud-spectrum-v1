'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { CheckCircle, CreditCard, Hash, MapPin, Package, Truck } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

const OrderConfirmationContent = ({ orderData }) => {
  const t = useTranslations('OrderConfirmation');
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  console.log('Order data:', orderData);

  // Handle window resize for confetti
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial dimensions
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show confetti for 5 seconds
  useEffect(() => {
    if (orderData) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [orderData]);

  // Check for address mismatch and send suspicious order email
  useEffect(() => {
    if (orderData && orderData.shipping_details && orderData.billing_details) {
      const checkAddressMismatch = () => {
        const shipping = orderData.shipping_details;
        const billing = orderData.billing_details;

        // Compare key address fields
        const addressFields = [
          'first_name',
          'last_name',
          'street_address',
          'city',
          'province',
          'post_code',
          'country',
          'email',
          'phone',
        ];

        const mismatchedFields = addressFields.filter((field) => {
          const shippingValue = shipping[field]?.toString().toLowerCase().trim();
          const billingValue = billing[field]?.toString().toLowerCase().trim();
          return shippingValue !== billingValue;
        });

        // If more than 2 fields don't match, consider it suspicious
        if (mismatchedFields.length > 2) {
          console.log('Address mismatch detected:', mismatchedFields);

          // Send suspicious order email
          fetch('/api/emails/order/suspicious', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderData: orderData,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              if (data.success) {
                console.log('Suspicious order email sent successfully');
              } else {
                console.error('Failed to send suspicious order email:', data.error);
              }
            })
            .catch((error) => {
              console.error('Error sending suspicious order email:', error);
            });
        }
      };

      // Add a small delay to ensure order data is fully loaded
      const timeoutId = setTimeout(checkAddressMismatch, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [orderData]);

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

  const getPaymentMethodName = (paymentType) => {
    switch (paymentType) {
      case 'COD':
        return t('paymentMethods.COD');
      case 'CARD':
        return t('paymentMethods.CARD');
      case 'ACH/WT':
        return t('paymentMethods.ACH/WT');
      default:
        return paymentType;
    }
  };

  const allProducts = [...products, ...ws_products];

  return (
    <div className="relative mx-auto max-w-4xl space-y-6">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={300}
          gravity={0.3}
          initialVelocityY={20}
          colors={['#f43f5e', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444']}
        />
      )}

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
          <CardTitle className="flex items-center justify-center gap-2 text-center">
            <Hash className="h-5 w-5" />
            {t('orderDetails')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 items-center justify-center gap-4 lg:grid-cols-4 xl:grid-cols-2">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">{t('fields.orderNumber')}</p>
              <p className="text-sm font-semibold capitalize">{code}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">{t('fields.orderDate')}</p>
              <p className="text-sm font-semibold capitalize">{formatDate(created_at)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">{t('fields.orderStatus')}</p>
              <Badge
                variant={getStatusBadgeVariant(order_status)}
                className="text-umbra-100 rounded-full bg-green-100 px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize"
              >
                {order_status}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">{t('fields.paymentStatus')}</p>
              <Badge
                variant={getPaymentStatusBadgeVariant(payment_status)}
                className="text-umbra-100 rounded-full bg-red-100 px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize"
              >
                {payment_status}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 items-center justify-between gap-4 xl:grid-cols-3">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">{t('fields.orderType')}</p>
              <p className="text-sm font-semibold capitalize">{type}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">{t('fields.paymentMethod')}</p>
              <p className="text-sm font-semibold capitalize">{getPaymentMethodName(payment_type)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">{t('fields.totalAmount')}</p>
              <p className="text-sm font-bold text-green-600">{formatPrice(total)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {t('orderItems')} ({allProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Regular Products */}
            {products.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{t('fields.regularProducts')}</h3>
                  <Badge
                    variant="default"
                    className="text-umbra-100 rounded-full bg-green-100 px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize"
                  >
                    {t('fields.regular')}
                  </Badge>
                </div>
                {products.map((item, index) => (
                  <div
                    key={item._id || `regular-${index}`}
                    className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50/30 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          item.product?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/public${item.product.image}`
                            : '/assets/images/cart-item.jpg'
                        }
                        alt={item.product?.name || item.name || `Product ${index + 1}`}
                        width={96}
                        height={96}
                        className="h-[100px] w-[80px] rounded object-cover xl:h-auto xl:w-auto"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.product?.name || item.name || `Product ${index + 1}`}
                        </h4>
                        <div className="mt-1 flex items-center gap-4 text-sm text-gray-600">
                          <span className="rounded-full bg-green-100 px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal text-green-600 capitalize">
                            {t('fields.quantity')}: {item.quantity}
                          </span>
                          <span className="rounded-full bg-red-100 px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal text-red-600 capitalize">
                            {t('fields.sku')}: {item.product?.sku || 'N/A'}
                          </span>
                          <span className="rounded-full bg-green-100 px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal text-green-600 capitalize">
                            {'Remarks'}: {item.product?.remarks || item?.remarks || 'N/A'}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant="default"
                            className="text-umbra-100 rounded-full bg-green-100 px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize"
                          >
                            {t('fields.regular')}
                          </Badge>
                          <Badge
                            variant="default"
                            className="bg-umbra-5 text-umbra-100 rounded-full px-2 py-1 font-sans text-[12px] leading-[120%] font-normal"
                          >
                            {(() => {
                              try {
                                const parsed = JSON.parse(item?.product?.attribute);
                                const volume = parsed?.volume || 'N/A';
                                return volume === 'N/A' ? 'N/A' : `${volume}`;
                              } catch (error) {
                                // console.warn('Failed to parse attribute JSON:', item?.attribute);
                                return 'N/A';
                              }
                            })()}
                          </Badge>
                          <Badge
                            variant="default"
                            className="bg-classic/20 text-umbra-100 rounded-full px-2 py-1 font-sans text-[12px] leading-[120%] font-normal"
                          >
                            {(() => {
                              try {
                                const parsed = JSON.parse(item?.product?.attribute);
                                const flavor = parsed?.flavor || 'N/A';
                                return flavor === 'N/A' ? 'N/A' : flavor;
                              } catch (error) {
                                // console.warn('Failed to parse attribute JSON:', item?.attribute);
                                return 'N/A';
                              }
                            })()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-700">{formatPrice(item.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Wholesale Products */}
            {ws_products.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{t('fields.wholesaleProducts')}</h3>
                  <Badge
                    variant="default"
                    className="text-umbra-100 rounded-full bg-red-100 px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize"
                  >
                    {t('fields.wholesale')}
                  </Badge>
                </div>
                {ws_products.map((item, index) => (
                  <div
                    key={item._id || `wholesale-${index}`}
                    className="flex items-center justify-between rounded-lg border border-red-100 bg-red-50/30 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={
                          item.product?.image
                            ? `${process.env.NEXT_PUBLIC_API_URL}/public${item.product.image}`
                            : '/assets/images/cart-item.jpg'
                        }
                        alt={item.product?.name || item.name || `Product ${index + 1}`}
                        width={96}
                        height={96}
                        className="h-[100px] w-[80px] rounded object-cover xl:h-auto xl:w-auto"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {item.product?.name || item.name || `Product ${index + 1}`}
                        </h4>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                          <span className="rounded-full bg-red-100 px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal text-red-600 capitalize">
                            {t('fields.quantity')}: {item.quantity}
                          </span>
                          <span className="rounded-full bg-red-100 px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal text-red-600 capitalize">
                            {t('fields.sku')}: {item.product?.sku || 'N/A'}
                          </span>
                          <span className="rounded-full bg-red-100 px-2 py-1 text-center font-sans text-[12px] leading-[120%] font-normal text-red-600 capitalize">
                            {'Remarks'}: {item.product?.remarks || item?.remarks || 'N/A'}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <Badge
                            variant="default"
                            className="text-umbra-100 rounded-full bg-red-100 px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize"
                          >
                            {t('fields.wholesale')}
                          </Badge>
                          <Badge
                            variant="default"
                            className="bg-umbra-5 text-umbra-100 rounded-full px-2 py-1 font-sans text-[12px] leading-[120%] font-normal capitalize"
                          >
                            {item?.selectedVolume || item?.volume} ml
                          </Badge>
                          <Badge
                            variant="default"
                            className="bg-classic/20 text-umbra-100 rounded-full px-2 py-1 font-sans text-[12px] leading-[120%] font-normal"
                          >
                            {(() => {
                              try {
                                const parsed = JSON.parse(item?.attribute);
                                const flavor = parsed?.flavor || 'N/A';
                                return flavor === 'N/A' ? 'N/A' : flavor;
                              } catch (error) {
                                console.warn('Failed to parse attribute JSON:', item?.attribute);
                                return 'N/A';
                              }
                            })()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-700">{formatPrice(item.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Total Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            {t('orderSummary')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('fields.subtotal')}</span>
              <span>{formatPrice(sub_total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('fields.shipping')}</span>
              <span>{formatPrice(shipping_amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('fields.tax')}</span>
              <span>{formatPrice(tax_amount)}</span>
            </div>
            {discount_amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>{t('fields.discount')}</span>
                <span>-{formatPrice(discount_amount)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>{t('fields.total')}</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Shipping & Billing Addresses */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              {t('shippingAddress')}
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
              {t('billingAddress')}
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
          className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3 text-center font-sans text-[16px] leading-[120%] font-normal text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        >
          {t('continueShoppingButton')}
        </Link>
        <Link
          href="/account/orders"
          className="inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-center font-sans text-[16px] leading-[120%] font-normal text-white transition-colors hover:bg-gray-800"
        >
          {t('viewAllOrdersButton')}
        </Link>
      </div>

      {/* Additional Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2 text-center">
            <h3 className="font-semibold text-gray-900">{t('whatsNext')}</h3>
            <p className="text-sm text-gray-600">{t('whatsNextDescription')}</p>
            <p className="text-sm text-gray-600">{t('supportMessage')}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmationContent;
