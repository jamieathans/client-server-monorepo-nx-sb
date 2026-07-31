import { createTheme, MantineProvider } from '@mantine/core';
import { RouteManager } from '../route-manager/route-manager';
import { BrowserRouter, useLocation, useNavigate } from 'react-router';
import { Notifications } from '@mantine/notifications';
import {
  AuthenticationQueryFactory,
  FullScreenLoader,
  ReturnUrlContextProvider,
  showErrorNotification,
  showWarningNotification,
  useApplicationNeedsRefresh,
  useReturnUrlContext,
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

  const { data: isAuthenticatedData } = useQuery({
    ...AuthenticationQueryFactory.isAuthenticatedQueryOptions(),
  });

  useEffect(
    function redirectToDefaultRoute() {
      if (location.pathname === '/') {
        // This could be more complex based on feature flags etc.
        navigate(`/${RoutePaths.Notifications}`, { replace: true });
      }
    },
    [location.pathname, navigate],
  );

  useEffect(
    function redirectToLoginRouteIfNotAuthenticated() {
      if (isAuthenticatedData === false) {
        // Don't redirect to login if already there.
        if (!location.pathname.startsWith(`/${RoutePaths.Login}`)) {
          const returnUrl = encodeURI(
            `${location.pathname}${location.search}${location.hash}`,
          );
          returnUrlContext.setReturnUrl(returnUrl);

          navigate(`/${RoutePaths.Login}`, { replace: true });
        }
      }
    },
    [
      isAuthenticatedData,
      location.hash,
      location.pathname,
      location.search,
      navigate,
      returnUrlContext,
    ],
  );

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
  if (location.pathname === '/' || isAuthenticatedData === undefined) {
    return <FullScreenLoader />;
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
