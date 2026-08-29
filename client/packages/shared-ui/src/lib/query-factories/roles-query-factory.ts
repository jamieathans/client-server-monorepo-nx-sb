import { UsersApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';

export abstract class RolesQueryFactory {
  static rolesKey() {
    return ['roles'] as const;
  }

  static rolesQueryOptions() {
    return queryOptions({
      queryKey: [...RolesQueryFactory.rolesKey(), 'all'],
      queryFn: ({ signal }) => {
        return new UsersApi().getRoles({
          fetchInit: {
            signal,
          },
        });
      },
      meta: queryMeta({
        errorMessage: 'There was an error retrieving the user roles.',
      }),
    });
  }
}
