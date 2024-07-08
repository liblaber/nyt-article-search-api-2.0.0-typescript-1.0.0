import { ZodUndefined } from 'zod';
import { ContentType, HttpRequest, HttpResponse, RequestHandler } from '../types';
import { HttpError } from '../error';

export class ResponseValidationHandler implements RequestHandler {
  next?: RequestHandler;

  async handle<T>(request: HttpRequest<T>): Promise<HttpResponse<T>> {
    const response = await this.next!.handle(request);

    if (this.isErrorResponse(response)) {
      throw new HttpError(response.metadata);
    }

    if (!this.hasContent(request, response)) {
      return response;
    }

    if (request.responseContentType === ContentType.Json) {
      const decodedBody = new TextDecoder().decode(response.raw);
      const json = JSON.parse(decodedBody);
      return {
        ...response,
        data: request.responseSchema.parse(json),
      };
    } else if (
      request.responseContentType === ContentType.Binary ||
      request.responseContentType === ContentType.Image
    ) {
      return {
        ...response,
        data: request.responseSchema.parse(response.raw),
      };
    } else if (
      request.responseContentType === ContentType.Text ||
      request.responseContentType === ContentType.Xml
    ) {
      const text = new TextDecoder().decode(response.raw);
      return {
        ...response,
        data: request.responseSchema.parse(text),
      };
    } else if (request.responseContentType === ContentType.FormUrlEncoded) {
      const urlEncoded = this.fromUrlEncoded(new TextDecoder().decode(response.raw));
      return {
        ...response,
        data: request.responseSchema.parse(urlEncoded),
      };
    } else if (request.responseContentType === ContentType.MultipartFormData) {
      const formData = this.fromFormData(response.raw);
      return {
        ...response,
        data: request.responseSchema.parse(formData),
      };
    } else {
      const decodedBody = new TextDecoder().decode(response.raw);
      const json = JSON.parse(decodedBody);
      return {
        ...response,
        data: request.responseSchema.parse(json),
      };
    }
  }

  private isErrorResponse(response: HttpResponse<unknown>): boolean {
    return response.metadata.status >= 400;
  }

  private hasContent<T>(request: HttpRequest<T>, response: HttpResponse<T>): boolean {
    return (
      !!request.responseSchema &&
      !(request.responseSchema instanceof ZodUndefined) &&
      response.metadata.status !== 204
    );
  }

  private fromUrlEncoded(urlEncodedData: string): object {
    const pairs = urlEncodedData.split('&');
    const result: Record<string, string> = {};

    pairs.forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key && value !== undefined) {
        result[decodeURIComponent(key)] = decodeURIComponent(value);
      }
    });

    return result;
  }

  private fromFormData(arrayBuffer: ArrayBuffer): Record<string, string> {
    const decoder = new TextDecoder();
    const text = decoder.decode(arrayBuffer);

    const boundary = text.split('\r\n')[0];
    const parts = text.split(boundary).slice(1, -1);

    const formDataObj: Record<string, string> = {};

    parts.forEach((part) => {
      const [header, value] = part.split('\r\n\r\n');
      const nameMatch = header.match(/name="([^"]+)"/);
      if (nameMatch) {
        const name = nameMatch[1].trim();
        formDataObj[name] = value?.trim() || '';
      }
    });

    return formDataObj;
  }
}
