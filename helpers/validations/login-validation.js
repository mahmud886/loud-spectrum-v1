import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
});

export const validateLogin = (data) => {
  try {
    return { success: true, data: loginSchema.parse(data) };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
