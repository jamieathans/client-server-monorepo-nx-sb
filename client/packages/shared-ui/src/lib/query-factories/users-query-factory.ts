import { getStatusCodeFromApiError, UsersApi } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';

export class UsersQueryFactory {
  static usersKey() {
    return ['users'] as const;
  }

  static meQueryOptions() {
    return queryOptions({
      queryKey: [...UsersQueryFactory.usersKey(), 'me'],
      queryFn: async ({ signal }) => {
        try {
          const user = await new UsersApi().getMe({
            fetchInit: {
              signal,
            },
          });

          return user;
        } catch (error) {
          const statusCode = getStatusCodeFromApiError(error);

          // 401 is exepcetd if the user is not logged in.
          if (statusCode === 401) {
            return null;
          }

          throw error;
        }
      },
    });
  }
}
