type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface HttpRequest {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  body?: BodyInit;
  abortSignal?: AbortSignal;
  queryParams?: Record<string, unknown>;
}

interface HttpMetadata {
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpResponse<T> {
  data?: T;
  metadata: HttpMetadata;
  raw: ArrayBuffer;
}

export interface HttpError {
  error: string;
  metadata: HttpMetadata;
}

export interface Hook {
  beforeRequest(request: HttpRequest, params: Map<string, string>): HttpRequest;

  afterResponse(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): HttpResponse<any>;

  onError(
    request: HttpRequest,
    response: HttpResponse<any>,
    params: Map<string, string>,
  ): HttpError;
}
