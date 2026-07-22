import { createTheme, MantineProvider } from '@mantine/core';
import { RouteManager } from '../route-manager/route-manager';
import { BrowserRouter } from 'react-router';
import { Notifications } from '@mantine/notifications';

// Uncomment this line to use CSS modules
// import styles from './app.module.css';
//import { OrgSharedUi } from '@org/shared-ui';
//import { sharedUtils } from '@org/shared-utils';
//import NxWelcome from './nx-welcome';

const theme = createTheme({/** Put your mantine theme override here */});

function Root() {
  return <RouteManager />;
}

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Notifications />
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </MantineProvider>
  );
}
