import { AppShell, Burger, Group, ScrollArea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColourSchemeToggle, NavLink } from '@org/shared-ui';
import classes from './root-layout.module.css';
import { Outlet } from 'react-router';
import { RoutePaths } from '../route-paths';

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
      <AppShell.Navbar>
        <AppShell.Section
          className={classes.navbarScrollableSection}
          grow
          component={ScrollArea}
        >
          <NavLink label="Notifications" to={`/${RoutePaths.Notifications}`} />
          <NavLink label="Loaders" to={`/${RoutePaths.Loaders}`} />
        </AppShell.Section>
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
