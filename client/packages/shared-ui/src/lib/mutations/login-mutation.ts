import {
  AuthenticationApi,
  getStatusCodeFromApiError,
} from '@org/shared-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthenticationQueryFactory } from '../query-factories/authentication-query-factory';
import { queryMeta } from '../utils/query-utils';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => {
      try {
        await new AuthenticationApi().login({ username, password });

        return true;
      } catch (error) {
        const statusCode = getStatusCodeFromApiError(error);

        // 401 is expected if login failed.
        if (statusCode === 401) {
          return false;
        }

        throw error;
      }
    },
    onSuccess: (loginSuccess) => {
      if (loginSuccess) {
        return queryClient.invalidateQueries({
          queryKey:
            AuthenticationQueryFactory.isAuthenticatedQueryOptions().queryKey,
        });
      }

      return Promise.resolve();
    },
    meta: queryMeta({
      errorMessage:
        'There was a problem verifying your login details. Please try again and/or refreshing your browser tab.',
    }),
  });
}
