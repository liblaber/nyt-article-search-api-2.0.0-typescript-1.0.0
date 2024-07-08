import { z } from 'zod';

export const facet = z.enum(['false', 'true']);

export type Facet = z.infer<typeof facet>;
