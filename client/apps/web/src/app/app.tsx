import { createTheme, MantineProvider } from '@mantine/core';
import { RootLayout } from '../root-layout/root-layout';

// Uncomment this line to use CSS modules
// import styles from './app.module.css';
//import { OrgSharedUi } from '@org/shared-ui';
//import { sharedUtils } from '@org/shared-utils';
//import NxWelcome from './nx-welcome';

const theme = createTheme({/** Put your mantine theme override here */});

function Root() {
  return <RootLayout />;
}

export function App() {
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <Root />
    </MantineProvider>
  );
}
