import { z } from 'zod';
import { multimedia, multimediaRequest, multimediaResponse } from './multimedia';
import { headline, headlineRequest, headlineResponse } from './headline';
import { keyword, keywordRequest, keywordResponse } from './keyword';
import { byline, bylineRequest, bylineResponse } from './byline';

/**
 * The shape of the model inside the application code - what the users use
 */
export const article = z.object({
  abstract: z.string().optional(),
  webUrl: z.string().optional(),
  snippet: z.string().optional(),
  leadParagraph: z.string().optional(),
  printPage: z.number().optional(),
  printSection: z.string().optional(),
  source: z.string().optional(),
  multimedia: z.array(multimedia).optional(),
  headline: headline.optional(),
  keywords: z.array(keyword).optional(),
  pubDate: z.string().optional(),
  documentType: z.string().optional(),
  newsDesk: z.string().optional(),
  sectionname: z.string().nullable().optional(),
  subsectionname: z.string().nullable().optional(),
  byline: byline.optional(),
  typeOfMaterial: z.string().optional(),
  _id: z.string().optional(),
  wordCount: z.number().optional(),
  uri: z.string().optional(),
});

/**
 *
 * @typedef  {Article} article
 * @property {string}
 * @property {string} - Article URL.
 * @property {string}
 * @property {string}
 * @property {number} - Page in print (e.g. 1).
 * @property {string} - Section in print (e.g. A).
 * @property {string}
 * @property {Multimedia[]}
 * @property {Headline}
 * @property {Keyword[]}
 * @property {string} - Publication date.
 * @property {string} - Document type (article, multimedia).
 * @property {string} - Desk in the newsroom that worked on the story (Foreign, Metro, Sports, ...).
 * @property {string} - Section that the article appeared in (New York, Sports, World, ...).
 * @property {string}
 * @property {Byline}
 * @property {string} - Type of asset (Correction, News, Op-Ed, Review, Video, ...).
 * @property {string}
 * @property {number} - Number of words in the article.
 * @property {string} - Uniquely identifies an asset.
 */
export type Article = z.infer<typeof article>;

/**
 * The shape of the model mapping from the api schema into the application shape.
 * Is equal to application shape if all property names match the api schema
 */
export const articleResponse = z
  .object({
    abstract: z.string().optional(),
    web_url: z.string().optional(),
    snippet: z.string().optional(),
    lead_paragraph: z.string().optional(),
    print_page: z.number().optional(),
    print_section: z.string().optional(),
    source: z.string().optional(),
    multimedia: z.array(multimediaResponse).optional(),
    headline: headlineResponse.optional(),
    keywords: z.array(keywordResponse).optional(),
    pub_date: z.string().optional(),
    document_type: z.string().optional(),
    news_desk: z.string().optional(),
    section_name: z.string().nullable().optional(),
    subsection_name: z.string().nullable().optional(),
    byline: bylineResponse.optional(),
    type_of_material: z.string().optional(),
    _id: z.string().optional(),
    word_count: z.number().optional(),
    uri: z.string().optional(),
  })
  .transform((data) => ({
    abstract: data['abstract'],
    webUrl: data['web_url'],
    snippet: data['snippet'],
    leadParagraph: data['lead_paragraph'],
    printPage: data['print_page'],
    printSection: data['print_section'],
    source: data['source'],
    multimedia: data['multimedia'],
    headline: data['headline'],
    keywords: data['keywords'],
    pubDate: data['pub_date'],
    documentType: data['document_type'],
    newsDesk: data['news_desk'],
    sectionName: data['section_name'],
    subsectionName: data['subsection_name'],
    byline: data['byline'],
    typeOfMaterial: data['type_of_material'],
    _id: data['_id'],
    wordCount: data['word_count'],
    uri: data['uri'],
  }));

/**
 * The shape of the model mapping from the application shape into the api schema.
 * Is equal to application shape if all property names match the api schema
 */
export const articleRequest = z
  .object({
    abstract: z.string().nullish(),
    webUrl: z.string().nullish(),
    snippet: z.string().nullish(),
    leadParagraph: z.string().nullish(),
    printPage: z.number().nullish(),
    printSection: z.string().nullish(),
    source: z.string().nullish(),
    multimedia: z.array(multimediaRequest).nullish(),
    headline: headlineRequest.nullish(),
    keywords: z.array(keywordRequest).nullish(),
    pubDate: z.string().nullish(),
    documentType: z.string().nullish(),
    newsDesk: z.string().nullish(),
    sectionname: z.string().nullable().nullish(),
    subsectionname: z.string().nullable().nullish(),
    byline: bylineRequest.nullish(),
    typeOfMaterial: z.string().nullish(),
    _id: z.string().nullish(),
    wordCount: z.number().nullish(),
    uri: z.string().nullish(),
  })
  .transform((data) => ({
    abstract: data['abstract'],
    web_url: data['webUrl'],
    snippet: data['snippet'],
    lead_paragraph: data['leadParagraph'],
    print_page: data['printPage'],
    print_section: data['printSection'],
    source: data['source'],
    multimedia: data['multimedia'],
    headline: data['headline'],
    keywords: data['keywords'],
    pub_date: data['pubDate'],
    document_type: data['documentType'],
    news_desk: data['newsDesk'],
    section_name: data['sectionname'],
    subsection_name: data['subsectionname'],
    byline: data['byline'],
    type_of_material: data['typeOfMaterial'],
    _id: data['_id'],
    word_count: data['wordCount'],
    uri: data['uri'],
  }));
