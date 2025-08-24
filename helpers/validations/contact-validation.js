import { z } from 'zod';

export const createContactSchema = (t) =>
  z.object({
    name: z
      .string()
      .min(2, t('validation.name.min'))
      .max(50, t('validation.name.max'))
      .regex(/^[a-zA-Z0-9\s]*$/, t('validation.name.regex')),
    email: z
      .string()
      .email(t('validation.email.invalid'))
      .min(5, t('validation.email.min'))
      .max(100, t('validation.email.max')),
    message: z.string().min(10, t('validation.message.min')).max(1000, t('validation.message.max')),
  });

// Keep the old export for backward compatibility, but it will use English messages
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s]*$/, 'Name can only contain letters, numbers and spaces'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(5, 'Email must be at least 5 characters')
    .max(100, 'Email must be less than 100 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export const validateContact = (data, t = null) => {
  try {
    const schema = t ? createContactSchema(t) : contactSchema;
    return { success: true, data: schema.parse(data) };
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
