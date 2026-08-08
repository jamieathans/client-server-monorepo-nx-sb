import { AppShell, Burger, Group, ScrollArea, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ColourSchemeToggle, NavLink, UsersQueryFactory } from '@org/shared-ui';
import classes from './root-layout.module.css';
import { Outlet } from 'react-router';
import { RoutePaths } from '../route-paths';
import { Logout } from '../components/logout/logout';
import { useQuery } from '@tanstack/react-query';

export function RootLayout() {
  const [opened, disclosure] = useDisclosure();
  const meQuery = useQuery(UsersQueryFactory.meQueryOptions());

  function handleNavLinkClick() {
    disclosure.close();
  }

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Group className={classes.headerGroup}>
          <Burger
            opened={opened}
            onClick={disclosure.toggle}
            hiddenFrom="sm"
            size="sm"
          />
          <Group className={classes.headerRightAlignedGroup}>
            <Title order={5}>{meQuery.data?.username}</Title>
            <ColourSchemeToggle />
            <Logout />
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar>
        <AppShell.Section
          className={classes.navbarScrollableSection}
          grow
          component={ScrollArea}
        >
          <NavLink
            label="Notifications"
            to={`/${RoutePaths.Notifications}`}
            onClick={handleNavLinkClick}
          />
          <NavLink
            label="Loaders"
            to={`/${RoutePaths.Loaders}`}
            onClick={handleNavLinkClick}
          />
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
