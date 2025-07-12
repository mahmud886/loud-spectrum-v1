# Email System Usage Guide

This guide shows how to use the Email system with React Email and Resend, including Order Confirmation and Order Failure emails.

## Setup

### Environment Variables

Add these to your `.env.local` file:

```env
RESEND_API_KEY=your_resend_api_key_here
RESEND_FROM_EMAIL=orders@yourdomain.com
```

### Dependencies

The following packages are already installed:

- `@react-email/components`
- `react-email`
- `resend`

## API Route Usage

### Sending an Order Confirmation Email

**POST** `/api/emails/order/confirmation`

```javascript
// Example: Send order confirmation email
const sendOrderConfirmationEmail = async (orderData, customerEmail) => {
  try {
    const response = await fetch('/api/emails/order/confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData: orderData,
        recipientEmail: customerEmail,
        recipientName: orderData.customer_name, // Optional
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
```

### Preview Email Template

**GET** `/api/emails/order/confirmation`

Visit this endpoint in your browser to preview the email template with sample data.

### Sending an Order Failure Email

**POST** `/api/emails/order/failed`

```javascript
// Example: Send order failure email
const sendOrderFailureEmail = async (orderData, customerEmail, rejectionReason) => {
  try {
    const response = await fetch('/api/emails/order/failed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData: orderData,
        recipientEmail: customerEmail,
        recipientName: orderData.customer_name, // Optional
        rejectionReason: rejectionReason, // Optional - reason for failure
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Order failure email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send order failure email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending order failure email:', error);
    throw error;
  }
};
```

### Preview Order Failure Email Template

**GET** `/api/emails/order/failed`

Visit this endpoint in your browser to preview the order failure email template with sample data.

### Sending an Order Rejection Email

**POST** `/api/emails/order/rejection`

```javascript
// Example: Send order rejection email
const sendOrderRejectionEmail = async (orderData, customerEmail, rejectionReason) => {
  try {
    const response = await fetch('/api/emails/order/rejection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData: orderData,
        recipientEmail: customerEmail,
        recipientName: orderData.customer_name, // Optional
        rejectionReason: rejectionReason, // Optional - reason for rejection
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Order rejection email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send order rejection email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending order rejection email:', error);
    throw error;
  }
};
```

### Preview Order Rejection Email Template

**GET** `/api/emails/order/rejection`

Visit this endpoint in your browser to preview the order rejection email template with sample data.

### Sending a Payment Confirmation Email

**POST** `/api/emails/payment/confirmation`

```javascript
// Example: Send payment confirmation email
const sendPaymentConfirmationEmail = async (orderData, paymentData, customerEmail) => {
  try {
    const response = await fetch('/api/emails/payment/confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData: orderData,
        paymentData: paymentData,
        recipientEmail: customerEmail,
        recipientName: orderData.customer_name, // Optional
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Payment confirmation email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send payment confirmation email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    throw error;
  }
};
```

### Preview Payment Confirmation Email Template

**GET** `/api/emails/payment/confirmation`

Visit this endpoint in your browser to preview the payment confirmation email template with sample data.

### Sending a Payment Rejection Email

**POST** `/api/emails/payment/rejection`

```javascript
// Example: Send payment rejection email
const sendPaymentRejectionEmail = async (orderData, paymentData, customerEmail, rejectionReason) => {
  try {
    const response = await fetch('/api/emails/payment/rejection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderData: orderData,
        paymentData: paymentData,
        recipientEmail: customerEmail,
        recipientName: orderData.customer_name, // Optional
        rejectionReason: rejectionReason, // Optional - reason for rejection
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Payment rejection email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send payment rejection email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending payment rejection email:', error);
    throw error;
  }
};
```

### Preview Payment Rejection Email Template

**GET** `/api/emails/payment/rejection`

Visit this endpoint in your browser to preview the payment rejection email template with sample data.

## Wholesale Registration Emails

### Sending a Wholesale Registration Approval Email

**POST** `/api/emails/wholesale-registration/approve`

```javascript
// Example: Send wholesale registration approval email
const sendWholesaleRegistrationApprovalEmail = async (registrationData, customerEmail) => {
  try {
    const response = await fetch('/api/emails/wholesale-registration/approve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationData: registrationData,
        recipient: customerEmail,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Wholesale registration approval email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send wholesale registration approval email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending wholesale registration approval email:', error);
    throw error;
  }
};
```

### Preview Wholesale Registration Approval Email Template

**GET** `/api/emails/wholesale-registration/approve?preview=true`

Visit this endpoint in your browser to preview the wholesale registration approval email template with sample data.

### Sending a Wholesale Registration Rejection Email

**POST** `/api/emails/wholesale-registration/rejection`

```javascript
// Example: Send wholesale registration rejection email
const sendWholesaleRegistrationRejectionEmail = async (registrationData, customerEmail) => {
  try {
    const response = await fetch('/api/emails/wholesale-registration/rejection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationData: registrationData,
        recipient: customerEmail,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Wholesale registration rejection email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send wholesale registration rejection email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending wholesale registration rejection email:', error);
    throw error;
  }
};
```

### Preview Wholesale Registration Rejection Email Template

**GET** `/api/emails/wholesale-registration/rejection?preview=true`

Visit this endpoint in your browser to preview the wholesale registration rejection email template with sample data.

### Sending a Wholesale Registration Under Review Email

**POST** `/api/emails/wholesale-registration/review`

```javascript
// Example: Send wholesale registration under review email
const sendWholesaleRegistrationUnderReviewEmail = async (registrationData, customerEmail) => {
  try {
    const response = await fetch('/api/emails/wholesale-registration/review', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationData: registrationData,
        recipient: customerEmail,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Wholesale registration under review email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send wholesale registration under review email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending wholesale registration under review email:', error);
    throw error;
  }
};
```

### Preview Wholesale Registration Under Review Email Template

**GET** `/api/emails/wholesale-registration/review?preview=true`

Visit this endpoint in your browser to preview the wholesale registration under review email template with sample data.

### Sending a Wholesale Registration Welcome Email

**POST** `/api/emails/wholesale-registration/welcome`

```javascript
// Example: Send wholesale registration welcome email
const sendWholesaleRegistrationWelcomeEmail = async (registrationData, customerEmail) => {
  try {
    const response = await fetch('/api/emails/wholesale-registration/welcome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registrationData: registrationData,
        recipient: customerEmail,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      console.log('Wholesale registration welcome email sent successfully:', result);
      return result;
    } else {
      console.error('Failed to send wholesale registration welcome email:', result);
      throw new Error(result.error);
    }
  } catch (error) {
    console.error('Error sending wholesale registration welcome email:', error);
    throw error;
  }
};
```

### Preview Wholesale Registration Welcome Email Template

**GET** `/api/emails/wholesale-registration/welcome?preview=true`

Visit this endpoint in your browser to preview the wholesale registration welcome email template with sample data.

## Email Types

### Order Confirmation Email

- **Use when**: Order is successfully created and payment is confirmed
- **Purpose**: Confirm order details and provide tracking information
- **Styling**: Green theme for success
- **Actions**: View orders, continue shopping

### Order Failure Email

- **Use when**: Order processing fails due to technical issues
- **Purpose**: Inform customer about technical failures (payment processing, system errors)
- **Styling**: Red/Orange theme for warnings
- **Actions**: Try again, contact support

### Order Rejection Email

- **Use when**: Order is rejected due to business rules or policies
- **Purpose**: Inform customer about policy violations, fraud detection, or security concerns
- **Styling**: Purple theme for serious issues
- **Actions**: Contact support, browse products

### Payment Confirmation Email

- **Use when**: Payment is successfully processed
- **Purpose**: Provide payment receipt and transaction details
- **Styling**: Blue/Teal theme for trust and security
- **Actions**: View order details, continue shopping

### Payment Rejection Email

- **Use when**: Payment is declined or fails to process
- **Purpose**: Inform customer about payment issues and provide retry options
- **Styling**: Red/Pink theme for urgent action needed
- **Actions**: Try different payment method, contact support

### Wholesale Registration Approval Email

- **Use when**: Wholesale registration application is approved
- **Purpose**: Welcome new wholesale partners and provide next steps
- **Styling**: Green theme for success and approval
- **Actions**: Access wholesale portal, manage account

### Wholesale Registration Rejection Email

- **Use when**: Wholesale registration application is rejected
- **Purpose**: Inform applicant about rejection with reasons and reapplication guidance
- **Styling**: Red theme for rejection with helpful information
- **Actions**: Shop retail products, contact support

### Wholesale Registration Under Review Email

- **Use when**: Wholesale registration is being reviewed
- **Purpose**: Inform applicant about review process and timeline
- **Styling**: Blue theme for informational status updates
- **Actions**: Browse products, contact support

### Wholesale Registration Welcome Email

- **Use when**: Welcoming new wholesale partners after setup
- **Purpose**: Comprehensive onboarding and partnership benefits
- **Styling**: Purple theme for special partnership welcome
- **Actions**: Access wholesale portal, manage account

## Email Template Features

### Mobile Responsive Design

- **Mobile**: 375px - 450px width
- **Desktop**: Max 650px width
- Responsive layout that stacks elements on mobile
- Optimized button sizes for mobile interaction

### Supported Order Data Structure

```javascript
const orderData = {
  _id: 'order_id',
  code: 'ORD-12345',
  customer_name: 'John Doe',
  products: [
    {
      _id: 'product_id',
      product: {
        name: 'Product Name',
        sku: 'SKU-001',
      },
      quantity: 2,
      selectedVolume: 10,
      attribute: JSON.stringify({ flavor: 'Citrus' }),
      total: 29.99,
    },
  ],
  ws_products: [
    {
      _id: 'wholesale_product_id',
      product: {
        name: 'Wholesale Product',
        sku: 'WS-001',
      },
      quantity: 1,
      selectedVolume: 50,
      attribute: JSON.stringify({ flavor: 'Mixed' }),
      total: 99.99,
    },
  ],
  sub_total: 129.98,
  tax_amount: 10.4,
  shipping_amount: 15.0,
  discount_amount: 5.0,
  total: 150.38,
  payment_type: 'CARD', // "COD", "CARD", "ACH/WT"
  payment_status: 'paid', // "paid", "unpaid", "pending"
  order_status: 'processing', // "processing", "shipped", "delivered", "cancelled"
  type: 'regular', // "regular", "wholesale"
  shipping_details: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    street_address: '123 Main St',
    city: 'New York',
    province: 'NY',
    post_code: '10001',
    country: 'United States',
  },
  billing_details: {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    street_address: '123 Main St',
    city: 'New York',
    province: 'NY',
    post_code: '10001',
    country: 'United States',
  },
  created_at: '2024-01-15T10:30:00Z',
};
```

### Supported Payment Data Structure

```javascript
const paymentData = {
  transaction_id: 'txn_1234567890abcdef', // Transaction ID from payment processor
  payment_method: 'Credit Card', // Payment method used
  payment_amount: 150.38, // Amount actually charged
  payment_date: '2024-01-15T10:30:00Z', // Payment processing date
  last_four_digits: '4242', // Last 4 digits of card
  card_brand: 'Visa', // Card brand (Visa, MasterCard, etc.)
  processing_fee: 4.36, // Processing fee charged (optional)
  net_amount: 146.02, // Net amount after fees (optional)
  decline_reason: 'Insufficient funds', // Reason for decline (for rejections)
  error_code: 'CARD_DECLINED', // Error code (for rejections)
};
```

### Supported Wholesale Registration Data Structure

```javascript
const registrationData = {
  _id: 'registration_id', // Unique registration ID
  company_name: 'Company Name', // Business name
  contact_name: 'John Doe', // Primary contact person
  email: 'contact@company.com', // Primary email
  phone: '+1 (555) 123-4567', // Contact phone
  business_type: 'dispensary', // Business type (dispensary, distributor, retail, etc.)
  tax_id: '12-3456789', // Tax ID/EIN
  website: 'https://company.com', // Company website (optional)
  address: '123 Business St', // Business address
  city: 'City', // City
  state: 'State', // State/Province
  zip_code: '12345', // ZIP/Postal code
  country: 'United States', // Country
  annual_revenue: '$1,000,000 - $5,000,000', // Annual revenue range
  years_in_business: '5', // Years in business
  primary_products: 'Flower, Concentrates, Edibles', // Primary products
  target_market: 'Adult-use recreational customers', // Target market
  distribution_channels: 'Retail dispensary, Online delivery', // Distribution channels
  additional_info: 'Additional information about the business', // Additional notes
  status: 'approved', // Status (pending, under_review, approved, rejected, active)
  created_at: '2024-01-15T10:00:00Z', // Application creation date
  approved_at: '2024-01-22T14:30:00Z', // Approval date (for approved applications)
  rejected_at: '2024-01-22T14:30:00Z', // Rejection date (for rejected applications)
  review_started_at: '2024-01-16T09:00:00Z', // Review start date (for under review)
  account_id: 'WS-2024-001', // Wholesale account ID (for approved partners)
  reviewer_name: 'Jane Smith', // Name of reviewer (optional)
  rejection_reason: 'Minimum years requirement not met', // Rejection reason (for rejections)
  rejection_notes: 'Additional notes about rejection', // Additional rejection notes
  estimated_completion_date: '2024-01-25T17:00:00Z', // Estimated review completion (for under review)
  required_documents: ['Business license', 'Tax ID verification'], // Required documents (for under review)
  priority_level: 'Standard', // Priority level (Standard, High, etc.)
  account_manager: 'Robert Kim', // Assigned account manager (for approved/welcome)
  welcome_package_sent: true, // Whether welcome package was sent (for welcome)
  training_scheduled: true, // Whether training is scheduled (for welcome)
  first_order_discount: 15, // First order discount percentage (for welcome)
  territory_assigned: 'Pacific Northwest', // Assigned territory (for welcome)
};
```

## Integration Examples

### With Order Creation

```javascript
// After successful order creation
const createOrder = async (orderData) => {
  try {
    // Create order in database
    const order = await createOrderInDatabase(orderData);

    // Send confirmation email
    await sendOrderConfirmationEmail(order, order.customer_email);

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};
```

### With Payment Success

```javascript
// After successful payment
const handlePaymentSuccess = async (paymentData, orderData) => {
  try {
    // Update order status
    const updatedOrder = await updateOrderStatus(orderData._id, 'paid');

    // Send confirmation email
    await sendOrderConfirmationEmail(updatedOrder, orderData.customer_email);

    return updatedOrder;
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
};
```

### With Payment Failure

```javascript
// After payment failure
const handlePaymentFailure = async (paymentData, orderData, errorMessage) => {
  try {
    // Update order status to failed
    const failedOrder = await updateOrderStatus(orderData._id, 'failed');

    // Send failure email with reason
    await sendOrderFailureEmail(
      failedOrder,
      orderData.customer_email,
      errorMessage || 'Payment could not be processed. Please try again.',
    );

    return failedOrder;
  } catch (error) {
    console.error('Error handling payment failure:', error);
    throw error;
  }
};
```

### With Order Validation Failure

```javascript
// When order validation fails
const validateAndProcessOrder = async (orderData) => {
  try {
    // Validate order
    const validationResult = await validateOrder(orderData);

    if (!validationResult.valid) {
      // Send failure email
      await sendOrderFailureEmail(
        orderData,
        orderData.customer_email,
        validationResult.reason || 'Order validation failed.',
      );

      throw new Error('Order validation failed');
    }

    // Process order normally
    return await processOrder(orderData);
  } catch (error) {
    console.error('Error validating order:', error);
    throw error;
  }
};
```

### With Stock Availability Issues

```javascript
// When products are out of stock
const checkStockAndProcess = async (orderData) => {
  try {
    // Check stock availability
    const stockCheck = await checkProductStock(orderData.products);

    if (!stockCheck.available) {
      // Send failure email
      await sendOrderFailureEmail(
        orderData,
        orderData.customer_email,
        `Some items in your order are no longer available: ${stockCheck.unavailableItems.join(', ')}`,
      );

      return { success: false, reason: 'Stock unavailable' };
    }

    // Process order normally
    return await processOrder(orderData);
  } catch (error) {
    console.error('Error checking stock:', error);
    throw error;
  }
};
```

### With Fraud Detection

```javascript
// When fraud is detected
const fraudCheckAndProcess = async (orderData) => {
  try {
    // Run fraud detection
    const fraudCheck = await detectFraud(orderData);

    if (fraudCheck.isFraudulent) {
      // Send rejection email
      await sendOrderRejectionEmail(
        orderData,
        orderData.customer_email,
        'Order rejected due to security concerns. Please contact support if you believe this is an error.',
      );

      return { success: false, reason: 'Fraud detected' };
    }

    // Process order normally
    return await processOrder(orderData);
  } catch (error) {
    console.error('Error during fraud check:', error);
    throw error;
  }
};
```

### With Address Verification Issues

```javascript
// When address verification fails
const verifyAddressAndProcess = async (orderData) => {
  try {
    // Verify shipping address
    const addressVerification = await verifyAddress(orderData.shipping_details);

    if (!addressVerification.valid) {
      // Send rejection email
      await sendOrderRejectionEmail(
        orderData,
        orderData.customer_email,
        'Order rejected due to invalid shipping address. Please verify your address and try again.',
      );

      return { success: false, reason: 'Invalid address' };
    }

    // Process order normally
    return await processOrder(orderData);
  } catch (error) {
    console.error('Error verifying address:', error);
    throw error;
  }
};
```

### With Policy Violations

```javascript
// When order violates policies
const policyCheckAndProcess = async (orderData) => {
  try {
    // Check order against policies
    const policyCheck = await checkOrderPolicies(orderData);

    if (!policyCheck.compliant) {
      // Send rejection email
      await sendOrderRejectionEmail(
        orderData,
        orderData.customer_email,
        `Order rejected due to policy violations: ${policyCheck.violations.join(', ')}`,
      );

      return { success: false, reason: 'Policy violation' };
    }

    // Process order normally
    return await processOrder(orderData);
  } catch (error) {
    console.error('Error checking policies:', error);
    throw error;
  }
};
```

### With Payment Processing

```javascript
// After successful payment processing
const handlePaymentSuccess = async (orderData, paymentData) => {
  try {
    // Update order status to paid
    const updatedOrder = await updateOrderStatus(orderData._id, 'paid');

    // Send payment confirmation email
    await sendPaymentConfirmationEmail(updatedOrder, paymentData, orderData.customer_email);

    return updatedOrder;
  } catch (error) {
    console.error('Error handling payment success:', error);
    throw error;
  }
};
```

### With Payment Decline

```javascript
// When payment is declined
const handlePaymentDecline = async (orderData, paymentData) => {
  try {
    // Update order status to pending payment
    const updatedOrder = await updateOrderStatus(orderData._id, 'pending_payment');

    // Send payment rejection email
    await sendPaymentRejectionEmail(
      updatedOrder,
      paymentData,
      orderData.customer_email,
      paymentData.decline_reason || 'Payment was declined by your bank',
    );

    return updatedOrder;
  } catch (error) {
    console.error('Error handling payment decline:', error);
    throw error;
  }
};
```

### With Card Verification Issues

```javascript
// When card verification fails
const handleCardVerificationFailure = async (orderData, paymentData) => {
  try {
    // Send payment rejection email
    await sendPaymentRejectionEmail(
      orderData,
      paymentData,
      orderData.customer_email,
      'Card verification failed. Please check your card details and try again.',
    );

    return { success: false, reason: 'Card verification failed' };
  } catch (error) {
    console.error('Error handling card verification failure:', error);
    throw error;
  }
};
```

### With Wholesale Registration Workflow

```javascript
// When wholesale registration is submitted
const handleWholesaleRegistrationSubmission = async (registrationData) => {
  try {
    // Save registration to database
    const registration = await saveRegistrationToDatabase(registrationData);

    // Send under review email
    await sendWholesaleRegistrationUnderReviewEmail(registration, registration.email);

    return registration;
  } catch (error) {
    console.error('Error handling wholesale registration submission:', error);
    throw error;
  }
};
```

### With Wholesale Registration Approval

```javascript
// When wholesale registration is approved
const handleWholesaleRegistrationApproval = async (registrationId, approverName) => {
  try {
    // Update registration status
    const updatedRegistration = await updateRegistrationStatus(registrationId, 'approved');

    // Create wholesale account
    const accountId = await createWholesaleAccount(updatedRegistration);

    // Update registration with account ID
    await updateRegistrationAccountId(registrationId, accountId);

    // Send approval email
    await sendWholesaleRegistrationApprovalEmail(
      { ...updatedRegistration, account_id: accountId },
      updatedRegistration.email,
    );

    return updatedRegistration;
  } catch (error) {
    console.error('Error handling wholesale registration approval:', error);
    throw error;
  }
};
```

### With Wholesale Registration Rejection

```javascript
// When wholesale registration is rejected
const handleWholesaleRegistrationRejection = async (registrationId, rejectionReason, rejectionNotes, reviewerName) => {
  try {
    // Update registration status with rejection details
    const updatedRegistration = await updateRegistrationStatus(registrationId, 'rejected', {
      rejection_reason: rejectionReason,
      rejection_notes: rejectionNotes,
      reviewer_name: reviewerName,
      rejected_at: new Date().toISOString(),
    });

    // Send rejection email
    await sendWholesaleRegistrationRejectionEmail(updatedRegistration, updatedRegistration.email);

    return updatedRegistration;
  } catch (error) {
    console.error('Error handling wholesale registration rejection:', error);
    throw error;
  }
};
```

### With Wholesale Partner Welcome

```javascript
// When welcoming a new wholesale partner
const handleWholesalePartnerWelcome = async (registrationId, accountManagerName, specialOffers) => {
  try {
    // Get registration details
    const registration = await getRegistrationById(registrationId);

    // Update registration with welcome details
    const updatedRegistration = await updateRegistrationForWelcome(registrationId, {
      account_manager: accountManagerName,
      welcome_package_sent: true,
      training_scheduled: true,
      first_order_discount: specialOffers.firstOrderDiscount,
      territory_assigned: specialOffers.territory,
    });

    // Send welcome email
    await sendWholesaleRegistrationWelcomeEmail(updatedRegistration, updatedRegistration.email);

    return updatedRegistration;
  } catch (error) {
    console.error('Error handling wholesale partner welcome:', error);
    throw error;
  }
};
```

### With Wholesale Registration Document Requirements

```javascript
// When additional documents are required during review
const handleWholesaleRegistrationDocumentRequest = async (registrationId, requiredDocuments) => {
  try {
    // Update registration with document requirements
    const updatedRegistration = await updateRegistrationDocumentRequirements(registrationId, {
      required_documents: requiredDocuments,
      status: 'under_review',
    });

    // Send under review email with document requirements
    await sendWholesaleRegistrationUnderReviewEmail(updatedRegistration, updatedRegistration.email);

    return updatedRegistration;
  } catch (error) {
    console.error('Error handling wholesale registration document request:', error);
    throw error;
  }
};
```

### Error Handling

```javascript
const sendEmailWithRetry = async (orderData, customerEmail, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await sendOrderConfirmationEmail(orderData, customerEmail);
      console.log(`Email sent successfully on attempt ${attempt}`);
      return;
    } catch (error) {
      console.error(`Email send attempt ${attempt} failed:`, error);

      if (attempt === maxRetries) {
        // Log to monitoring service or database
        console.error('Failed to send email after all retries');
        throw error;
      }

      // Wait before retry
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
};
```

## Customization

### Update Logo

Replace the logo URL in the email component:

```javascript
// In OrderConfirmationEmail.jsx
<Img src="https://your-domain.com/your-logo.png" alt="Your Company" style={logo} />
```

### Update Button URLs

Update the button URLs in the email component:

```javascript
// In OrderConfirmationEmail.jsx
<Button style={primaryButton} href="https://your-domain.com/account/orders">
  View All Orders
</Button>
<Button style={secondaryButton} href="https://your-domain.com/shop">
  Continue Shopping
</Button>
```

### Customize Email Styling

Modify the style objects in `OrderConfirmationEmail.jsx` to match your brand colors and typography.

## Testing

### Preview Emails

1. Start your development server
2. Navigate to the following URLs to preview each email template:
   - **Order Confirmation**: `http://localhost:3000/api/emails/order/confirmation`
   - **Order Failure**: `http://localhost:3000/api/emails/order/failed`
   - **Order Rejection**: `http://localhost:3000/api/emails/order/rejection`
   - **Payment Confirmation**: `http://localhost:3000/api/emails/payment/confirmation`
   - **Payment Rejection**: `http://localhost:3000/api/emails/payment/rejection`
   - **Wholesale Registration Approval**: `http://localhost:3000/api/emails/wholesale-registration/approve?preview=true`
   - **Wholesale Registration Rejection**: `http://localhost:3000/api/emails/wholesale-registration/rejection?preview=true`
   - **Wholesale Registration Under Review**: `http://localhost:3000/api/emails/wholesale-registration/review?preview=true`
   - **Wholesale Registration Welcome**: `http://localhost:3000/api/emails/wholesale-registration/welcome?preview=true`

### Test Email Sending

```javascript
// Test order confirmation email
const testOrderData = {
  code: 'TEST-001',
  customer_name: 'Test Customer',
  // ... other required fields
};

await sendOrderConfirmationEmail(testOrderData, 'test@example.com');

// Test order failure email
await sendOrderFailureEmail(testOrderData, 'test@example.com', 'Payment authorization failed');

// Test order rejection email
await sendOrderRejectionEmail(testOrderData, 'test@example.com', 'Order rejected due to security concerns');

// Test payment confirmation email
const testPaymentData = {
  transaction_id: 'txn_test123',
  payment_method: 'Credit Card',
  payment_amount: 150.38,
  last_four_digits: '4242',
  card_brand: 'Visa',
};

await sendPaymentConfirmationEmail(testOrderData, testPaymentData, 'test@example.com');

// Test payment rejection email
await sendPaymentRejectionEmail(testOrderData, testPaymentData, 'test@example.com', 'Payment declined by bank');

// Test wholesale registration emails
const testRegistrationData = {
  _id: 'test-registration-123',
  company_name: 'Test Company',
  contact_name: 'John Doe',
  email: 'test@example.com',
  phone: '+1 (555) 123-4567',
  business_type: 'dispensary',
  address: '123 Test Street',
  city: 'Test City',
  state: 'Test State',
  zip_code: '12345',
  country: 'United States',
  status: 'approved',
  created_at: new Date().toISOString(),
  // ... other required fields
};

// Test wholesale registration approval email
await sendWholesaleRegistrationApprovalEmail(testRegistrationData, 'test@example.com');

// Test wholesale registration rejection email
await sendWholesaleRegistrationRejectionEmail(
  {
    ...testRegistrationData,
    status: 'rejected',
    rejection_reason: 'Test rejection reason',
    rejection_notes: 'Test rejection notes',
  },
  'test@example.com',
);

// Test wholesale registration under review email
await sendWholesaleRegistrationUnderReviewEmail(
  {
    ...testRegistrationData,
    status: 'under_review',
    review_started_at: new Date().toISOString(),
    reviewer_name: 'Test Reviewer',
  },
  'test@example.com',
);

// Test wholesale registration welcome email
await sendWholesaleRegistrationWelcomeEmail(
  {
    ...testRegistrationData,
    status: 'active',
    account_id: 'WS-TEST-001',
    account_manager: 'Test Account Manager',
    welcome_package_sent: true,
    first_order_discount: 15,
  },
  'test@example.com',
);
```

## Email Client Compatibility

The email template is designed to work with:

- Gmail
- Outlook
- Apple Mail
- Yahoo Mail
- Mobile email clients

## Best Practices

1. **Always include fallback values** for optional fields
2. **Test across different email clients** before production
3. **Monitor email delivery rates** using Resend dashboard
4. **Handle errors gracefully** and implement retry logic
5. **Keep email content concise** but informative
6. **Use responsive design** for mobile compatibility

## Support

For issues with:

- **React Email**: Check the [React Email documentation](https://react.email)
- **Resend**: Check the [Resend documentation](https://resend.com/docs)
- **Email rendering**: Test in different email clients
