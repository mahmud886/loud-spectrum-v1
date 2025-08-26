# Forgot Password Email Template Usage

## Overview

The `ForgotPasswordEmail` component is a React Email template designed for sending password reset emails to users. It follows the same design patterns as other email templates in the project.

## Files Created/Updated

1. **`components/emails/ForgotPasswordEmail.jsx`** - The main email template component
2. **`services/send-forget-password-email.js`** - Service function to send the email
3. **`app/api/emails/auth/forget-password/route.js`** - API endpoint for sending forgot password emails

## Usage

### 1. Using the Service Function

```javascript
import { sendForgotPasswordEmail } from '@/services/send-forget-password-email';

const result = await sendForgotPasswordEmail({
  email: 'user@example.com',
  name: 'John Doe', // optional
  resetToken: 'abc123...',
  resetUrl: 'https://yoursite.com/reset-password?token=abc123...', // optional
});

if (result.success) {
  console.log('Email sent successfully:', result.emailId);
} else {
  console.error('Failed to send email:', result.message);
}
```

### 2. Using the API Endpoint

```javascript
const response = await fetch('/api/emails/auth/forget-password', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    name: 'John Doe', // optional
    resetToken: 'abc123...',
    resetUrl: 'https://yoursite.com/reset-password?token=abc123...', // optional
  }),
});

const result = await response.json();
```

### 3. Direct Template Usage

```javascript
import ForgotPasswordEmail from '@/components/emails/ForgotPasswordEmail';
import { render } from '@react-email/components';

const emailHtml = await render(
  ForgotPasswordEmail({
    email: 'user@example.com',
    name: 'John Doe',
    resetToken: 'abc123...',
    resetUrl: 'https://yoursite.com/reset-password?token=abc123...',
  }),
);
```

## Template Features

- **Responsive Design**: Works on all email clients and devices
- **Security Focused**: Clear warnings about unauthorized requests
- **Professional Branding**: Consistent with Loud Spectrum brand colors and fonts
- **Accessibility**: Proper text alternatives and fallbacks
- **Expiration Notice**: Clear 1-hour expiration warning
- **Alternative Access**: Copy-paste link for users who can't click buttons
- **Help Section**: Support contact information

## Props

| Prop         | Type   | Required | Description                                         |
| ------------ | ------ | -------- | --------------------------------------------------- |
| `email`      | string | Yes      | Recipient's email address                           |
| `name`       | string | No       | Recipient's name (defaults to "there")              |
| `resetToken` | string | Yes      | Password reset token                                |
| `resetUrl`   | string | No       | Complete reset URL (auto-generated if not provided) |

## Environment Variables Required

- `RESEND_API_KEY` - Resend API key for sending emails
- `RESEND_FROM_EMAIL` - From email address (defaults to noreply@loudspectrum.com)
- `NEXT_PUBLIC_BASE_URL_EMAIL` - Base URL for email links (defaults to localhost:3000)

## Email Content

The email includes:

1. **Header**: Loud Spectrum branding with gradient logo
2. **Alert Banner**: Clear indication this is a password reset request
3. **Personal Greeting**: Uses recipient's name if provided
4. **Reset Button**: Prominent call-to-action button
5. **Alternative Link**: Copy-paste option for accessibility
6. **Security Notice**: Warning about unauthorized requests
7. **Important Information**: Expiration and usage details
8. **Help Section**: Support contact information
9. **Footer**: Company information and address

## Integration with Existing System

The template is designed to work with your existing forgot password flow:

1. User requests password reset through the form
2. Your backend generates a reset token
3. Call the email service or API endpoint
4. Email is sent using the template
5. User receives professional, branded email
6. User clicks link to reset password

## Customization

The template uses the same color scheme and styling as other email templates in the project. To customize:

1. Update colors in the Tailwind config section
2. Modify text content as needed
3. Adjust layout components
4. Update company information in the footer

## Testing

To test the email template:

1. Use a tool like React Email Preview
2. Send test emails to yourself
3. Check rendering across different email clients
4. Verify all links work correctly
5. Test with and without optional parameters
