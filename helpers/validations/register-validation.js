import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Please enter your name'),
    phone_number: z.string().min(1, 'Please enter your phone number'),
    email: z.string().min(1, 'Please enter your email').email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Confirm password must be at least 6 characters'),
    role: z.enum(['customer', 'wholesaler']),
    status: z.enum(['Active', 'Inactive', 'Waiting For Approve']).default('Active'),
    is_deleted: z.boolean().default(false),
    company: z.string().optional(),
    website: z.string().url('Invalid website URL').optional().or(z.literal('')),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
