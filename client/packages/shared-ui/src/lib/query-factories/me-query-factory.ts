import { UsersApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';

export abstract class MeQueryFactory {
  static meKey() {
    return ['me'] as const;
  }

  static meQueryOptions() {
    return queryOptions({
      queryKey: MeQueryFactory.meKey(),
      queryFn: ({ signal }) => {
        return new UsersApi().getMe({
          fetchInit: {
            signal,
          },
        });
      },
      meta: queryMeta({
        errorMessage: 'There was an error retrieving your user information.',
      }),
    });
  }
}
