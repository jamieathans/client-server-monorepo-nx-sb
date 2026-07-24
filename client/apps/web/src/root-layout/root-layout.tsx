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
        <ScrollArea
          classNames={{
            root: classes.mainScrollAreaRoot,
            content: classes.mainScrollAreaContent,
          }}
        >
          <Outlet />
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
