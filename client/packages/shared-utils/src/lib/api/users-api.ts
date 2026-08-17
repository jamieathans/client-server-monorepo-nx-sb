import { BaseApi, FetchRequestInit } from './base-api';
import { UserDto } from '@org/shared-types';

export class UsersApi extends BaseApi {
  constructor() {
    super({ apiPrefix: '/users' });
  }

  async getMe({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: '/me',
      fetchInit,
    });

    return (await response.json()) as UserDto;
  }

  async getAllUsers({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: '',
      fetchInit,
    });

    return (await response.json()) as UserDto[];
  }

  async getUserById({
    id,
    fetchInit,
  }: {
    id: string;
    fetchInit?: FetchRequestInit;
  }) {
    const response = await super.get({
      fetchInput: `/${id}`,
      fetchInit,
    });

    return (await response.json()) as UserDto;
  }

  async checkUsernameAvailability({
    userId,
    username,
    fetchInit,
  }: {
    userId: string;
    username: string;
    fetchInit?: FetchRequestInit;
  }) {
    const response = await super.get({
      fetchInput: `/check-username-availability?userId=${userId}&username=${username}`,
      fetchInit,
    });

    return (await response.json()) as boolean;
  }

  updateUser({
    userDto,
    fetchInit,
  }: {
    userDto: UserDto;
    fetchInit?: FetchRequestInit;
  }) {
    return super.post({
      fetchInput: '/update-user',
      fetchInit,
      body: userDto,
    });
  }
}
