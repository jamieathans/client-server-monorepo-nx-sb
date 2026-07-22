import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColourSchemeToggle } from '@org/shared-ui';
import classes from './root-layout.module.css';
import { Outlet } from 'react-router';

export function RootLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group className={classes.headerGroup}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group className={classes.headerRightAlignedGroup}>
            <ColourSchemeToggle />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar className={classes.navbar}>
        Navbar is collapsed on mobile at sm breakpoint. At that point it is no
        longer offset by padding in the main element and it takes the full width
        of the screen when opened.
      </AppShell.Navbar>
      <AppShell.Main>
        {/* <Text>This is the main section, your app content here.</Text>
        <Text>
          Layout used in most cases - Navbar and Header with fixed position
        </Text> */}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
