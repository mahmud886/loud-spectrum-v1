# 🛒 Checkout Flow Documentation

This document provides an overview of the checkout process in the Loud Spectrum v1 project, including its architecture, main components, API endpoints, state management, and tips for customization.

---

## 🚦 Overview

The checkout flow guides users from reviewing their cart to completing an order. It handles billing/shipping information, payment, order review, and confirmation. The process is designed for a seamless, secure, and user-friendly experience.

---

## 🗂️ Main Components & Files

- **`components/checkout/CheckoutPage.jsx`**
  The central component orchestrating the checkout process, rendering steps, handling form state, and integrating with Redux and APIs.

- **Step Components:**

  - `BillingAddress.jsx` – Collects billing address
  - `ShippingAddress.jsx` – (if present) Collects shipping address
  - `ChooseYourCourier.jsx` – Courier selection
  - `PaymentMethod.jsx` – Payment method selection
  - `OrderSummary.jsx` – Displays order details before confirmation
  - `OrderConfirmation.jsx` – Shows confirmation after successful checkout

- **Cart Components:**

  - `components/cart/CartDrawer.jsx` – Cart UI
  - `components/cart/CartItem.jsx` – Individual cart item

- **Redux Slices:**

  - `lib/store/slices/checkoutSlice.js` – Checkout state (addresses, payment, progress)
  - `lib/store/slices/cartSlice.js` – Cart state

- **API Endpoints:**
  - `app/api/payment/square/route.js` – Square payment processing
  - `app/api/payment/cash-on-delivery/route.js` – Cash on Delivery
  - `app/api/emails/order/confirmation/route.js` – Order confirmation email
  - `app/api/emails/order/failed/route.js` – Order failed email

---

## 🔄 Checkout Flow Steps

1. **Cart Review**
   - User reviews items in cart
   - Proceeds to checkout
2. **Address Entry**
   - Billing (and optionally shipping) address collected
   - Address validation (client-side and/or server-side)
3. **Courier Selection**
   - User selects preferred shipping/courier option
4. **Payment**
   - User selects payment method (e.g., Square, Cash on Delivery)
   - Payment details collected and processed
5. **Order Review**
   - User reviews all details before confirming
6. **Order Confirmation**
   - On success, confirmation page is shown
   - Confirmation email sent
   - On failure, error message and failed email sent

---

## 🗃️ State Management

- **Redux:**
  - `checkoutSlice` manages checkout progress, addresses, courier, payment, and errors.
  - `cartSlice` manages cart items and totals.
- **Local State:**
  - Used for form fields, step navigation, and UI feedback.

---

## 🔌 API Integration

- **Payment:**
  - Calls `/api/payment/square` or `/api/payment/cash-on-delivery` with order and payment details.
- **Order Confirmation:**
  - On success, triggers `/api/emails/order/confirmation` to send confirmation email.
- **Error Handling:**
  - On payment or order failure, triggers `/api/emails/order/failed`.

---

## 🛠️ Customization & Extension

- **Add/Remove Steps:**
  - Edit `CheckoutPage.jsx` to add or remove steps/components.
- **Validation:**
  - Update validation logic in form components or use helpers in `helpers/validations/`.
- **Payment Methods:**
  - Add new payment integrations in `app/api/payment/` and corresponding UI in checkout components.
- **Emails:**
  - Customize email templates in `components/emails/` and API logic in `app/api/emails/`.

---

## 📧 Payment Confirmation Email

After a successful payment during checkout, a payment confirmation email is sent to the user. This email provides assurance and details about the completed transaction.

**When is it triggered?**

- After payment is successfully processed (e.g., via Square or Cash on Delivery), the backend triggers the payment confirmation email API endpoint.

**Main files involved:**

- `app/api/emails/payment/confirmation/route.js` – API route that sends the payment confirmation email.
- `components/emails/PaymentConfirmationEmail.jsx` – React component that defines the email template and content.

**How it works:**

1. The checkout process completes payment.
2. The backend calls the `/api/emails/payment/confirmation` endpoint with order and user details.
3. The API route composes and sends the email using the template.
4. The user receives a confirmation email with payment and order details.

**Customization:**

- To change the email content or design, edit `PaymentConfirmationEmail.jsx`.
- To modify sending logic or add recipients, update the API logic in `route.js`.
- For localization, ensure translations are available for email content if needed.

---

## 🐞 Troubleshooting

- **Payment Fails:**
  - Check API logs and payment provider configuration.
  - Ensure required environment variables are set.
- **Emails Not Sent:**
  - Verify email API endpoints and SMTP/API keys.
- **Redux State Issues:**
  - Check `checkoutSlice` and `cartSlice` for correct state updates.
- **UI Bugs:**
  - Inspect step navigation and form validation logic.

---

## 📚 Related Files

- `components/checkout/CheckoutPage.jsx`
- `lib/store/slices/checkoutSlice.js`
- `app/api/payment/`
- `app/api/emails/order/`
- `components/emails/`

---

> For further questions or to report issues, please contact the project maintainer or open an issue on GitHub.
