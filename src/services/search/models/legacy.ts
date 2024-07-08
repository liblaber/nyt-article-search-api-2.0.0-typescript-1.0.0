import { z } from 'zod';

/**
 * The shape of the model inside the application code - what the users use
 */
export const legacy = z.object({
  wide: z.string().optional(),
  widewidth: z.number().optional(),
  wideheight: z.number().optional(),
  xlarge: z.string().optional(),
  xlargewidth: z.number().optional(),
  xlargeheight: z.number().optional(),
  thumbnail: z.string().optional(),
  thumbnailwidth: z.number().optional(),
  thumbnailheight: z.number().optional(),
});

/**
 *
 * @typedef  {Legacy} legacy
 * @property {string}
 * @property {number}
 * @property {number}
 * @property {string}
 * @property {number}
 * @property {number}
 * @property {string}
 * @property {number}
 * @property {number}
 */
export type Legacy = z.infer<typeof legacy>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const legacyResponse = z
  .object({
    wide: z.string().optional(),
    widewidth: z.number().optional(),
    wideheight: z.number().optional(),
    xlarge: z.string().optional(),
    xlargewidth: z.number().optional(),
    xlargeheight: z.number().optional(),
    thumbnail: z.string().optional(),
    thumbnailwidth: z.number().optional(),
    thumbnailheight: z.number().optional(),
  })
  .transform((data) => ({
    wide: data['wide'],
    widewidth: data['widewidth'],
    wideheight: data['wideheight'],
    xlarge: data['xlarge'],
    xlargewidth: data['xlargewidth'],
    xlargeheight: data['xlargeheight'],
    thumbnail: data['thumbnail'],
    thumbnailwidth: data['thumbnailwidth'],
    thumbnailheight: data['thumbnailheight'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const legacyRequest = z
  .object({
    wide: z.string().nullish(),
    widewidth: z.number().nullish(),
    wideheight: z.number().nullish(),
    xlarge: z.string().nullish(),
    xlargewidth: z.number().nullish(),
    xlargeheight: z.number().nullish(),
    thumbnail: z.string().nullish(),
    thumbnailwidth: z.number().nullish(),
    thumbnailheight: z.number().nullish(),
  })
  .transform((data) => ({
    wide: data['wide'],
    widewidth: data['widewidth'],
    wideheight: data['wideheight'],
    xlarge: data['xlarge'],
    xlargewidth: data['xlargewidth'],
    xlargeheight: data['xlargeheight'],
    thumbnail: data['thumbnail'],
    thumbnailwidth: data['thumbnailwidth'],
    thumbnailheight: data['thumbnailheight'],
  }));
