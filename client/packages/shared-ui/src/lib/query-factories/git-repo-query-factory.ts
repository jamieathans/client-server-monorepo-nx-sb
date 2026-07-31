import { GitRepoApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';

export class GitRepoQueryFactory {
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
      meta: {
        showErrorNotification: false,
      },
    });
  }
}
