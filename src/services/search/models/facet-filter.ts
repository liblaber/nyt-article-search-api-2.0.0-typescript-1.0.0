import { z } from 'zod';

export const facetFilter = z.enum(['false', 'true']);

export type FacetFilter = z.infer<typeof facetFilter>;
