import { ActuatorApi, getStatusCodeFromApiError } from '@org/shared-utils';
import { queryOptions } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';

export abstract class AuthenticationQueryFactory {
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
          await new ActuatorApi().health({
            fetchInit: {
              signal,
            },
          });

          return true;
        } catch (error) {
          const statusCode = getStatusCodeFromApiError(error);

          // 401 is expected if not authenticted.
          if (statusCode === 401) {
            return false;
          }

          throw error;
        }
      },
      meta: queryMeta({
        errorMessage:
          'There was an error checking the authentication status. Please try refreshing your browser and/or closing the tab.',
      }),
    });
  }
}
