import { createTheme, MantineProvider } from '@mantine/core';
import { RouteManager } from '../route-manager/route-manager';
import { BrowserRouter, useLocation, useNavigate } from 'react-router';
import { Notifications } from '@mantine/notifications';
import {
  ReturnUrlContextProvider,
  showErrorNotification,
  showWarningNotification,
  useApplicationNeedsRefresh,
  useReturnUrlContext,
  UsersQueryFactory,
} from '@org/shared-ui';
import { useEffect } from 'react';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/query-core';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { RoutePaths } from '../route-paths';

const theme = createTheme({/** Put your mantine theme override here */});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.error('QueryCache.onError', error);

      if (
        typeof query.meta?.showErrorNotification === 'boolean' &&
        query.meta.showErrorNotification === false
      ) {
        return;
      }

      const errorMessage =
        typeof query.meta?.errorMessage === 'string' && query.meta.errorMessage;

      showErrorNotification({
        message: errorMessage || error.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, variables, onMutateResult, mutation) => {
      console.error('MutationCache.onError', error);

      if (
        typeof mutation.meta?.showErrorNotification === 'boolean' &&
        mutation.meta.showErrorNotification === false
      ) {
        return;
      }

      const errorMessage =
        typeof mutation.meta?.errorMessage === 'string' &&
        mutation.meta.errorMessage;

      showErrorNotification({
        message: errorMessage || error.message,
      });
    },
  }),
});

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

function Root() {
  const { needsRefresh } = useApplicationNeedsRefresh();
  const navigate = useNavigate();
  const location = useLocation();
  const returnUrlContext = useReturnUrlContext();

  const { data: meQueryData, refetch: meQueryRefetch } = useQuery({
    ...UsersQueryFactory.meQueryOptions(),
  });

  useEffect(
    function redirectToLoginOrDefaultRoute() {
      if (meQueryData === undefined) {
        return;
      }

      if (meQueryData === null) {
        // "meQueryData === null" corresponds to 401 unauthorised, bounce to login.
        if (!location.pathname.startsWith(`/${RoutePaths.Login}`)) {
          const returnUrl = encodeURI(
            `${location.pathname}${location.search}${location.hash}`,
          );
          returnUrlContext.setReturnUrl(returnUrl);
        }

        navigate(`/${RoutePaths.Login}`, { replace: true });
      } else if (location.pathname === '/') {
        // Navigate to default route.
        navigate(`/${RoutePaths.Notifications}`, { replace: true });
      }

      // Refetch on every route change to check if login is still valid.
      meQueryRefetch();
    },
    [
      location.hash,
      location.pathname,
      location.search,
      meQueryData,
      meQueryRefetch,
      navigate,
      returnUrlContext,
    ],
  );

  // TODO: could be custom hook.
  useEffect(
    function showNotificationIfApplicationNeedsRefresh() {
      if (needsRefresh) {
        showWarningNotification({
          title: 'Application Refresh Required',
          message:
            'Please refresh the application by clicking the browser refresh button.',
          allowClose: false,
          withCloseButton: false,
          autoClose: false,
        });
      }
    },
    [needsRefresh],
  );

  // This will prevent the flicker of the RootLayout showing.
  if (location.pathname === '/') {
    return null;
  }

  return <RouteManager />;
}

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ReturnUrlContextProvider>
            <Root />
          </ReturnUrlContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}
