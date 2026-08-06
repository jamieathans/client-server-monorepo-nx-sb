import { BaseApi, FetchRequestInit } from './base-api';

export class AuthenticationApi extends BaseApi {
  constructor() {
    super({ apiPrefix: '/authentication' });
  }

  login({
    username,
    password,
    fetchInit,
  }: {
    username: string;
    password: string;
    fetchInit?: FetchRequestInit;
  }) {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return super.post({
      fetchInput: '/login',
      fetchInit: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-XSRF-TOKEN': BaseApi.getCsrfCookie(),
        },
        body: params,
        ...fetchInit,
      },
    });
  }

  logout({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    return super.post({
      fetchInput: '/logout',
      fetchInit,
    });
  }
}
