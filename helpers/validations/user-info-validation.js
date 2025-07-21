import { z } from 'zod';

export const userInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s]*$/, 'Name can only contain letters, numbers and spaces'),
  phone: z.string().regex(/^[0-9]+$/, 'Phone number must contain only numbers'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
});

export const validateUserInfo = (data) => {
  try {
    return { success: true, data: userInfoSchema.parse(data) };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      };
    }
    throw error;
  }
};
