'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Link } from '@/i18n/navigation';
import { CheckCircle, CreditCard, Hash, Package, User, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Confetti from 'react-confetti';

const GuestOrderConfirmationModal = ({ isOpen, onClose, orderData, guestEmail }) => {
  const t = useTranslations('CheckoutPage.GuestOrderConfirmation');
  const [showConfetti, setShowConfetti] = useState(true);
  const emailSentForOrdersRef = useRef(new Set());
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  // Handle window resize for confetti
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show confetti for 5 seconds
  useEffect(() => {
    if (isOpen && orderData) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, orderData]);

  // Send guest account invitation email when modal opens
  useEffect(() => {
    if (isOpen && orderData && orderData.code && orderData.billing_details?.email) {
      const orderCode = orderData.code;
      const hasEmailBeenSent = emailSentForOrdersRef.current.has(orderCode);

      if (!hasEmailBeenSent) {
        const sendGuestAccountInvitationEmail = async () => {
          try {
            const response = await fetch('/api/emails/guest/account-invitation', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderData,
              }),
            });

            if (response.ok) {
              emailSentForOrdersRef.current.add(orderCode);
              console.log('Guest account invitation email sent successfully for order:', orderCode);
            } else {
              console.error('Failed to send guest account invitation email:', await response.json());
            }
          } catch (error) {
            console.error('Error sending guest account invitation email:', error);
            // Don't block the UI if email fails
          }
        };

        sendGuestAccountInvitationEmail();
      }
    }
  }, [isOpen, orderData]);

  if (!orderData) return null;

  const {
    _id,
    code,
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

  const getPaymentMethodName = (paymentType) => {
    return t(`paymentMethods.${paymentType}`) || paymentType;
  };

  const allProducts = [...products, ...ws_products];

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && isOpen && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          initialVelocityY={15}
          colors={['#f43f5e', '#10b981', '#3b82f6', '#f59e0b', '#8b5cf6']}
        />
      )}

      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
          <DialogHeader className="relative">
            <button
              onClick={onClose}
              className="ring-offset-background focus:ring-ring absolute top-0 right-0 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
            <DialogTitle className="text-center">
              <div className="flex flex-col items-center space-y-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
                <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
                <p className="text-lg text-gray-600">{t('thankYou')}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Guest User Info */}
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-center gap-2 text-center text-blue-800">
                  <User className="h-4 w-4" />
                  {t('guestOrderTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <p className="text-sm text-blue-700">
                    <strong>{t('orderConfirmationSent')}</strong> {guestEmail}
                  </p>
                </div>
                <div className="rounded-lg border border-blue-300 bg-blue-100 p-3">
                  <h4 className="mb-2 font-semibold text-blue-800">{t('importantTitle')}</h4>
                  <ul className="space-y-1 text-xs text-blue-700">
                    <li>• {t('orderConfirmationEmail')}</li>
                    <li>• {t('orderNumber', { orderCode: code })}</li>
                    <li>• {t('contactSupport')}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-center gap-2 text-center">
                  <Hash className="h-4 w-4" />
                  {t('orderDetailsTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="font-medium text-gray-500">{t('orderNumberLabel')}</p>
                    <p className="font-semibold">{code}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-500">{t('orderDateLabel')}</p>
                    <p className="font-semibold">{formatDate(created_at)}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-500">{t('paymentMethodLabel')}</p>
                    <p className="font-semibold">{getPaymentMethodName(payment_type)}</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-500">{t('totalAmountLabel')}</p>
                    <p className="font-bold text-green-600">{formatPrice(total)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Products Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  {t('orderItemsTitle', { count: allProducts.length })}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-32 space-y-2 overflow-y-auto">
                  {allProducts.map((item, index) => (
                    <div
                      key={item._id || `item-${index}`}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-2 text-sm"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {item.product?.name || item.name || `Product ${index + 1}`}
                        </p>
                        <p className="text-xs text-gray-600">{t('quantityLabel', { quantity: item.quantity })}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatPrice(item.total)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Total */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  {t('orderSummaryTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('subtotalLabel')}</span>
                    <span>{formatPrice(sub_total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('shippingLabel')}</span>
                    <span>{formatPrice(shipping_amount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t('taxLabel')}</span>
                    <span>{formatPrice(tax_amount)}</span>
                  </div>
                  {discount_amount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>{t('discountLabel')}</span>
                      <span>-{formatPrice(discount_amount)}</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-base font-bold">
                    <span>{t('totalLabel')}</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-center text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
              >
                {t('continueShoppingButton')}
              </Link>
              <Link
                href={`/login?email=${encodeURIComponent(guestEmail || orderData?.billing_details?.email || '')}&tab=register`}
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-lg bg-black px-4 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                {t('createAccountButton')}
              </Link>
            </div>

            {/* Additional Info */}
            <div className="rounded-lg bg-gray-50 p-4 text-center">
              <h3 className="mb-2 font-semibold text-gray-900">{t('whatsNextTitle')}</h3>
              <p className="mb-1 text-sm text-gray-600">{t('whatsNextDescription')}</p>
              <p className="text-xs text-gray-500">{t('supportContact', { orderCode: code })}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GuestOrderConfirmationModal;
