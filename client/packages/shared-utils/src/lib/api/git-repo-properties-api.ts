import { BaseApi, FetchRequestInit } from './base-api';
import { GitRepoPropertiesDto } from '@org/shared-types';

export class GitRepoPropertiesApi extends BaseApi {
  async getProperties({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: '/git-repo-properties',
      fetchInit,
    });

    return (await response.json()) as GitRepoPropertiesDto;
  }
}
