import { ZodType } from 'zod';
import { Environment } from './environment';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface SdkConfig {
  baseUrl?: string;
  environment?: Environment;
  apiKey?: string;
  retry?: RetryOptions;
}

export interface HttpRequest<T> extends Options<T> {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  retry: Required<RetryOptions>;
  config: SdkConfig;
}

export interface HttpMetadata {
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface HttpResponse<T> {
  data?: T;
  metadata: HttpMetadata;
  raw: ArrayBuffer;
}

export interface RequestHandler {
  next?: RequestHandler;

  handle<T>(request: HttpRequest<T>): Promise<HttpResponse<T>>;
}

export enum ContentType {
  Json = 'json',
  Xml = 'xml',
  Pdf = 'pdf',
  Image = 'image',
  File = 'file',
  Binary = 'binary',
  FormUrlEncoded = 'form',
  Text = 'text',
  MultipartFormData = 'multipartFormData',
}

export interface Options<T> {
  responseSchema: ZodType<T, any, any>;
  requestSchema?: ZodType;
  body?: any;
  requestContentType?: ContentType;
  responseContentType?: ContentType;
  abortSignal?: AbortSignal;
  queryParams?: Record<string, unknown>;
  retry?: RetryOptions;
}

export interface RequestConfig {
  retry?: RetryOptions;
}

export interface RetryOptions {
  attempts: number;
  delayMs?: number;
}
