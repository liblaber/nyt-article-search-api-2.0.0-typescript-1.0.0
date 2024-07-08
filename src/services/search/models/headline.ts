import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const headline = z.object({
  main: z.string().optional(),
  kicker: z.string().nullable().optional(),
  contentkicker: z.string().nullable().optional(),
  printHeadline: z.string().optional(),
  name: z.string().nullable().optional(),
  seo: z.string().nullable().optional(),
  sub: z.string().nullable().optional(),
});

/**
 *
 * @typedef  {Headline} headline
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 */
export type Headline = z.infer<typeof headline>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const headlineResponse = z
  .object({
    main: z.string().optional(),
    kicker: z.string().nullable().optional(),
    content_kicker: z.string().nullable().optional(),
    print_headline: z.string().nullable().optional(),
    name: z.string().nullable().optional(),
    seo: z.string().nullable().optional(),
    sub: z.string().nullable().optional(),
  })
  .transform((data) => ({
    main: data['main'],
    kicker: data['kicker'],
    contentKicker: data['content_kicker'],
    printHeadline: data['print_headline'],
    name: data['name'],
    seo: data['seo'],
    sub: data['sub'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const headlineRequest = z
  .object({
    main: z.string().nullish(),
    kicker: z.string().nullable().nullish(),
    contentkicker: z.string().nullable().nullish(),
    printHeadline: z.string().nullish(),
    name: z.string().nullable().nullish(),
    seo: z.string().nullable().nullish(),
    sub: z.string().nullable().nullish(),
  })
  .transform((data) => ({
    main: data['main'],
    kicker: data['kicker'],
    content_kicker: data['contentkicker'],
    print_headline: data['printHeadline'],
    name: data['name'],
    seo: data['seo'],
    sub: data['sub'],
  }));
