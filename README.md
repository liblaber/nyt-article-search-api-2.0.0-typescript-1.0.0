# NY Times Article Search TypeScript SDK 1.0.0

Welcome to the NYTimes Article Search SDK documentation. This guide will help you get started with integrating and using the NYTimes Article Search SDK in your project.

## Versions

- API version: `2.0.0`
- SDK version: `1.0.0`

## About the API

Use the Article Search API to look up articles by keyword. You can refine your search using filters and facets. `/articlesearch.json?q={query}&fq={filter}` ## Example Call `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=yourkey` ## FILTERING YOUR SEARCH Use filters to narrow the scope of your search. You can specify the fields and the values that your query will be filtered on. The Article Search API uses [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html#simple-query-string-syntax), so the filter query (fq) uses standard [Lucene syntax](http://www.lucenetutorial.com/lucene-query-syntax.html). Separate the filter field name and value with a colon, and surround multiple values with parentheses. `field-name:( value1 ,  value2 , ...  value n )` The default connector for values in parentheses is OR. If you declare an explicit boolean value, it must be capitalized. You can filter on multiple values and fields. `field-name-1:( value1 ) AND field-name-2:( value2 ,  value3 )` For a list of all fields you can filter on, see the Filter Query Fields table below. You can also filter by search text. ### Pagination The Article Search API returns a max of 10 results at a time. The meta node in the response contains the total number of matches ( hits ) and the current offset. Use the page query parameter to paginate thru results (page=0 for results 1-10, page=1 for 11-20, ...). You can paginate thru up to 100 pages (1,000 results). If you get too many results try filtering by date range. ### Filter Query Examples Restrict your search to articles with The New York Times as the source: `fq=source:( The New York Times )` Restrict your search to articles from either the Sports or Foreign desk: `fq=news_desk:( Sports ,  Foreign )` Restrict your search to articles that are about New York City and from the Sports desk: `fq=news_desk:( Sports ) AND glocations:( NEW YORK CITY )` If you do not specify a field, the scope of the filter query will look for matches in the body, headline and byline. The example below will restrict your search to articles with The New York Times in the body, headline or byline: `fq=The New York Times` Find articles with the word Pokemon that were on the print paper's front page. `fq=Pokemon AND print_page:1 AND (print_section:( A ,  1 ) OR (!_exists_:print_section))` ### Filter Query Fields Field | Behavior ------------------------- | --------------- body | Multiple tokens body.search | Left-edge n-grams creative_works | Single token creative_works.contains | Multiple tokens day_of_week | Single token document_type | Case-sensitive exact match glocations | Single token glocations.contains | Multiple tokens headline | Multiple tokens headline.search | Left-edge n-grams kicker | Single token kicker.contains | Multiple tokens news_desk | Single token news_desk.contains | Multiple tokens organizations | Single token organizations.contains | Multiple tokens persons | Single token persons.contains | Multiple tokens pub_date | Timestamp (YYYY-MM-DD) pub_year | Integer secpg | Multiple tokens source | Single token source.contains | Multiple tokens subject | Single token subject.contains | Multiple tokens section_name | Single token section_name.contains | Multiple tokens type_of_material | Single token type_of_material.contains | Multiple tokens web_url | Single token (case-sensitive) word_count | Integer #### News Desk Values _ Adventure Sports _ Arts & Leisure _ Arts _ Automobiles _ Blogs _ Books _ Booming _ Business Day _ Business _ Cars _ Circuits _ Classifieds _ Connecticut _ Crosswords & Games _ Culture _ DealBook _ Dining _ Editorial _ Education _ Energy _ Entrepreneurs _ Environment _ Escapes _ Fashion & Style _ Fashion _ Favorites _ Financial _ Flight _ Food _ Foreign _ Generations _ Giving _ Global Home _ Health & Fitness _ Health _ Home & Garden _ Home _ Jobs _ Key _ Letters _ Long Island _ Magazine _ Market Place _ Media _ Men's Health _ Metro _ Metropolitan _ Movies _ Museums _ National _ Nesting _ Obits _ Obituaries _ Obituary _ OpEd _ Opinion _ Outlook _ Personal Investing _ Personal Tech _ Play _ Politics _ Regionals _ Retail _ Retirement _ Science _ Small Business _ Society _ Sports _ Style _ Sunday Business _ Sunday Review _ Sunday Styles _ T Magazine _ T Style _ Technology _ Teens _ Television _ The Arts _ The Business of Green _ The City Desk _ The City _ The Marathon _ The Millennium _ The Natural World _ The Upshot _ The Weekend _ The Year in Pictures _ Theater _ Then & Now _ Thursday Styles _ Times Topics _ Travel _ U.S. _ Universal _ Upshot _ UrbanEye _ Vacation _ Washington _ Wealth _ Weather _ Week in Review _ Week _ Weekend _ Westchester _ Wireless Living _ Women's Health _ Working _ Workplace _ World _ Your Money #### Section Name Values _ Arts _ Automobiles _ Autos _ Blogs _ Books _ Booming _ Business _ Business Day _ Corrections _ Crosswords & Games _ Crosswords/Games _ Dining & Wine _ Dining and Wine _ Editors' Notes _ Education _ Fashion & Style _ Food _ Front Page _ Giving _ Global Home _ Great Homes & Destinations _ Great Homes and Destinations _ Health _ Home & Garden _ Home and Garden _ International Home _ Job Market _ Learning _ Magazine _ Movies _ Multimedia _ Multimedia/Photos _ N.Y. / Region _ N.Y./Region _ NYRegion _ NYT Now _ National _ New York _ New York and Region _ Obituaries _ Olympics _ Open _ Opinion _ Paid Death Notices _ Public Editor _ Real Estate _ Science _ Sports _ Style _ Sunday Magazine _ Sunday Review _ T Magazine _ T:Style _ Technology _ The Public Editor _ The Upshot _ Theater _ Times Topics _ TimesMachine _ Today's Headlines _ Topics _ Travel _ U.S. _ Universal _ UrbanEye _ Washington _ Week in Review _ World _ Your Money #### Type of Material Values _ Addendum _ An Analysis _ An Appraisal _ Archives _ Article _ Banner _ Biography _ Birth Notice _ Blog _ Brief _ Caption _ Chronology _ Column _ Correction _ Economic Analysis _ Editorial _ Editorial Cartoon _ Editors' Note _ First Chapter _ Front Page _ Glossary _ Interactive Feature _ Interactive Graphic _ Interview _ Letter _ List _ Marriage Announcement _ Military Analysis _ News _ News Analysis _ Newsletter _ Obituary _ Obituary (Obit) _ Op-Ed _ Paid Death Notice _ Postscript _ Premium _ Question _ Quote _ Recipe _ Review _ Schedule _ SectionFront _ Series _ Slideshow _ Special Report _ Statistics _ Summary _ Text _ Video _ Web Log ## USING FACETS Use facets to view the relative importance of certain fields to a search term, and gain insight about how to best refine your queries and filter your search results. The following fields can be used as facet fields: day_of_week, document_type, ingredients, news_desk, pub_month, pub_year, section_name, source, subsection_name, and type_of_material. Specify facets using the facet_fields parameter. Set facet=true and the response will contain an array with a count for the five terms that have the highest count for each facet. For example, including the following in your request will add a facet array with a count for the top five days of the week to the response. `facet_fields=day_of_week&facet=true` By default, facet counts ignore all filters and return the count for all results of a query. For the following queries, the facet count in each response will be identical, even though the results returned in one set is restricted to articles published in 2012. `q=obama&facet_fields=source&facet=true&begin_date=20120101&end_date=20121231` You can force facet counts to respect filters by setting facet_filter=true. Facet counts will be restricted based on any filters you have specified (this includes both explicit filter queries set using the fq parameter and implicit filters like begin_date). Here is the facet array response to the query. `javascript  facets : {    source : {      _type :  terms ,      missing : 524,      total : 83121,      other : 317,      terms : [       {          term :  The New York Times ,          count : 68530       },       {          term :  AP ,          count : 7705       },       {          term :  Reuters ,          count : 4969       },       {          term :  International Herald Tribune ,          count : 1464       },       {          term :   ,          count : 136       }     ]   } } ` If you set facet_filter to true the facet array will only count facet occurences in 2012. `javascript facets : {    source : {      _type :  terms ,      missing : 192,      total : 22596,      other : 139,      terms : [       {          term :  The New York Times ,          count : 14812       },       ... ` ### Examples Requests Search for documents containing 'new york times' and return results 20-29 with results sorted oldest first. `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&page=2&sort=oldest&api-key=your-api-key` Search for all documents published on January 1, 2012 containing 'romney'. Facet count will be returned for 'day_of_week' and will be reflective of all documents (i.e., the date range filter and filter query do not affect facet counts). `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=romney&facet_field=day_of_week&facet=true&begin_date=20120101&end_date=20120101&api-key=your-api-key` ### Example Response Here is an partial example response. `javascript {    response : {      meta : {        hits : 25,        time : 332,        offset : 0     },      docs : [       {          web_url :  http://thecaucus.blogs.nytimes.com/2012/01/01/virginia-attorney-general-backs-off-ballot-proposal/ ,          snippet :  Virginia's attorney general on Sunday backed off of a proposal to loosen the state's ballot access rules to allow more Republican presidential candidates to qualify. ,          lead_paragraph :  DES MOINES -- Virginia's attorney general on Sunday backed off of a proposal to loosen the state's ballot access rules to allow more Republican presidential candidates to qualify. ,         ...       }     ],      facets : {          day_of_week : {              _type :  terms ,              missing : 1871790,              total : 13098462,              other : 3005891,              terms : [               {                  term :  Sunday ,                  count : 3122347               },               ... ` ### Limit Fields in Response You can limit the number fields returned in the response with the fl parameter. `fl=web_url`

## Table of Contents

- [NY Times Article Search TypeScript SDK 1.0.0](#ny-times-article-search-typescript-sdk-100)
  - [Versions](#versions)
  - [About the API](#about-the-api)
  - [Table of Contents](#table-of-contents)
- [Setup \& Configuration](#setup--configuration)
  - [Supported Language Versions](#supported-language-versions)
  - [Installation](#installation)
  - [Services](#services)
  - [Models](#models)
  - [License](#license)

# Setup & Configuration

## Supported Language Versions

This SDK is compatible with the following versions: `TypeScript >= 4.8.4`

## Installation

To get started with the SDK, we recommend installing using `npm`:

```bash
npm install nyt-article-search
```

## Services

The SDK provides various services to interact with the API.

<details> 
<summary>Below is a list of all available services with links to their detailed documentation:</summary>

| Name                                                     |
| :------------------------------------------------------- |
| [SearchService](documentation/services/SearchService.md) |

</details>

## Models

The SDK includes several models that represent the data structures used in API requests and responses. These models help in organizing and managing the data efficiently.

<details> 
<summary>Below is a list of all available models with links to their detailed documentation:</summary>

| Name                                                                                     | Description |
| :--------------------------------------------------------------------------------------- | :---------- |
| [GetArticlesearchJsonOkResponse](documentation/models/GetArticlesearchJsonOkResponse.md) |             |
| [Facet](documentation/models/Facet.md)                                                   |             |
| [FacetFields](documentation/models/FacetFields.md)                                       |             |
| [FacetFilter](documentation/models/FacetFilter.md)                                       |             |
| [Sort](documentation/models/Sort.md)                                                     |             |
| [Response](documentation/models/Response.md)                                             |             |
| [Article](documentation/models/Article.md)                                               |             |
| [Meta](documentation/models/Meta.md)                                                     |             |
| [Multimedia](documentation/models/Multimedia.md)                                         |             |
| [Headline](documentation/models/Headline.md)                                             |             |
| [Keyword](documentation/models/Keyword.md)                                               |             |
| [Byline](documentation/models/Byline.md)                                                 |             |
| [Legacy](documentation/models/Legacy.md)                                                 |             |
| [Person](documentation/models/Person.md)                                                 |             |

</details>

## License

This SDK is licensed under the MIT License.

See the [LICENSE](LICENSE) file for more details.
