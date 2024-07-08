import { Environment } from '../http/environment';
import { HttpClient } from '../http';
import { SdkConfig } from '../http/types';

export class BaseService {
  public client: HttpClient = new HttpClient(this.config);

  constructor(public config: SdkConfig) {}

  set baseUrl(baseUrl: string) {
    this.config.baseUrl = baseUrl;
  }

  set environment(environment: Environment) {
    this.config.environment = environment;
  }

  set apiKey(apiKey: string) {
    this.config.apiKey = apiKey;
  }
}
