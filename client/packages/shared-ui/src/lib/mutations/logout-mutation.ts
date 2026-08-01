import { AuthenticationApi } from '@org/shared-utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => new AuthenticationApi().logout(),
    onSuccess: () => {
      return queryClient.invalidateQueries();
    },
    meta: queryMeta({
      errorMessage: 'There was an error performing logout, please close your browser tab.',
    }),
  });
}
