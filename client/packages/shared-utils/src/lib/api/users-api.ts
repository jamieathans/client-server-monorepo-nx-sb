import { BaseApi, FetchRequestInit } from './base-api';
import { AuthenticatedUserDto } from '@org/shared-types';

export class UsersApi extends BaseApi {
  constructor() {
    super('/users');
  }

  async getMe({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: '/me',
      fetchInit,
    });

    return (await response.json()) as AuthenticatedUserDto;
  }
}
