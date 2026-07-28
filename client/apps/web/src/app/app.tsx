import { createTheme, MantineProvider } from '@mantine/core';
import { RouteManager } from '../route-manager/route-manager';
import { BrowserRouter } from 'react-router';
import { Notifications } from '@mantine/notifications';
import {
  showErrorNotification,
  showWarningNotification,
  useApplicationNeedsRefresh,
} from '@org/shared-ui';
import { useEffect } from 'react';
import { MutationCache, QueryCache, QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';

// Uncomment this line to use CSS modules
// import styles from './app.module.css';
//import { OrgSharedUi } from '@org/shared-ui';
//import { sharedUtils } from '@org/shared-utils';
//import NxWelcome from './nx-welcome';

const theme = createTheme({/** Put your mantine theme override here */});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      showErrorNotification({
        message: error.message,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      showErrorNotification({
        message: error.message,
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
