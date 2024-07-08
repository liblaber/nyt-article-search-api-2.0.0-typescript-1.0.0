import { Environment } from './http/environment';
import { SdkConfig } from './http/types';
import { SearchService } from './services/search';
export * from './services/search/models';

export class NytArticleSearch {
  public readonly search: SearchService;

  constructor(public config: SdkConfig) {
    const baseUrl = config.environment || config.baseUrl || Environment.DEFAULT;
    this.config = {
      ...config,
      baseUrl,
    };
    this.search = new SearchService(this.config);
  }

  set baseUrl(baseUrl: string) {
    this.search.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.search.baseUrl = environment;
  }

  set apiKey(apiKey: string) {
    this.search.apiKey = apiKey;
  }
}

// c029837e0e474b76bc487506e8799df5e3335891efe4fb02bda7a1441840310c
