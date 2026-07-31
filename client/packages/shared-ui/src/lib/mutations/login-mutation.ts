import { AuthenticationApi } from '@org/shared-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthenticationQueryFactory } from '../query-factories/authentication-query-factory';

export function useLoginMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => new AuthenticationApi().login({ username, password }),
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey:
          AuthenticationQueryFactory.isAuthenticatedQueryOptions().queryKey,
      });
    },
    meta: {
      showErrorNotification: false,
    },
  });
}
