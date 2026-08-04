import { BaseApi, FetchRequestInit } from './base-api';
import { GitRepoPropertiesDto } from '@org/shared-types';

export class GitRepoApi extends BaseApi {
  constructor() {
    super({ apiPrefix: '/git-repo' });
  }

  async getProperties({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: '/properties',
      fetchInit,
    });

    return (await response.json()) as GitRepoPropertiesDto;
  }
}
