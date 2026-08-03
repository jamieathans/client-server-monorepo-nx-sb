import { createTheme, MantineProvider } from '@mantine/core';
import { RouteManager } from '../route-manager/route-manager';
import { BrowserRouter, useLocation, useNavigate } from 'react-router';
import { Notifications } from '@mantine/notifications';
import {
  AuthenticationQueryFactory,
  FullScreenLoader,
  queryClient,
  useShowNotificationIfApplicationNeedsRefresh,
} from '@org/shared-ui';
import { useEffect, useEffectEvent } from 'react';
import { QueryClientProvider, useQuery } from '@tanstack/react-query';
import { RoutePaths } from '../route-paths';
import { SearchParams } from '../search-params';

const theme = createTheme({/** Put your mantine theme override here */});

// This code is only for TypeScript
declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

// This code is for all users
window.__TANSTACK_QUERY_CLIENT__ = queryClient;

function Root() {
  useShowNotificationIfApplicationNeedsRefresh();

  const navigate = useNavigate();
  const location = useLocation();

  const { data: isAuthenticatedData } = useQuery(
    AuthenticationQueryFactory.isAuthenticatedQueryOptions(),
  );

  useEffect(
    function redirectToDefaultRoute() {
      if (location.pathname === '/') {
        // This could be more complex based on feature flags etc.
        navigate(`/${RoutePaths.Notifications}`, { replace: true });
      }
    },
    [location.pathname, navigate],
  );

  const onRequiresAuthentication = useEffectEvent(() => {
    // Don't redirect to login if already there.
    if (!location.pathname.startsWith(`/${RoutePaths.Login}`)) {
      const returnUrl = encodeURI(
        `${location.pathname}${location.search}${location.hash}`,
      );

      navigate(`/${RoutePaths.Login}?${SearchParams.ReturnUrl}=${returnUrl}`, {
        replace: true,
      });
    }
  });

  useEffect(
    function redirectToLoginRouteIfNotAuthenticated() {
      if (isAuthenticatedData === false) {
        onRequiresAuthentication();
      }
    },
    [isAuthenticatedData],
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
          <Root />
        </QueryClientProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}
