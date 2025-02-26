import { z } from 'zod';

const createPostValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    content: z.string(),
    categories: z.string(),
    upVote: z.string(),
    downVote: z.string(),
    comments: z.string(),
    isPremium: z.boolean(),
  }),
});

const updatePostValidationSchema = z.object({
  body: z.object({
    user: z.string().optional(),
    title: z.string().optional(),
    category: z.string().optional(),
    upVotes: z.string().optional(),
    downVotes: z.string().optional(),
    comments: z.string().optional(),
    isPremium: z.boolean().optional(),
  }),
});

export const PostValidations = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
