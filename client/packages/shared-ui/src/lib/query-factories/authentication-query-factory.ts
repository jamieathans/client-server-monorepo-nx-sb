import {
  AuthenticationApi,
  getStatusCodeFromApiError,
} from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';

export class AuthenticationQueryFactory {
  static authenticationKey() {
    return ['authentication'] as const;
  }

  static isAuthenticatedQueryOptions() {
    return queryOptions({
      queryKey: [
        ...AuthenticationQueryFactory.authenticationKey(),
        'is-authenticated',
      ],
      queryFn: async ({ signal }) => {
        try {
          const isAuthenticated = await new AuthenticationApi().isAuthenticated(
            {
              fetchInit: {
                signal,
              },
            },
          );

          return isAuthenticated;
        } catch (error) {
          const statusCode = getStatusCodeFromApiError(error);

          // 401 is expected if not authenticted.
          if (statusCode === 401) {
            return false;
          }

          throw error;
        }
      },
    });
  }
}
