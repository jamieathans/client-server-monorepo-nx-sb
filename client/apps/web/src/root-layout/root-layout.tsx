import {
  AppShell,
  Burger,
  Button,
  Group,
  Loader,
  ScrollArea,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  ColourSchemeToggle,
  MeQueryFactory,
  NavLink,
  useLoaderContext,
  useTitleContext,
  useUserHasRole,
} from '@org/shared-ui';
import classes from './root-layout.module.css';
import { Outlet, useNavigate } from 'react-router';
import { RoutePaths } from '../route-paths';
import { Logout } from '../components/logout/logout';
import { useQuery } from '@tanstack/react-query';
import { Titles } from '../titles';

export function RootLayout() {
  const [opened, disclosure] = useDisclosure();
  const meQuery = useQuery(MeQueryFactory.meQueryOptions());
  const titleContext = useTitleContext();
  const { userIsAdmin } = useUserHasRole();
  const navigate = useNavigate();
  const loaderContext = useLoaderContext();

  function handleNavLinkClick() {
    disclosure.close();
  }

  function handleUsernameButtonClick() {
    navigate(`/${RoutePaths.Users}/${meQuery.data?.id}`);
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
            {meQuery.data && (
              <Button
                variant="transparent"
                size="lg"
                onClick={handleUsernameButtonClick}
              >
                {meQuery.data.username}
              </Button>
            )}
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
            label={Titles.Notifications}
            to={`/${RoutePaths.Notifications}`}
            onClick={handleNavLinkClick}
          />
          <NavLink
            label={Titles.Loaders}
            to={`/${RoutePaths.Loaders}`}
            onClick={handleNavLinkClick}
          />
          {userIsAdmin && (
            <NavLink
              label={Titles.Admin}
              to={`/${RoutePaths.Admin}`}
              onClick={handleNavLinkClick}
            >
              <NavLink
                label={Titles.Users}
                to={`/${RoutePaths.Admin}/${RoutePaths.Users}`}
                onClick={handleNavLinkClick}
              />
            </NavLink>
          )}
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main>
        <ScrollArea
          classNames={{
            root: classes.mainScrollAreaRoot,
            content: classes.mainScrollAreaContent,
          }}
        >
          <Group align='center'>
            {titleContext.title && (
              <Title className={classes.title} order={1}>
                {titleContext.title}
              </Title>
            )}
            {loaderContext.showLoader && <Loader size="lg" />}
          </Group>
          <Outlet />
        </ScrollArea>
      </AppShell.Main>
    </AppShell>
  );
}
