import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const person = z.object({
  firstname: z.string().nullable().optional(),
  middlename: z.string().nullable().nullable().optional(),
  lastname: z.string().nullable().optional(),
  qualifier: z.string().nullable().optional(),
  title: z.string().nullable().optional(),
  role: z.string().optional(),
  organization: z.string().nullable().optional(),
  rank: z.number().optional(),
});

/**
 *
 * @typedef  {Person} person
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {number}
 */
export type Person = z.infer<typeof person>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const personResponse = z
  .object({
    firstname: z.string().nullable().optional(),
    middlename: z.string().nullable().nullable().optional(),
    lastname: z.string().nullable().optional(),
    qualifier: z.string().nullable().optional(),
    title: z.string().nullable().optional(),
    role: z.string().optional(),
    organization: z.string().nullable().optional(),
    rank: z.number().optional(),
  })
  .transform((data) => ({
    firstname: data['firstname'],
    middlename: data['middlename'],
    lastname: data['lastname'],
    qualifier: data['qualifier'],
    title: data['title'],
    role: data['role'],
    organization: data['organization'],
    rank: data['rank'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const personRequest = z
  .object({
    firstname: z.string().nullable().nullish(),
    middlename: z.string().nullable().nullable().nullish(),
    lastname: z.string().nullable().nullish(),
    qualifier: z.string().nullable().nullish(),
    title: z.string().nullable().nullish(),
    role: z.string().nullish(),
    organization: z.string().nullable().nullish(),
    rank: z.number().nullish(),
  })
  .transform((data) => ({
    firstname: data['firstname'],
    middlename: data['middlename'],
    lastname: data['lastname'],
    qualifier: data['qualifier'],
    title: data['title'],
    role: data['role'],
    organization: data['organization'],
    rank: data['rank'],
  }));
