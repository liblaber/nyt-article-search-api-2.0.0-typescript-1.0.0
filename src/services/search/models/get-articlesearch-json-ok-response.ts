import { z } from 'zod';
import { response, responseRequest, responseResponse } from './response';

/**
 * The shape of the model inside the application code - what the users use
 */
export const getArticlesearchJsonOkResponse = z.object({
  status: z.string().optional(),
  copyright: z.string().optional(),
  response: response.optional(),
});

/**
 *
 * @typedef  {GetArticlesearchJsonOkResponse} getArticlesearchJsonOkResponse
 * @property {string}
 * @property {string}
 * @property {Response}
 */
export type GetArticlesearchJsonOkResponse = z.infer<typeof getArticlesearchJsonOkResponse>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const getArticlesearchJsonOkResponseResponse = z
  .object({
    status: z.string().optional(),
    copyright: z.string().optional(),
    response: responseResponse.optional(),
  })
  .transform((data) => ({
    status: data['status'],
    copyright: data['copyright'],
    response: data['response'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const getArticlesearchJsonOkResponseRequest = z
  .object({
    status: z.string().nullish(),
    copyright: z.string().nullish(),
    response: responseRequest.nullish(),
  })
  .transform((data) => ({
    status: data['status'],
    copyright: data['copyright'],
    response: data['response'],
  }));
