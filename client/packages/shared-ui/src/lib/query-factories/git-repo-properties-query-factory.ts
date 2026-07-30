import { GitRepoPropertiesApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';

export class GitRepoPropertiesQueryFactory {
  static propertiesKey() {
    return ['git-repo-properties'] as const;
  }
  static propertiesQueryOptions() {
    return queryOptions({
      queryKey: GitRepoPropertiesQueryFactory.propertiesKey(),
      queryFn: ({ signal }) => {
        return new GitRepoPropertiesApi().getProperties({
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
