import { z } from 'zod';
import { legacy, legacyRequest, legacyResponse } from './legacy';

/**
 * The shape of the model inside the application code - what the users use
 */
export const multimedia = z.object({
  rank: z.number().optional(),
  subtype: z.string().optional(),
  caption: z.string().nullable().optional(),
  credit: z.string().nullable().optional(),
  type_: z.string().optional(),
  url: z.string().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
  legacy: legacy.optional(),
  subType: z.string().optional(),
  cropname: z.string().nullable().optional(),
});

/**
 *
 * @typedef  {Multimedia} multimedia
 * @property {number}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {string}
 * @property {number}
 * @property {number}
 * @property {Legacy}
 * @property {string}
 * @property {string}
 */
export type Multimedia = z.infer<typeof multimedia>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const multimediaResponse = z
  .object({
    rank: z.number().optional(),
    subtype: z.string().optional(),
    caption: z.string().nullable().optional(),
    credit: z.string().nullable().optional(),
    type: z.string().optional(),
    url: z.string().optional(),
    height: z.number().optional(),
    width: z.number().optional(),
    legacy: legacyResponse.optional(),
    subType: z.string().optional(),
    crop_name: z.string().nullable().optional(),
  })
  .transform((data) => ({
    rank: data['rank'],
    subtype: data['subtype'],
    caption: data['caption'],
    credit: data['credit'],
    type_: data['type'],
    url: data['url'],
    height: data['height'],
    width: data['width'],
    legacy: data['legacy'],
    subType: data['subType'],
    cropName: data['crop_name'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const multimediaRequest = z
  .object({
    rank: z.number().nullish(),
    subtype: z.string().nullish(),
    caption: z.string().nullable().nullish(),
    credit: z.string().nullable().nullish(),
    type_: z.string().nullish(),
    url: z.string().nullish(),
    height: z.number().nullish(),
    width: z.number().nullish(),
    legacy: legacyRequest.nullish(),
    subType: z.string().nullish(),
    cropname: z.string().nullable().nullish(),
  })
  .transform((data) => ({
    rank: data['rank'],
    subtype: data['subtype'],
    caption: data['caption'],
    credit: data['credit'],
    type: data['type_'],
    url: data['url'],
    height: data['height'],
    width: data['width'],
    legacy: data['legacy'],
    subType: data['subType'],
    crop_name: data['cropname'],
  }));
