import { VirtualItem } from '@tanstack/react-virtual';

export function VirtualTableFisrtRow({
  virtualItems,
  colSpan,
}: {
  virtualItems: VirtualItem[];
  colSpan: number;
}) {
  return (
    virtualItems.length > 0 && (
      <tr aria-hidden>
        <td
          aria-hidden
          colSpan={colSpan}
          style={{
            height: virtualItems[0].start,
            padding: 0,
            border: 'none',
          }}
        />
      </tr>
    )
  );
}
