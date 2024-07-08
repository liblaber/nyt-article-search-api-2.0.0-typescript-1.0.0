import { z } from 'zod';

export const sort = z.enum(['newest', 'oldest', 'relevance']);

export type Sort = z.infer<typeof sort>;
