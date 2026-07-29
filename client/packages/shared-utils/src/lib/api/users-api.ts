import { BaseApi, FetchRequestInit } from './base-api';
import { AuthenticatedUserDto } from '@org/shared-types';

export class UsersApi extends BaseApi {
  private static appendApiPrefix(input: string): string {
    return `/users${input}`;
  }

  async getMe({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: UsersApi.appendApiPrefix('/me'),
      fetchInit,
    });

    return (await response.json()) as AuthenticatedUserDto;
  }
}
