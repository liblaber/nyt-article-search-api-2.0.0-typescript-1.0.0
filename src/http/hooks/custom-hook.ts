import { Hook, HttpError, HttpRequest, HttpResponse } from './hook';

export class CustomHook implements Hook {
  beforeRequest(request: HttpRequest, params: Map<string, string>): HttpRequest {
    if (!params.has('apiKey')) {
      throw new Error('apiKey is required');
    }
    request.url = appendQueryParam(request.url, 'api-key', params.get('apiKey') || '');
    return request;
  }

  afterResponse(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): HttpResponse<any> {
    return response;
  }

  onError(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): HttpError {
    console.log(`onError: ${params}`, request, response);
    return {
      ...response,
      error: 'something went wrong',
    };
  }
}

function appendQueryParam(url: string, param: string, value: string): string {
  try {
    const urlObject = new URL(url);
    urlObject.searchParams.append(param, value);
    return urlObject.toString();
  } catch (error) {
    console.error('Invalid URL provided:', error);
    return url;
  }
}
