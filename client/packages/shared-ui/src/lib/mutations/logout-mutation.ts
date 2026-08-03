import { AuthenticationApi } from '@org/shared-utils';
import { useMutation } from '@tanstack/react-query';
import { queryMeta } from '../utils/query-utils';

export function useLogoutMutation() {
  return useMutation({
    mutationFn: () => new AuthenticationApi().logout(),
    meta: queryMeta({
      errorMessage:
        'There was an error performing logout, please close your browser tab.',
    }),
  });
}
