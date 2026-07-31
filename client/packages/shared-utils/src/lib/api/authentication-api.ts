import { BaseApi, FetchRequestInit } from './base-api';

export class AuthenticationApi extends BaseApi {
  constructor() {
    super('/authentication');
  }

  async isAuthenticated({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: '/is-authenticated',
      fetchInit,
    });

    return (await response.json()) as boolean;
  }
}
