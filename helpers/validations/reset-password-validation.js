import { z } from 'zod';

export const resetPasswordSchema = z
  .object({
    reset_link: z.string().min(1, 'Reset token is required'),
    new_password: z.string().min(1, 'Password is required').min(5, 'Password must be at least 5 characters'),
    confirm_password: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ['confirm_password'],
  });

export const validateResetPassword = (data) => {
  try {
    return { success: true, data: resetPasswordSchema.parse(data) };
  } catch (error) {
    return { success: false, error: error.errors };
  }
};
