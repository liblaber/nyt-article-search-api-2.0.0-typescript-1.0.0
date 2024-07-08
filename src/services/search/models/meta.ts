import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const meta = z.object({
  hits: z.number().optional(),
  offset: z.number().optional(),
  time: z.number().optional(),
});

/**
 *
 * @typedef  {Meta} meta
 * @property {number}
 * @property {number}
 * @property {number}
 */
export type Meta = z.infer<typeof meta>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const metaResponse = z
  .object({
    hits: z.number().optional(),
    offset: z.number().optional(),
    time: z.number().optional(),
  })
  .transform((data) => ({
    hits: data['hits'],
    offset: data['offset'],
    time: data['time'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const metaRequest = z
  .object({ hits: z.number().nullish(), offset: z.number().nullish(), time: z.number().nullish() })
  .transform((data) => ({
    hits: data['hits'],
    offset: data['offset'],
    time: data['time'],
  }));
