import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string(),
    address: z.string(),
    role: z.enum(['admin', 'user']),
    status: z.enum(['basic', 'premium']),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    password: z.string().optional(),
    role: z.enum(['admin', 'user']).optional(),
    status: z.enum(['basic', 'premium']).optional(),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
