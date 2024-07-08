import { z } from 'zod';
import { BaseService } from '../base-service';
import { ContentType, HttpResponse } from '../../http';
import { RequestConfig } from '../../http/types';
import { GetArticlesearchJsonOkResponse, getArticlesearchJsonOkResponseResponse } from './models';
import { GetArticlesearchJsonParams } from './request-params';

export class SearchService extends BaseService {
  /**
   * Search for NYT articles by keywords, filters and facets.
   * @param {string} [beginDate] - Begin date (e.g. 20120101)
   * @param {string} [endDate] - End date (e.g. 20121231)
   * @param {Facet} [facet] - Whether to show facet counts
   * @param {FacetFields} [facetFields] - Facets
   * @param {FacetFilter} [facetFilter] - Have facet counts use filters
   * @param {string} [fl] - Field list
   * @param {string} [fq] - Filter query
   * @param {number} [page] - Page number (0, 1, ...)
   * @param {string} [q] - Query
   * @param {Sort} [sort] - Sort order
   * @returns {Promise<HttpResponse<GetArticlesearchJsonOkResponse>>} An array of articles.
   */
  async getArticlesearchJson(
    params?: GetArticlesearchJsonParams,
    requestConfig?: RequestConfig,
  ): Promise<HttpResponse<GetArticlesearchJsonOkResponse>> {
    const path = '/articlesearch.json';
    const options: any = {
      responseSchema: getArticlesearchJsonOkResponseResponse,
      requestSchema: z.any(),
      queryParams: {},
      headers: {},
      requestContentType: ContentType.Json,
      responseContentType: ContentType.Json,
      retry: requestConfig?.retry,
      config: this.config,
    };
    if (params?.beginDate) {
      options.queryParams['begin_date'] = params?.beginDate;
    }
    if (params?.endDate) {
      options.queryParams['end_date'] = params?.endDate;
    }
    if (params?.facet) {
      options.queryParams['facet'] = params?.facet;
    }
    if (params?.facetFields) {
      options.queryParams['facet_fields'] = params?.facetFields;
    }
    if (params?.facetFilter) {
      options.queryParams['facet_filter'] = params?.facetFilter;
    }
    if (params?.fl) {
      options.queryParams['fl'] = params?.fl;
    }
    if (params?.fq) {
      options.queryParams['fq'] = params?.fq;
    }
    if (params?.page) {
      options.queryParams['page'] = params?.page;
    }
    if (params?.q) {
      options.queryParams['q'] = params?.q;
    }
    if (params?.sort) {
      options.queryParams['sort'] = params?.sort;
    }
    return this.client.get(path, options);
  }
}
