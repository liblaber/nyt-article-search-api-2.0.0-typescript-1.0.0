import { z } from 'zod';
import { person, personRequest, personResponse } from './person';

/**
 * The shape of the model inside the application code - what the users use
 */
export const byline = z.object({
  original: z.string().optional().nullable(),
  person: z.array(person).optional(),
  organization: z.string().nullable().optional(),
});

/**
 *
 * @typedef  {Byline} byline
 * @property {string}
 * @property {Person[]}
 * @property {string}
 */
export type Byline = z.infer<typeof byline>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const bylineResponse = z
  .object({
    original: z.string().optional().nullable(),
    person: z.array(personResponse).optional(),
    organization: z.string().nullable().optional(),
  })
  .transform((data) => ({
    original: data['original'],
    person: data['person'],
    organization: data['organization'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const bylineRequest = z
  .object({
    original: z.string().nullish(),
    person: z.array(personRequest).nullish(),
    organization: z.string().nullable().nullish(),
  })
  .transform((data) => ({
    original: data['original'],
    person: data['person'],
    organization: data['organization'],
  }));
