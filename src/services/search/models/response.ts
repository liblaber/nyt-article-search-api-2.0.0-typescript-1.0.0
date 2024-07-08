import { z } from 'zod';
import { article, articleRequest, articleResponse } from './article';
import { meta, metaRequest, metaResponse } from './meta';

/**
 * The shape of the model inside the application code - what the users use
 */
export const response = z.object({
  docs: z.array(article).optional(),
  meta: meta.optional(),
});

/**
 *
 * @typedef  {Response} response
 * @property {Article[]}
 * @property {Meta}
 */
export type Response = z.infer<typeof response>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const responseResponse = z
  .object({
    docs: z.array(articleResponse).optional(),
    meta: metaResponse.optional(),
  })
  .transform((data) => ({
    docs: data['docs'],
    meta: data['meta'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const responseRequest = z
  .object({ docs: z.array(articleRequest).nullish(), meta: metaRequest.nullish() })
  .transform((data) => ({
    docs: data['docs'],
    meta: data['meta'],
  }));
