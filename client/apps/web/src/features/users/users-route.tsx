import {
  CenteredLoader,
  useLoaderContext,
  UsersQueryFactory,
  useTitleContext,
  VirtualTableBody,
} from '@org/shared-ui';
import { useEffect, useState } from 'react';
import { Titles } from '../../titles';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Table } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import classes from './users-route.module.css';
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../route-paths';

const ROW_HEIGHT = 36;
const NUMBER_OF_COLUMNS = 5;

function UsersRoute() {
  const titleContext = useTitleContext();
  const navigate = useNavigate();
  const loaderContext = useLoaderContext();

  useEffect(
    function setTitleContext() {
      titleContext.setTitle(Titles.Users);

      return () => titleContext.setTitle(null);
    },
    [titleContext],
  );

  const usersQuery = useQuery(UsersQueryFactory.allUsersQueryOptions());

  useEffect(
    function setLoaderContext() {
      loaderContext.setShowLoader(usersQuery.isFetching);

      return () => loaderContext.setShowLoader(false);
    },
    [loaderContext, usersQuery.isFetching],
  );

  const [scrollParent, setScrollParent] = useState<HTMLDivElement | null>(null);

  // eslint-disable-next-line react-hooks/incompatible-library
  const virtualizer = useVirtualizer({
    count: usersQuery.data?.length ?? 0,
    getScrollElement: () => scrollParent,
    estimateSize: () => ROW_HEIGHT,
    overscan: 20,
  });

  const virtualItems = virtualizer.getVirtualItems();

  function handleTableRowClick(id: string) {
    navigate(`/${RoutePaths.Users}/${id}`);
  }

  if (usersQuery.data === undefined) {
    return <CenteredLoader />;
  }

  return (
    <Table.ScrollContainer
      minWidth={0}
      scrollAreaProps={{ viewportRef: setScrollParent }}
    >
      <Table stickyHeader layout="fixed" highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Username</Table.Th>
            <Table.Th>First Name</Table.Th>
            <Table.Th>Surname</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Roles</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <VirtualTableBody
          virtualizer={virtualizer}
          virtualItems={virtualItems}
          colSpan={NUMBER_OF_COLUMNS}
        >
          {virtualItems.map((virtualItem) => {
            const row = usersQuery.data[virtualItem.index];
            return (
              <Table.Tr
                className={classes.tableRow}
                key={row.id}
                onClick={() => handleTableRowClick(row.id)}
              >
                <Table.Td>{row.username}</Table.Td>
                <Table.Td>{row.firstName}</Table.Td>
                <Table.Td>{row.surname}</Table.Td>
                <Table.Td>{row.email}</Table.Td>
                <Table.Td>{row.roles.join(', ')}</Table.Td>
              </Table.Tr>
            );
          })}
        </VirtualTableBody>
      </Table>
    </Table.ScrollContainer>
  );
}

export default UsersRoute;
