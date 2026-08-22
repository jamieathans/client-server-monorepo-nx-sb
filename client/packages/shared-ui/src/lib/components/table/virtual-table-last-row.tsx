import { VirtualItem, ReactVirtualizer } from '@tanstack/react-virtual';

export function VirtualTableLastRow<
  TScrollElement extends Element | Window,
  TItemElement extends Element,
>({
  virtualItems,
  colSpan,
  virtualizer,
}: {
  virtualItems: VirtualItem[];
  colSpan: number;
  virtualizer: ReactVirtualizer<TScrollElement, TItemElement>;
}) {
  return (
    virtualItems.length > 0 && (
      <tr aria-hidden>
        <td
          aria-hidden
          colSpan={colSpan}
          style={{
            height:
              virtualizer.getTotalSize() -
              virtualItems[virtualItems.length - 1].end,
            padding: 0,
            border: 'none',
          }}
        />
      </tr>
    )
  );
}
