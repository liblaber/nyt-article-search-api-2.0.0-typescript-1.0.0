import { HttpRequest, HttpResponse, RequestHandler } from '../types';

export class TerminatingHandler implements RequestHandler {
  async handle<T>({
    url,
    method,
    body,
    abortSignal,
    headers,
  }: HttpRequest<T>): Promise<HttpResponse<T>> {
    const response = await fetch(url, {
      method,
      body,
      signal: abortSignal,
      headers,
    });

    return {
      metadata: {
        status: response.status,
        statusText: response.statusText,
        headers: this.getHeaders(response),
      },
      raw: await response.clone().arrayBuffer(),
    };
  }

  private getHeaders(response: Response): Record<string, string> {
    const headers: Record<string, string> = {};
    response.headers.forEach((value: string, key: string) => {
      headers[key] = value;
    });

    return headers;
  }
}
