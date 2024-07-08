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
