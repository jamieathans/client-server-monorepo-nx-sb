import { UsersApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';

export class UsersQueryFactory {
  static usersKey() {
    return ['users'] as const;
  }

  static meQueryOptions() {
    return queryOptions({
      queryKey: [...UsersQueryFactory.usersKey(), 'me'],
      queryFn: async ({ signal }) => {
        return new UsersApi().getMe({
          fetchInit: {
            signal,
          },
        });
      },
    });
  }
}
