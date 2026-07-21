import { createTheme, MantineProvider } from '@mantine/core';

// Uncomment this line to use CSS modules
// import styles from './app.module.css';
//import { OrgSharedUi } from '@org/shared-ui';
//import { sharedUtils } from '@org/shared-utils';
//import NxWelcome from './nx-welcome';

const theme = createTheme({/** Put your mantine theme override here */});

function Root() {
  return <div>App</div>;
}

export function App() {
  return (
    <MantineProvider theme={theme}>
      <Root />
    </MantineProvider>
  );
}
