import { UsersApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';

export abstract class UsersQueryFactory {
  static usersKey() {
    return ['users'] as const;
  }

  static allUsersQueryOptions() {
    return queryOptions({
      queryKey: [...UsersQueryFactory.usersKey(), 'all'],
      queryFn: ({ signal }) => {
        return new UsersApi().getAllUsers({
          fetchInit: {
            signal,
          },
        });
      },
      meta: queryMeta({
        errorMessage: 'There was an error retrieving all the users.',
      }),
    });
  }

  static getUserByIdQueryOptions({ id }: { id: string }) {
    return queryOptions({
      queryKey: [...UsersQueryFactory.usersKey(), { id }],
      queryFn: ({ signal }) => {
        return new UsersApi().getUserById({
          id,
          fetchInit: {
            signal,
          },
        });
      },
      meta: queryMeta({
        errorMessage: 'There was an error retrieving the user details.',
      }),
    });
  }
}
