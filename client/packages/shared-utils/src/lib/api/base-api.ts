export type FetchRequestInit = Omit<RequestInit, 'method'>;
export type FetchInput = string | URL | Request;

export abstract class BaseApi {
  private static appendApiPrefixToStringInput(fetchInput: FetchInput) {
    if (typeof fetchInput === 'string') {
      return `/api${fetchInput}`;
    }

    return fetchInput;
  }

  protected async get({
    fetchInput,
    fetchInit,
  }: {
    fetchInput: FetchInput;
    fetchInit?: FetchRequestInit;
  }) {
    const response = await fetch(
      BaseApi.appendApiPrefixToStringInput(fetchInput),
      {
        method: 'GET',
        ...fetchInit,
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  }

  protected async post({
    fetchInput,
    fetchInit,
    body,
  }: {
    fetchInput: FetchInput;
    fetchInit?: FetchRequestInit;
    body?: unknown;
  }) {
    const response = await fetch(
      BaseApi.appendApiPrefixToStringInput(fetchInput),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        ...fetchInit,
      },
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  }
}
