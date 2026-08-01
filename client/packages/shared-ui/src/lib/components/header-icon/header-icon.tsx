import { ActionIcon } from '@mantine/core';
import classes from './header-icon.module.css';

import type { ActionIconProps, ElementProps } from '@mantine/core';

interface HeaderIconProps
  extends ActionIconProps, ElementProps<'button', keyof ActionIconProps> {
  ariaLabel: string;
}

export function HeaderIcon({
  onClick,
  ariaLabel,
  children,
  disabled,
  ...otherProps
}: HeaderIconProps) {
  return (
    <ActionIcon
      variant="default"
      size="xl"
      className={classes.root}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </ActionIcon>
  );
}
