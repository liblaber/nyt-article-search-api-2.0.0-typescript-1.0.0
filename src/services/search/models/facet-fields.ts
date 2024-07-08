import { z } from 'zod';

export const facetFields = z.enum([
  'day_of_week',
  'document_type',
  'ingredients',
  'news_desk',
  'pub_month',
  'pub_year',
  'section_name',
  'source',
  'subsection_name',
  'type_of_material',
]);

export type FacetFields = z.infer<typeof facetFields>;
