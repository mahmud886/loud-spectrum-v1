import { z } from 'zod';

export const cardFormSchema = z.object({
  cardHolderName: z.string().min(1, 'Card holder name is required'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiry date (MM/YY)'),
  securityCode: z.string().regex(/^[0-9]{3,4}$/, 'Invalid security code'),
  postalCode: z.string().min(5, 'Invalid postal code'),
});

export const wireFormSchema = z.object({
  accountHolderName: z.string().min(1, 'Account holder name is required'),
  accountNumber: z.string().min(8, 'Invalid account number'),
  transactionId: z.string().min(1, 'Transaction ID is required'),
});

export const addressSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Invalid zip code'),
  phone: z.string().min(10, 'Invalid phone number'),
  email: z.string().email('Invalid email address'),
});
