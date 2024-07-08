import {
  Facet,
  FacetFields,
  FacetFilter,
  Sort,
  facet,
  facetFields,
  facetFilter,
  sort,
} from './models';

export interface GetArticlesearchJsonParams {
  beginDate?: string;
  endDate?: string;
  facet?: Facet;
  facetFields?: FacetFields;
  facetFilter?: FacetFilter;
  fl?: string;
  fq?: string;
  page?: number;
  q?: string;
  sort?: Sort;
}
