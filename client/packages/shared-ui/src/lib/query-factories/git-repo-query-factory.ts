import { GitRepoApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';

export abstract class GitRepoQueryFactory {
  static gitRepoKey() {
    return ['git-repo'] as const;
  }

  static propertiesQueryOptions() {
    return queryOptions({
      queryKey: [...GitRepoQueryFactory.gitRepoKey(), 'properties'],
      queryFn: ({ signal }) => {
        return new GitRepoApi().getProperties({
          fetchInit: {
            signal,
          },
        });
      },
      meta: queryMeta({
        errorMessage: false,
      }),
    });
  }
}
