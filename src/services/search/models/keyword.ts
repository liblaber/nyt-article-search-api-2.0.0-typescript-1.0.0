import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const keyword = z.object({
  name: z.string().nullable().optional(),
  value: z.string().optional(),
  rank: z.number().optional(),
  major: z.string().optional(),
});

/**
 *
 * @typedef  {Keyword} keyword
 * @property {string}
 * @property {string}
 * @property {number}
 * @property {string}
 */
export type Keyword = z.infer<typeof keyword>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const keywordResponse = z
  .object({
    name: z.string().nullable().optional(),
    value: z.string().optional(),
    rank: z.number().optional(),
    major: z.string().optional(),
  })
  .transform((data) => ({
    name: data['name'],
    value: data['value'],
    rank: data['rank'],
    major: data['major'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const keywordRequest = z
  .object({
    name: z.string().nullable().nullish(),
    value: z.string().nullish(),
    rank: z.number().nullish(),
    major: z.string().nullish(),
  })
  .transform((data) => ({
    name: data['name'],
    value: data['value'],
    rank: data['rank'],
    major: data['major'],
  }));
