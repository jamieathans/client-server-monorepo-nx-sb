import { BaseApi, FetchRequestInit } from './base-api';

export interface GitRepoPropertiesDto {
  commitId: string;
}

export class GitRepoPropertiesApi extends BaseApi {
  async getProperties({ fetchInit }: { fetchInit?: FetchRequestInit } = {}) {
    const response = await super.get({
      fetchInput: '/git-repo-properties',
      fetchInit,
    });

    return (await response.json()) as GitRepoPropertiesDto;
  }
}
