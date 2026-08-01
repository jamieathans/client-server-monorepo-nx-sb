import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query';
import { showErrorNotification } from './notifications';
import { ReactNode } from 'react';

const defaultQueryErrorMessage =
  'There was an error contacting the server. Please try the operation again or refreshing the browser.';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error('QueryCache.onError', error);

      if (
        typeof query.meta?.errorMessage === 'boolean' &&
        query.meta.errorMessage === false
      ) {
        return;
      }

      showErrorNotification({
        message:
          (query.meta?.errorMessage as ReactNode) ?? defaultQueryErrorMessage,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, onMutateResult, mutation) => {
      console.error('MutationCache.onError', error);

      if (
        typeof mutation.meta?.errorMessage === 'boolean' &&
        mutation.meta.errorMessage === false
      ) {
        return;
      }

      showErrorNotification({
        message:
          (mutation.meta?.errorMessage as ReactNode) ??
          defaultQueryErrorMessage,
      });
    },
  }),
});

export function queryMeta({
  errorMessage,
}: {
  errorMessage?: string | boolean;
}) {
  return {
    errorMessage,
  };
}
