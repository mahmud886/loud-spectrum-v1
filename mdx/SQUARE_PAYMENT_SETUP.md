# Square Payment Integration Setup

This document explains how to configure and use the Square payment integration that has been implemented in your checkout flow.

## Overview

The Square payment integration has been implemented using the `react-square-web-payments-sdk` package, which provides a secure way to collect card information and process payments through Square's platform.

## Required Environment Variables

Add the following environment variables to your `.env.local` file:

```bash
# Square Payment Configuration
# Frontend (Public) - These will be available in the browser
NEXT_PUBLIC_SQUARE_APPLICATION_ID=sandbox-sq0idb-TC3lplz4p21u-SzCfAwpmA
NEXT_PUBLIC_SQUARE_LOCATION_ID=9PKBD3JCQFH0D

# Backend (Private) - These will only be available on the server
SQUARE_ACCESS_TOKEN=your-square-access-token-here
SQUARE_ENVIRONMENT=sandbox

# API Configuration (if not already set)
API_URL=your-backend-api-url-here
NEXT_PUBLIC_API_URL=your-backend-api-url-here
```

### Getting Square Credentials

1. **Sandbox Mode (Testing):**

   - Application ID: `sandbox-sq0idb-TC3lplz4p21u-SzCfAwpmA`
   - Location ID: `9PKBD3JCQFH0D`
   - Access Token: Get from Square Developer Dashboard sandbox

2. **Production Mode:**
   - Sign up at [Square Developer Portal](https://developer.squareup.com/)
   - Create an application
   - Get your production Application ID, Location ID, and Access Token
   - Update environment variables accordingly

## Implementation Details

### Frontend Changes

#### 1. DebitAndCreditCardDialog.jsx

- **Before:** Custom form fields for card information
- **After:** Square's PaymentForm with CreditCard component
- **Features:**
  - Automatic card validation
  - PCI-compliant card handling
  - Integration with billing address from Redux
  - Real-time amount display
  - 3D Secure verification support

#### 2. CheckoutPage.jsx

- Removed manual card form validation (Square handles this)
- Updated `handleCardSubmit` to work with Square tokens
- Streamlined prop passing to dialog component

### Backend Integration

The existing Square API route (`app/api/payment/square/route.js`) processes the payment:

1. Receives the Square token from the frontend
2. Creates a payment using Square's API
3. Sends order details to your backend API
4. Returns success/failure response

### Payment Flow

1. **User selects card payment:** Dialog opens with Square payment form
2. **User enters card details:** Square validates in real-time
3. **User submits:** Square creates a secure token
4. **Token processing:** Sent to your API for payment processing
5. **Payment completion:** Order created and user redirected to confirmation

## Key Features

### Security

- PCI-compliant card handling
- No sensitive card data touches your servers
- 3D Secure verification for eligible cards
- Secure tokenization

### User Experience

- Real-time validation
- Responsive design
- Error handling with user-friendly messages
- Progress indicators during payment processing

### Integration

- Seamless integration with existing Redux state
- Automatic billing address detection
- Order amount calculation from cart
- Proper error handling and user feedback

## Testing

### Test Card Numbers

Use these test card numbers in sandbox mode:

```
Visa: 4111 1111 1111 1111
Mastercard: 5555 5555 5555 4444
American Express: 378282246310005
Discover: 6011000990139424

CVV: Any 3-4 digit number
Expiry: Any future date
```

### Testing Scenarios

1. **Successful Payment:** Use valid test card numbers
2. **Failed Payment:** Use card number `4000 0000 0000 0002`
3. **Declined Payment:** Use card number `4000 0000 0000 0069`
4. **3D Secure:** Some test cards trigger 3D Secure flow

## Troubleshooting

### Common Issues

1. **Environment Variables Not Found:**

   - Ensure all required environment variables are set
   - Restart your development server after adding variables

2. **Square SDK Errors:**

   - Check browser console for detailed error messages
   - Verify Application ID and Location ID are correct

3. **Payment Processing Fails:**
   - Check network requests in browser dev tools
   - Verify backend API is accessible
   - Check server logs for detailed error information

### Debug Mode

Add this to your environment variables for additional logging:

```bash
NEXT_PUBLIC_SQUARE_DEBUG=true
```

## Production Deployment

### Checklist

- [ ] Update environment variables with production Square credentials
- [ ] Change `SQUARE_ENVIRONMENT` from `sandbox` to `production`
- [ ] Test with real card numbers (small amounts)
- [ ] Implement webhook handling for payment notifications
- [ ] Add proper error monitoring
- [ ] Configure HTTPS (required for production)

### Security Considerations

1. **Never expose:** Access tokens in frontend code
2. **Always use HTTPS:** Required for production payments
3. **Validate server-side:** Don't trust frontend-only validation
4. **Monitor transactions:** Set up alerts for failed payments
5. **Handle webhooks:** Implement Square webhooks for payment status updates

## Support

- [Square Developer Documentation](https://developer.squareup.com/docs)
- [React Square Web Payments SDK](https://github.com/squareup/web-payments-sdk)
- [Square API Reference](https://developer.squareup.com/reference/square)

## Next Steps

1. Set up Square webhook endpoints for payment status updates
2. Implement refund functionality if needed
3. Add saved payment methods for returning customers
4. Consider implementing Apple Pay and Google Pay through Square
5. Set up proper monitoring and alerting for payment issues
