import { HttpRequest, HttpResponse, RequestHandler } from '../types';
import { HttpError } from '../error';
import { Hook } from '../hooks/hook';

export class HookHandler implements RequestHandler {
  next?: RequestHandler;

  constructor(private readonly hook: Hook) {}

  async handle<T>(request: HttpRequest<T>): Promise<HttpResponse<T>> {
    if (!this.next) {
      throw new Error('No next handler set in hook handler.');
    }

    const hookParams = this.getHookParams<T>(request);

    const nextRequest = {
      ...request,
      ...this.hook.beforeRequest(request, hookParams),
      responseSchema: request.responseSchema,
    };

    const response = await this.next.handle(nextRequest);

    if (response.metadata.status < 400) {
      return this.hook.afterResponse(request, response, hookParams);
    }

    const error = this.hook.onError(request, response, hookParams);

    throw new HttpError(error.metadata, error.error);
  }

  getHookParams<T>(request: HttpRequest<T>): Map<string, string> {
    const hookParams: Map<string, string> = new Map();
    hookParams.set('apiKey', request.config.apiKey || '');
    return hookParams;
  }
}
