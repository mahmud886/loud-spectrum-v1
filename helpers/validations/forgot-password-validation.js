import { z } from 'zod';

export const forgotPasswordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

export const validateForgotPassword = (data) => {
  try {
    return { success: true, data: forgotPasswordSchema.parse(data) };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
