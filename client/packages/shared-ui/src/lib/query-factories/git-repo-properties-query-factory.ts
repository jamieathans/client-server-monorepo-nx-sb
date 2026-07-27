import { GitRepoPropertiesApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';

export class GitRepoPropertiesQueryFactory {
  static propertiesKey() {
    return ['git-repo-properties'] as const;
  }
  static propertiesQueryOptions() {
    return queryOptions({
      queryKey: GitRepoPropertiesQueryFactory.propertiesKey(),
      queryFn: async ({ signal }) => {
        try {
          const gitRepoProperties =
            await new GitRepoPropertiesApi().getProperties({
              fetchInit: {
                signal,
              },
            });

          return gitRepoProperties;
        } catch (error) {
          console.error('GitRepoPropertiesQueryFactory: queryFn error', error);
          return undefined;
        }
      },
    });
  }
}
