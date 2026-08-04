import Cookies from 'js-cookie';

export type FetchRequestInit = Omit<RequestInit, 'method'>;
export type FetchInput = string | URL | Request;

interface CommonOptions {
  fetchInput: FetchInput;
  fetchInit?: FetchRequestInit;
  throwOnError?: boolean;
}

export abstract class BaseApi {
  private static createErrorMessageFromResponse(response: Response) {
    return `${response.status} - ${response.statusText}`;
  }

  private static throwOnErrorIfResponseNotOk(
    throwOnError: boolean,
    response: Response,
  ) {
    return throwOnError && !response.ok;
  }

  protected static getCsrfCookie() {
    return Cookies.get('XSRF-TOKEN');
  }

  private apiPrefix = '';

  private appendApiPrefixToStringInput(fetchInput: FetchInput) {
    if (typeof fetchInput === 'string') {
      return `/api${this.apiPrefix}${fetchInput}`;
    }

    return fetchInput;
  }

  protected constructor({ apiPrefix }: { apiPrefix: string }) {
    this.apiPrefix = apiPrefix;
  }

  protected async get({
    fetchInput,
    fetchInit,
    throwOnError = true,
  }: CommonOptions) {
    const response = await fetch(
      this.appendApiPrefixToStringInput(fetchInput),
      {
        method: 'GET',
        ...fetchInit,
      },
    );

    if (BaseApi.throwOnErrorIfResponseNotOk(throwOnError, response)) {
      throw new Error(BaseApi.createErrorMessageFromResponse(response));
    }

    return response;
  }

  protected async post({
    fetchInput,
    fetchInit,
    body,
    throwOnError = true,
  }: CommonOptions & {
    body?: unknown;
  }) {
    const response = await fetch(
      this.appendApiPrefixToStringInput(fetchInput),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': BaseApi.getCsrfCookie(),
        },
        body: JSON.stringify(body),
        ...fetchInit,
      },
    );

    if (BaseApi.throwOnErrorIfResponseNotOk(throwOnError, response)) {
      throw new Error(BaseApi.createErrorMessageFromResponse(response));
    }

    return response;
  }
}
