# SearchService

A list of all methods in the `SearchService` service. Click on the method name to view detailed information about that method.

| Methods                                           | Description                                              |
| :------------------------------------------------ | :------------------------------------------------------- |
| [get_articlesearch_json](#get_articlesearch_json) | Search for NYT articles by keywords, filters and facets. |

## get_articlesearch_json

Search for NYT articles by keywords, filters and facets.

- HTTP Method: `GET`
- Endpoint: `/articlesearch.json`

**Parameters**

| Name        | Type                                    | Required | Description                   |
| :---------- | :-------------------------------------- | :------- | :---------------------------- |
| beginDate   | string                                  | ❌        | Begin date (e.g. 20120101)    |
| endDate     | string                                  | ❌        | End date (e.g. 20121231)      |
| facet       | [Facet](../models/Facet.md)             | ❌        | Whether to show facet counts  |
| facetFields | [FacetFields](../models/FacetFields.md) | ❌        | Facets                        |
| facetFilter | [FacetFilter](../models/FacetFilter.md) | ❌        | Have facet counts use filters |
| fl          | string                                  | ❌        | Field list                    |
| fq          | string                                  | ❌        | Filter query                  |
| page        | number                                  | ❌        | Page number (0, 1, ...)       |
| q           | string                                  | ❌        | Query                         |
| sort        | [Sort](../models/Sort.md)               | ❌        | Sort order                    |

**Return Type**

`GetArticlesearchJsonOkResponse`

**Example Usage Code Snippet**

```typescript
import { NytArticleSearch } from 'nyt-article-search';
import type { Facet, FacetFields, FacetFilter, Sort } from 'nyt-article-search';
(async () => {
  try {
    const nytArticleSearch = new NytArticleSearch({
      apiKey: 'YOUR_API_KEY',
    });

    const facet: Facet = 'false';
    const facetFields: FacetFields = 'day_of_week';
    const facetFilter: FacetFilter = 'false';
    const sort: Sort = 'newest';

    const { data } = await nytArticleSearch.search.getArticlesearchJson({
      facet,
      facetFields,
      facetFilter,
      sort,
    });

    console.log(data);
  } catch (error) {
    console.error(JSON.stringify((error as any).errors, null, 2));
  }
})();
```
