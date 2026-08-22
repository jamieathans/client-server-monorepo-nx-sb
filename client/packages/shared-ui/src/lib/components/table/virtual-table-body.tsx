import { Table } from '@mantine/core';
import { ReactVirtualizer, VirtualItem } from '@tanstack/react-virtual';
import { ReactNode } from 'react';
import { VirtualTableFisrtRow } from './virtual-table-first-row';
import { VirtualTableLastRow } from './virtual-table-last-row';

export function VirtualTableBody<
  TScrollElement extends Element | Window,
  TItemElement extends Element,
>({
  virtualItems,
  colSpan,
  virtualizer,
  children,
}: {
  virtualItems: VirtualItem[];
  colSpan: number;
  virtualizer: ReactVirtualizer<TScrollElement, TItemElement>;
  children: ReactNode;
}) {
  return (
    <Table.Tbody>
      <VirtualTableFisrtRow virtualItems={virtualItems} colSpan={colSpan} />
      {children}
      <VirtualTableLastRow
        virtualItems={virtualItems}
        colSpan={colSpan}
        virtualizer={virtualizer}
      />
    </Table.Tbody>
  );
}
